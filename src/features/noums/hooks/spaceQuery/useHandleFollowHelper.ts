import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import { useHandleFollowMutation } from '@/apollo/graphql';
import {
  type FollowActionEnum,
  type FollowSource,
} from '@/apollo/generated/types';
import { useToast } from '@/hooks/toast';

export function useHandleFollowHelper() {
  const { addToast } = useToast();

  const [handleFollow, { loading }] = useHandleFollowMutation();

  const handleFollowHelper = useCallback(
    async (
      spaceId: string,
      action: FollowActionEnum,
      source?: FollowSource,
    ) => {
      let isSuccess;
      try {
        await handleFollow({
          variables: { spaceId, action, source },
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
            section: 'handleFollow',
          },
        });

        isSuccess = false;
      }

      return isSuccess;
    },
    [addToast, handleFollow],
  );

  return {
    loading,
    handleFollowHelper,
  };
}

export default useHandleFollowHelper;
