import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import { usePublishNoumLayoutMutation } from '@/apollo/graphql';

export function usePublishNoumLayoutHelper() {
  const [publishNoumLayout, { loading }] = usePublishNoumLayoutMutation();

  const publishNoumLayoutHelper = useCallback(
    async (spaceId: string) => {
      let isSuccess;
      try {
        await publishNoumLayout({
          variables: {
            ID: spaceId,
          },
        });
        isSuccess = true;
      } catch (error) {
        let message = 'Unknown';
        if (error instanceof Error) {
          message = error.message;
        }
        Sentry.captureException(new Error(message), {
          tags: {
            section: 'publishNoumLayoutMutation',
          },
        });
        isSuccess = false;
      }

      return isSuccess;
    },
    [publishNoumLayout],
  );

  return {
    loading,
    publishNoumLayoutHelper,
  };
}

export default usePublishNoumLayoutHelper;
