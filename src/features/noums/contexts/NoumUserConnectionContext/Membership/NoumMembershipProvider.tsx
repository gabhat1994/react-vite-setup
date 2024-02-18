import { ConnectionRequestTypeEnum } from '@/apollo/generated/types';
import {
  GetNoumMembersCountDocument,
  type UserBasicOutputFragment,
  useGetNoumUserConnectionStateQuery,
  useNoumMemberQuery,
  useGetConnectionByIdQuery,
  useApproveNoumInvitationMutation,
} from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { type UserActionMode } from '@/screens/Chamber/components/RightPanel/elements/NoumActions/types';
import { SpaceUtils } from '@/utils/space';
import { trackEvent } from '@/utils/tracking';
import { useApolloClient } from '@apollo/client';
import { useCallback, useMemo, useState, type ReactNode } from 'react';
import {
  useCancelConnectionRequestToNoumHelper,
  useConnectToNoumHelper,
  useLeaveNoumMembershipHelper,
  useRequestConnectionHelper,
  useUpdateConnectionStatusHelper,
} from '../../../hooks/spaceQuery';
import {
  NoumUserConnectionContext,
  type NoumUserConnectionContextValues,
} from '../NoumUserConnectionContext';
import { type UserNoumConnection } from '../types';
import {
  mapConnectionStatusToConnectionPermissionTypeEnum,
  mapMembershipStatusToUserNoumConnection,
} from './mappers';
import { getUserActionMode } from './utils';
import { mapSpaceConnectionToUserNoumConnection } from '../mappers';
import { useNoumAuthorizationContext } from '../../NoumAuthorizationContext/NoumAuthorizationContext';

interface NoumMembershipProviderProviderProps {
  children: ReactNode;
}

export function NoumMembershipProviderProvider({
  children,
}: NoumMembershipProviderProviderProps) {
  const apolloClient = useApolloClient();

  const { user, masterId: userHomeNoumId } = useAuth();
  const { space, isOwner } = useNoumContext();
  const { refetchNoumAuthorizationData } = useNoumAuthorizationContext();

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

  const memberId = userConnectionSpace?.membershipStatus?._id;

  const { data: memberData } = useNoumMemberQuery({
    variables: {
      memberId: memberId!,
      noumId: space?._id!,
    },
    skip: !memberId || !space?._id,
    fetchPolicy: 'cache-and-network',
  });

  const { data: spaceConnection, loading: loadingHomeNoumConnection } =
    useGetConnectionByIdQuery({
      variables: {
        connectionId: userConnectionSpace?.connectionId!,
      },
      skip:
        !SpaceUtils.isMasterNoum(space) || !userConnectionSpace?.connectionId,
    });

  const { requestConnectionHelper, loading: requestingConnectionStatus } =
    useRequestConnectionHelper();
  const { updateConnectionStatusHelper, loading: updatingConnectionStatus } =
    useUpdateConnectionStatusHelper();
  const { connectToNoumHelper, loading: connectToNoumLoader } =
    useConnectToNoumHelper();
  const { leaveNoumMembershipHelper, loading: loadingLeaveNoumMembership } =
    useLeaveNoumMembershipHelper({
      onSuccess: () => {
        apolloClient.refetchQueries({ include: [GetNoumMembersCountDocument] });
      },
    });
  const {
    cancelConnectionRequestToNoumHelper,
    loading: loadingCancelConnectionRequestToNoum,
  } = useCancelConnectionRequestToNoumHelper();
  const [approveNoumInvitationMutation, { loading: approveInvitationLoading }] =
    useApproveNoumInvitationMutation();

  const existingConnection = useMemo<UserNoumConnection | null>(() => {
    if (isOwner) return null;

    // Project Noum - members
    if (SpaceUtils.isProjectNoum(space)) {
      if (userConnectionSpace?.membershipStatus?._id) {
        const { membershipStatus } = userConnectionSpace;
        return mapMembershipStatusToUserNoumConnection(
          membershipStatus,
          user as UserBasicOutputFragment,
        );
      }
    }

    // Home Noum - legacy connections
    if (SpaceUtils.isMasterNoum(space)) {
      if (spaceConnection?.getConnectionById?._id) {
        return mapSpaceConnectionToUserNoumConnection(
          spaceConnection.getConnectionById,
        );
      }
    }

    return null;
  }, [isOwner, space, spaceConnection, user, userConnectionSpace]);

  const onHandleConnection = useCallback(
    async (nextStatus: ConnectionRequestTypeEnum) => {
      if (!space?._id) return false;

      let isSuccess = false;

      if (SpaceUtils.isProjectNoum(space)) {
        switch (nextStatus) {
          case ConnectionRequestTypeEnum.Requested:
            isSuccess = await connectToNoumHelper(space._id);
            break;
          case ConnectionRequestTypeEnum.Approved:
            await approveNoumInvitationMutation({
              variables: {
                noumId: space?._id,
              },
            });
            isSuccess = true;
            break;
          case ConnectionRequestTypeEnum.Declined:
            isSuccess = await leaveNoumMembershipHelper(space._id);
            break;
          case ConnectionRequestTypeEnum.Cancelled:
            isSuccess = await cancelConnectionRequestToNoumHelper(space._id);
            break;
          default:
            break;
        }
        if (isSuccess) {
          await refetchUserConnectionState();
          if (nextStatus === ConnectionRequestTypeEnum.Approved) {
            await refetchNoumAuthorizationData();
          }
        }
      } else {
        switch (nextStatus) {
          case ConnectionRequestTypeEnum.Requested:
            isSuccess = await requestConnectionHelper(
              userHomeNoumId,
              space?._id,
            );
            if (isSuccess) {
              trackEvent('friend_request_sent', {
                UUID: user?._id,
                DeviceType: navigator.userAgent,
              });
            }
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
      }

      return isSuccess;
    },
    [
      space,
      existingConnection?._id,
      connectToNoumHelper,
      approveNoumInvitationMutation,
      userConnectionSpace?.connectionId,
      cancelConnectionRequestToNoumHelper,
      leaveNoumMembershipHelper,
      refetchUserConnectionState,
      refetchNoumAuthorizationData,
      requestConnectionHelper,
      userHomeNoumId,
      updateConnectionStatusHelper,
      user?._id,
    ],
  );

  const userActionMode: UserActionMode | null = useMemo(() => {
    if (!space?._id || !user?._id || isOwner) {
      return null;
    }

    return getUserActionMode(space, existingConnection, user._id);
  }, [existingConnection, isOwner, space, user?._id]);

  const value = useMemo<NoumUserConnectionContextValues>(
    () => ({
      loading: userConnectionLoading || loadingHomeNoumConnection,
      isConnected:
        existingConnection?.status === ConnectionRequestTypeEnum.Approved,

      noumMember: memberData?.noumMember,
      connectionStatus: existingConnection?.status,
      connectionId:
        existingConnection?._id || userConnectionSpace?.connectionId,
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
        connectToNoumLoader ||
        loadingCancelConnectionRequestToNoum ||
        loadingLeaveNoumMembership ||
        approveInvitationLoading ||
        loadingHomeNoumConnection,
      lastUpdatedConnectionId,

      refetchUserConnectionState: async () => {
        refetchUserConnectionState();
      },

      isFollowing: userConnectionSpace?.isFollowing || false,
    }),
    [
      approveInvitationLoading,
      connectToNoumLoader,
      existingConnection,
      lastUpdatedConnectionId,
      loadingCancelConnectionRequestToNoum,
      loadingHomeNoumConnection,
      loadingLeaveNoumMembership,
      memberData?.noumMember,
      onHandleConnection,
      refetchUserConnectionState,
      requestingConnectionStatus,
      updatingConnectionStatus,
      userActionMode,
      userConnectionLoading,
      userConnectionSpace?.connectionId,
      userConnectionSpace?.connectionRole,
      userConnectionSpace?.isFollowing,
    ],
  );

  return (
    <NoumUserConnectionContext.Provider value={value}>
      {children}
    </NoumUserConnectionContext.Provider>
  );
}
