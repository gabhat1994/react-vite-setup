import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import { useUpdateEventStatusMutation } from '@/apollo/graphql';
import { type EventsStatus } from '@/apollo/generated/types';

export function useUpdateEventStatusHelper() {
  const [updateEventStatus, { loading }] = useUpdateEventStatusMutation();

  const updateEventStatusHelper = useCallback(
    async (id: string, status: EventsStatus) => {
      let isSuccess;
      let errorMsg = 'Unknown';
      try {
        await updateEventStatus({
          variables: { id, status },
        });

        isSuccess = true;
      } catch (error) {
        if (error instanceof Error) {
          errorMsg = error.message;
        }
        Sentry.captureException(new Error(errorMsg), {
          tags: {
            section: 'updateEventStatus',
          },
        });

        isSuccess = false;
      }

      return { isSuccess, errorMsg };
    },
    [updateEventStatus],
  );

  return {
    loading,
    updateEventStatusHelper,
  };
}

export default useUpdateEventStatusHelper;
