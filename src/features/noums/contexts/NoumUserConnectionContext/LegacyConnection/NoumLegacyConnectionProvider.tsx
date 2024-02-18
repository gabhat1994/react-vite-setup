import {
  ConnectionPermissionTypeEnum,
  ConnectionRequestTypeEnum,
} from '@/apollo/generated/types';
import {
  useGetConnectionByIdQuery,
  useGetNoumUserConnectionStateQuery,
} from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { type UserActionMode } from '@/screens/Chamber/components/RightPanel/elements/NoumActions/types';
import { SpaceUtils } from '@/utils/space';
import { trackEvent } from '@/utils/tracking';
import { useCallback, useMemo, useState, type ReactNode } from 'react';
import {
  useRequestConnectionHelper,
  useUpdateConnectionStatusHelper,
} from '../../../hooks/spaceQuery';
import {
  NoumUserConnectionContext,
  type NoumUserConnectionContextValues,
} from '../NoumUserConnectionContext';
import { mapConnectionStatusToConnectionPermissionTypeEnum } from '../Membership/mappers';
import { getUserActionMode } from './utils';
import { mapSpaceConnectionToUserNoumConnection } from '../mappers';

interface NoumLegacyConnectionProviderProps {
  children: ReactNode;
}

/** @deprecated This is the old flow and it will be removed soon. */
export function NoumLegacyConnectionProvider({
  children,
}: NoumLegacyConnectionProviderProps) {
  const { user, masterId: userHomeNoumId } = useAuth();
  const { space, isOwner } = useNoumContext();

  const [lastUpdatedConnectionId, setLastUpdatedConnectionId] = useState<
    string | null
  >(null);

  const {
    data: connectionStateData,
    loading: userConnectionLoading,
    refetch: refetchUserConnectionState,
  } = useGetNoumUserConnectionStateQuery({
    variables: {
      noumId: space?._id!,
      userHomeNoumId,
    },
    skip: !space?._id || !userHomeNoumId,
    fetchPolicy: 'cache-first',
  });
  const userConnectionSpace = connectionStateData?.getSpaceById;

  const { requestConnectionHelper, loading: requestingConnectionStatus } =
    useRequestConnectionHelper();
  const { updateConnectionStatusHelper, loading: updatingConnectionStatus } =
    useUpdateConnectionStatusHelper();

  const { data: spaceConnection, loading: loadingProjectNoumConnection } =
    useGetConnectionByIdQuery({
      variables: {
        connectionId: userConnectionSpace?.connectionId!,
      },
      skip: !userConnectionSpace?.connectionId,
    });

  const existingConnection = useMemo(() => {
    if (isOwner) {
      return null;
    }

    if (SpaceUtils.isMasterNoum(space)) {
      return mapSpaceConnectionToUserNoumConnection(
        userConnectionSpace?.connectionWithNoum,
      );
    }

    if (spaceConnection?.getConnectionById?._id) {
      return mapSpaceConnectionToUserNoumConnection(
        spaceConnection.getConnectionById,
      );
    }

    return null;
  }, [
    isOwner,
    space,
    spaceConnection,
    userConnectionSpace?.connectionWithNoum,
  ]);

  const connectionStatus = useMemo(() => {
    if (existingConnection) {
      const validStatuses: ConnectionRequestTypeEnum[] = [
        ConnectionRequestTypeEnum.Invited,
        ConnectionRequestTypeEnum.Approved,
        ConnectionRequestTypeEnum.Requested,
        ConnectionRequestTypeEnum.Declined,
        ConnectionRequestTypeEnum.Cancelled,
        ConnectionRequestTypeEnum.Removed,
      ];
      return (
        validStatuses.find((s) => s === existingConnection?.status) || null
      );
    }

    if (!userConnectionSpace?.connectionId) {
      return undefined;
    }

    if (
      userConnectionSpace?.connectionRole ===
      ConnectionPermissionTypeEnum.Disconnect
    ) {
      return ConnectionRequestTypeEnum.Declined;
    }
    if (userConnectionSpace.isConnected)
      return ConnectionRequestTypeEnum.Approved;

    return spaceConnection?.getConnectionById?.status;
  }, [
    existingConnection,
    spaceConnection?.getConnectionById?.status,
    userConnectionSpace,
  ]);

  const onHandleConnection = useCallback(
    async (nextStatus: ConnectionRequestTypeEnum) => {
      if (!space?._id) return false;

      let isSuccess: boolean = false;

      switch (nextStatus) {
        case ConnectionRequestTypeEnum.Requested:
          isSuccess = await requestConnectionHelper(userHomeNoumId, space?._id);
          break;
        case ConnectionRequestTypeEnum.Approved:
        case ConnectionRequestTypeEnum.Cancelled:
        case ConnectionRequestTypeEnum.Declined:
          isSuccess = await updateConnectionStatusHelper({
            spaceId: space?._id,
            connectionId:
              existingConnection?._id || userConnectionSpace?.connectionId,
            status: nextStatus,
          });
          break;
        default:
          break;
      }

      if (isSuccess) {
        if (
          SpaceUtils.isMasterNoum(space) &&
          nextStatus === ConnectionRequestTypeEnum.Requested
        ) {
          trackEvent('friend_request_sent', {
            UUID: user?._id,
            DeviceType: navigator.userAgent,
          });
        }

        await refetchUserConnectionState();
      }

      return isSuccess;
    },
    [
      space,
      requestConnectionHelper,
      userHomeNoumId,
      updateConnectionStatusHelper,
      existingConnection?._id,
      userConnectionSpace?.connectionId,
      refetchUserConnectionState,
      user?._id,
    ],
  );

  const userActionMode: UserActionMode | null = useMemo(() => {
    if (!space?._id || !userHomeNoumId || isOwner) {
      return null;
    }

    return getUserActionMode(space, existingConnection, userHomeNoumId);
  }, [existingConnection, isOwner, space, userHomeNoumId]);

  const value = useMemo<NoumUserConnectionContextValues>(
    () => ({
      loading: userConnectionLoading || loadingProjectNoumConnection,
      isConnected: connectionStatus === ConnectionRequestTypeEnum.Approved,

      noumMember: null,
      connectionStatus,
      connectionId: existingConnection?._id,
      connectionRole: mapConnectionStatusToConnectionPermissionTypeEnum(
        userConnectionSpace?.connectionRole,
      ),
      existingConnection,
      onHandleConnection,
      onChangeLastUpdatedConnectionId: setLastUpdatedConnectionId,
      userActionMode,
      loadingConnectionStatus:
        requestingConnectionStatus ||
        updatingConnectionStatus ||
        userConnectionLoading ||
        loadingProjectNoumConnection,
      lastUpdatedConnectionId,

      refetchUserConnectionState: async () => {
        await refetchUserConnectionState();
      },

      isFollowing: userConnectionSpace?.isFollowing || false,
    }),
    [
      userConnectionLoading,
      loadingProjectNoumConnection,
      connectionStatus,
      existingConnection,
      userConnectionSpace?.connectionRole,
      userConnectionSpace?.isFollowing,
      onHandleConnection,
      userActionMode,
      requestingConnectionStatus,
      updatingConnectionStatus,
      lastUpdatedConnectionId,
      refetchUserConnectionState,
    ],
  );

  return (
    <NoumUserConnectionContext.Provider value={value}>
      {children}
    </NoumUserConnectionContext.Provider>
  );
}
