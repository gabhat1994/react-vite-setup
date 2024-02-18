import { useCallback } from 'react';
import {
  ConnectionRequestTypeEnum,
  type Maybe,
} from '@/apollo/generated/types';
import {
  useGetInviteNonNoumenaMemberLazyQuery,
  useGetSpaceConnectionsLazyQuery,
} from '@/apollo/graphql';
import { useUpdateConnectionStatusHelper } from '@/features/noums/hooks/spaceQuery';
import { type NotificationFragment } from '@/apollo/graphql/fragments';
import { type UseConnectionNotificationHandlersOptions } from './types';

export function useConnectionNotificationHandlers({
  onNotificationRead,
}: UseConnectionNotificationHandlersOptions) {
  const { updateConnectionStatusHelper } = useUpdateConnectionStatusHelper();
  const acceptConnection = useCallback(
    async (
      notification: NotificationFragment,
      invitationId: Maybe<string> | undefined,
    ) => {
      if (!invitationId) {
        return;
      }
      await updateConnectionStatusHelper({
        spaceId: notification?.data?.chamber?._id || '',
        connectionId: invitationId,
        status: ConnectionRequestTypeEnum.Approved,
      });
      await onNotificationRead(notification);
    },
    [onNotificationRead, updateConnectionStatusHelper],
  );

  const rejectConnection = useCallback(
    async (
      notification: NotificationFragment,
      invitationId: Maybe<string> | undefined,
    ) => {
      if (!invitationId) {
        return;
      }

      await updateConnectionStatusHelper({
        spaceId: notification?.data?.chamber?._id || '',
        connectionId: invitationId,
        status: ConnectionRequestTypeEnum.Declined,
      });
      await onNotificationRead(notification);
    },
    [onNotificationRead, updateConnectionStatusHelper],
  );

  const [getSpaceConnections] = useGetSpaceConnectionsLazyQuery();
  const [getNonNoumenaMembers] = useGetInviteNonNoumenaMemberLazyQuery();
  const refetchConnectionData = useCallback(
    async (spaceId: Maybe<string> | undefined) => {
      if (!spaceId) {
        return;
      }

      await getSpaceConnections({
        variables: {
          spaceId,
        },
      });

      await getNonNoumenaMembers({
        variables: {
          noumId: spaceId,
        },
      });
    },
    [getNonNoumenaMembers, getSpaceConnections],
  );

  return {
    acceptConnection,
    rejectConnection,
    refetchConnectionData,
  };
}
