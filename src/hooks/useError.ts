import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import { useToast } from '@/hooks/toast';

export const useError = () => {
  const { addToast } = useToast();

  const logError = useCallback(
    (
      error: Error | unknown,
      section: string = '',
      showToasterMessage: boolean = true,
      printConsole: boolean = false,
    ): void => {
      let message = 'Unknown';
      if (error instanceof Error) {
        message = error.message;
      }

      if (printConsole) {
        // eslint-disable-next-line no-console
        console.error(error);
      }

      if (showToasterMessage) {
        addToast('error', 'none', message);
      }

      Sentry.captureException(new Error(message), {
        tags: { section },
      });
    },
    [addToast],
  );

  return { logError };
};

export default useError;
