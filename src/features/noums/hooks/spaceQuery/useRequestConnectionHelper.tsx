import { type Maybe } from '@/apollo/generated/types';
import {
  GetSpaceConnectionsV2Document,
  useRequestConnectionMutation,
} from '@/apollo/graphql';
import { useToast } from '@/hooks/toast';
import * as Sentry from '@sentry/react';
import { useCallback } from 'react';
import { updateUserNoumConnectionFragment } from '../../utils/userNoumConnectionCache';

export function useRequestConnectionHelper() {
  const { addToast } = useToast();

  const [requestConnection, { loading }] = useRequestConnectionMutation();

  const requestConnectionHelper = useCallback(
    async (ownSpaceId: Maybe<string> | undefined, requestedSpaceId: string) => {
      if (!ownSpaceId) return false;

      let isSuccess;
      try {
        await requestConnection({
          variables: { ownSpaceId, requestedSpaceId },
          refetchQueries: [GetSpaceConnectionsV2Document],
          update: (cache, { data }) => {
            if (!data || !data.requestConnection) return;

            updateUserNoumConnectionFragment({
              cache,
              noumId: requestedSpaceId,
              data: {
                isConnected: true,
                connectionId: data.requestConnection._id,
                connectionWithNoum: data.requestConnection,
                connectionRole: data.requestConnection.permission,
              },
            });
          },
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
            section: 'requestConnection',
          },
        });

        isSuccess = false;
      }

      return isSuccess;
    },
    [addToast, requestConnection],
  );

  return {
    loading,
    requestConnectionHelper,
  };
}

export default useRequestConnectionHelper;
