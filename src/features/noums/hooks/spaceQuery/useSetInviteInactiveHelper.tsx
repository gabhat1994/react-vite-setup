import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import {
  GetInviteNonNoumenaMemberDocument,
  type GetInviteNonNoumenaMemberQuery,
  useSetInviteInactiveMutation,
} from '@/apollo/graphql';
import { type Maybe } from '@/apollo/generated/types';
import { useToast } from '@/hooks/toast';

export function useSetInviteInactiveHelper() {
  const { addToast } = useToast();

  const [setInviteInactive, { loading }] = useSetInviteInactiveMutation();

  const setInvitedMemberInactive = useCallback(
    async (
      token: Maybe<string> | undefined,
      spaceId: Maybe<string> | undefined,
    ) => {
      if (!token) return false;

      let isSuccess;
      try {
        await setInviteInactive({
          variables: { token },
          update: (cache, { data }) => {
            if (!data || !data.setInviteInactive) return;
            const { getinviteNonNoumenaMember: nonMemberData } =
              cache.readQuery({
                query: GetInviteNonNoumenaMemberDocument,
                variables: { noumId: spaceId },
              }) as GetInviteNonNoumenaMemberQuery;
            if (!nonMemberData || !nonMemberData?.count) return;
            const cloneConnections = nonMemberData?.data || [];
            const mergedArray = cloneConnections.filter(
              (item) => item?._id !== token,
            );
            cache.writeQuery({
              query: GetInviteNonNoumenaMemberDocument,
              variables: { noumId: spaceId },
              data: {
                getinviteNonNoumenaMember: mergedArray,
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
            section: 'updateConnectionStatus',
          },
        });

        isSuccess = false;
      }

      return isSuccess;
    },
    [addToast, setInviteInactive],
  );

  return {
    loading,
    setInvitedMemberInactive,
  };
}

export default useSetInviteInactiveHelper;
