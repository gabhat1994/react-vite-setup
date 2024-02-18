import { type Media } from '@twilio/conversations';
import { useCallback, useEffect, useState } from 'react';

interface UseMediaMessageBubbleOptions {
  pendingFile?: File;
  media?: Media;
}

export function useMediaMessageBubble({
  pendingFile,
  media,
}: UseMediaMessageBubbleOptions | void = {}) {
  const [isLoadingMedia, setLoadingMedia] = useState(true);
  const [mediaUrl, setMediaUrl] = useState<string>();

  const pendingUrl = pendingFile ? URL.createObjectURL(pendingFile) : undefined;

  const isPending = !!(pendingUrl && !mediaUrl);
  const isLoaded = !!media;

  const initMedia = useCallback(async () => {
    const url = await media?.getContentTemporaryUrl();

    if (!url) {
      return;
    }

    setMediaUrl(url);
  }, [media]);

  useEffect(() => {
    initMedia();
  }, [initMedia]);

  return {
    isLoadingMedia,
    isPending,
    isLoaded,
    mediaUrl,
    pendingUrl,
    initMedia,
    setLoadingMedia,
  };
}
