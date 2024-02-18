/* eslint-disable no-await-in-loop */
import { useToast } from '@/hooks';
import { useForceUpdate } from '@/hooks/forceUpdate';
import { type ResponseError } from '@/services/rest/types';
import { isResponseError } from '@/services/rest/utils';
import { useCallback, useRef } from 'react';

type AsyncMethod = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any,
  options?: RequestInit,
) => Promise<ReadableStream<Uint8Array> | ResponseError | null>;

type UseReadableStreamOptions<T extends AsyncMethod> = {
  apiMethod: T;
  onSuccess: (response: string[]) => void;
  onCancel?: (response: string[]) => void;
  onError?: (error: ResponseError) => void;
};

export const useReadableStream = <T extends AsyncMethod>({
  apiMethod,
  onSuccess,
  onCancel,
  onError,
}: UseReadableStreamOptions<T>) => {
  const { addErrorToast } = useToast();
  const forceUpdate = useForceUpdate();
  const abortControllerRef = useRef<AbortController>(new AbortController());
  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>();
  const chunksRef = useRef<string[]>([]);
  const isCancelled = useRef<boolean>(false);

  const cleanup = useCallback(() => {
    isCancelled.current = false;

    if (readerRef.current) {
      readerRef.current.cancel();
    }

    abortControllerRef.current = new AbortController();
    chunksRef.current = [];
    forceUpdate();
  }, [forceUpdate]);

  const fetchData = useCallback(
    async (...args: Parameters<T>) => {
      const [payload, requestOptions] = args;

      try {
        cleanup();

        const readableStream = await apiMethod(payload, {
          signal: abortControllerRef.current.signal,
          ...(requestOptions ?? {}),
        });

        if (isResponseError(readableStream)) {
          if (isCancelled.current) {
            onCancel?.([]);
          } else {
            onError?.(readableStream);
          }
          return;
        }

        readerRef.current = readableStream?.getReader();

        if (!readerRef.current) {
          throw Error('No reader found');
        }

        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await readerRef.current.read();

          const decoded = new TextDecoder().decode(value);

          if (isCancelled.current) {
            onCancel?.(chunksRef.current);
            break;
          }

          if (done) {
            onSuccess(chunksRef.current);
            break;
          }
          chunksRef.current = [...chunksRef.current, decoded];
          forceUpdate();
        }
      } catch (error) {
        if (error instanceof Error) {
          addErrorToast(error.message);
        }
      } finally {
        if (readerRef.current) {
          readerRef.current.releaseLock();
          readerRef.current = null;
        }
      }
    },
    [
      addErrorToast,
      apiMethod,
      cleanup,
      forceUpdate,
      onCancel,
      onError,
      onSuccess,
    ],
  );

  const cancelStream = useCallback(() => {
    if (readerRef.current) {
      readerRef.current.cancel();
      readerRef.current = null;
    }
    abortControllerRef.current.abort();
    isCancelled.current = true;
  }, []);

  return {
    cancelStream,
    chunks: chunksRef.current,
    fetchData,
  };
};
