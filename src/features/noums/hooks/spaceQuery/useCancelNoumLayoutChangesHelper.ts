import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import { useCancelNoumLayoutChangesMutation } from '@/apollo/graphql';

export function useCancelNoumLayoutChangesHelper() {
  const [cancelNoumLayoutChanges, { loading }] =
    useCancelNoumLayoutChangesMutation();

  const cancelNoumLayoutChangesHelper = useCallback(
    async (spaceId: string) => {
      let isSuccess;
      try {
        await cancelNoumLayoutChanges({
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
            section: 'cancelNoumLayoutChangesMutation',
          },
        });
        isSuccess = false;
      }

      return isSuccess;
    },
    [cancelNoumLayoutChanges],
  );

  return {
    loading,
    cancelNoumLayoutChangesHelper,
  };
}

export default useCancelNoumLayoutChangesHelper;
