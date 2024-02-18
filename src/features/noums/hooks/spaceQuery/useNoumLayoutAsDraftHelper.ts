import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import { useSaveNoumLayoutAsDraftMutation } from '@/apollo/graphql';

export function useNoumLayoutAsDraftHelper() {
  const [noumLayoutAsDraft, { loading }] = useSaveNoumLayoutAsDraftMutation();

  const noumLayoutAsDraftHelper = useCallback(
    async (spaceId: string) => {
      let isSuccess;
      try {
        await noumLayoutAsDraft({
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
            section: 'noumLayoutAsDraftMutation',
          },
        });
        isSuccess = false;
      }

      return isSuccess;
    },
    [noumLayoutAsDraft],
  );

  return {
    loading,
    noumLayoutAsDraftHelper,
  };
}

export default useNoumLayoutAsDraftHelper;
