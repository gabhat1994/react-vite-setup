import { useGenerateAiImagesMutation } from '@/apollo/graphql';
import { useEffect, useRef } from 'react';
import { useGeniusContext } from '../contexts/GeniusContextProvider';

export const useGeniusImageResponse = () => {
  const controller = useRef(new AbortController());
  const { prompt, mode, reset, setResponse, cancelling } = useGeniusContext();
  const [generateImages, { data, loading }] = useGenerateAiImagesMutation({
    onError: reset,
    onCompleted(response) {
      if (response.generateAiImages.length === 0) {
        reset();
      }
      setResponse({
        images: response.generateAiImages,
        type: 'image',
      });
    },
    context: {
      fetchOptions: {
        signal: controller.current.signal,
      },
    },
  });

  useEffect(() => {
    if (cancelling) {
      controller.current.abort();
      reset();
    }
  }, [cancelling, reset]);

  useEffect(() => {
    if (prompt && mode === 'generating') {
      generateImages({
        variables: {
          prompt,
        },
      });
    }
  }, [generateImages, mode, prompt]);

  const images = data?.generateAiImages ?? [];

  return {
    images,
    loading,
  };
};
