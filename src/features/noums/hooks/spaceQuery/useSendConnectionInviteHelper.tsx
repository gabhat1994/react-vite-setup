import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/client';
import {
  GetSpaceConnectionsDocument,
  type GetSpaceConnectionsQuery,
  RequestedConnectionDocument,
  useSendConnectionInviteMutation,
} from '@/apollo/graphql';
import { useToast } from '@/hooks';

export function useSendConnectionInviteHelper() {
  const [sendConnectionInvite] = useSendConnectionInviteMutation();
  const { addToast } = useToast();
  const { t } = useTranslation();
  const apolloClient = useApolloClient();

  const sendInvite = useCallback(
    async (ownSpaceId: string, invitedSpaceId: string, message: string) => {
      await sendConnectionInvite({
        variables: {
          ownSpaceId,
          invitedSpaceId,
          message,
        },
        onError: (error) => {
          Sentry.captureException(error, {
            tags: {
              section: 'sendConnectionInvite',
            },
          });
          if (error instanceof Error) {
            addToast('error', 'none', `${error.message}`);
          } else {
            addToast(
              'error',
              'none',
              t('noumena.chamber_view.visibility.invite_error'),
            );
          }
        },
        update: (cache, { data }) => {
          if (!data || !data.sendConnectionInvite) return;

          const cachedData = cache.readQuery({
            query: GetSpaceConnectionsDocument,
            variables: { spaceId: ownSpaceId },
          }) as GetSpaceConnectionsQuery;
          if (!cachedData) return;
          const { getSpaceConnections: connections } = cachedData;
          if (!connections) return;
          const cloneConnections = [...connections];
          const mergedArray = [data.sendConnectionInvite, ...cloneConnections];
          cache.writeQuery({
            query: GetSpaceConnectionsDocument,
            variables: { spaceId: ownSpaceId },
            data: {
              getSpaceConnections: mergedArray,
            },
          });
        },
      });

      apolloClient.refetchQueries({
        include: [RequestedConnectionDocument],
      });
    },
    [addToast, apolloClient, sendConnectionInvite, t],
  );

  return {
    sendInvite,
  };
}
