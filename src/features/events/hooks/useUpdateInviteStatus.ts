import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import { useUpdateInviteStatusMutation } from '@/apollo/graphql';
import { type InvitationStatus } from '@/apollo/generated/types';
import { useToast } from '@/hooks/toast';

export function useUpdateInviteStatus() {
  const { addToast } = useToast();

  const [updateInviteStatus, { loading }] = useUpdateInviteStatusMutation();

  const updateInviteStatusHelper = useCallback(
    async (
      invitationId: string,
      status: InvitationStatus,
      callback?: (isSuccess?: boolean) => void,
    ) => {
      let isSuccess;
      try {
        await updateInviteStatus({
          variables: { id: invitationId, status },
        });

        isSuccess = true;
      } catch (error) {
        let message = 'Unknown';
        if (error instanceof Error) {
          message = error.message;
        }
        addToast('error', 'none', message);
        Sentry.captureException(new Error(message), {
          tags: {
            section: 'updateInviteStatusMutation',
          },
        });

        isSuccess = false;
      }

      if (callback) callback(isSuccess);

      return isSuccess;
    },
    [addToast, updateInviteStatus],
  );

  return {
    loading,
    updateInviteStatusHelper,
  };
}

export default useUpdateInviteStatus;
