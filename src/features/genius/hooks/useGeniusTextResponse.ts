import { useToast } from '@/hooks';
import { useCallback, useEffect } from 'react';
import { useGeniusContext } from '../contexts/GeniusContextProvider';
import { GeniusUtils } from '../utils';
import { useReadableStream } from './useReadableStream';
import { GeniusAPIService } from '../services/api';

export const useGeniusTextResponse = () => {
  const { prompt, setResponse, mode, cancelling, reset } = useGeniusContext();
  const { addErrorToast } = useToast();

  const onSuccess = useCallback(
    (response: string[]) => {
      if (response.length === 0) {
        reset();
        return;
      }
      setResponse({
        text: response.join(''),
        type: 'text',
      });
    },
    [reset, setResponse],
  );

  const onError = useCallback(() => {
    addErrorToast(`Couldn't generate text. Please try again.`);
    reset();
  }, [addErrorToast, reset]);

  const { chunks, fetchData, cancelStream } = useReadableStream({
    apiMethod: GeniusAPIService.fetchGeniusTextCompletion,
    onSuccess,
    onCancel: onSuccess,
    onError,
  });

  const text = GeniusUtils.formatChunksToText(chunks);

  useEffect(() => {
    if (cancelling) {
      cancelStream();
    }

    return () => {
      cancelStream();
    };
  }, [cancelStream, cancelling]);

  useEffect(() => {
    if (prompt && mode === 'generating' && !cancelling) {
      fetchData(prompt);
    }
  }, [fetchData, mode, prompt, cancelling]);

  return {
    text,
    chunks,
  };
};
