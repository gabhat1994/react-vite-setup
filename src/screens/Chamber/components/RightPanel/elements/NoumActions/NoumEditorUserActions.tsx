import React, { useEffect, useMemo, useState } from 'react';

import { SpaceTypeEnum } from '@/apollo/generated/types';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { useWindowDimensions } from '@/hooks';
import { type MessagePayload } from '@/services/rest/firebase';
import { Stack } from '@/layout';
import { breakpoints } from '@/constants/devices';
import { useAuth } from '@/features/auth/contexts';
import { useRequestConnectionHelper } from '@/features/noums/hooks/spaceQuery';
import { usePushNotification } from '@/features/push-notifications/contexts/PushNotification';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { SpaceUtils } from '@/utils/space';
import { NoumUserConnection } from './NoumUserConnection';
import { NoumRequestConnection } from './NoumRequestConnection';
import { NoumUserFollow } from './NoumUserFollow';
import { UserActionMode } from './types';
import { NoumSendMessage } from './NoumSendMessage';
import { RiseNoumUserApplyButton } from './RiseNoumUserApplyButton';
import RiseApplicationActions from '../../../ProfileSummary/RiseApplicationV2/RiseApplicationActions';

export const NoumEditorUserActions: React.FC = () => {
  const { masterId: mainSpaceId } = useAuth();
  const {
    isOwner,
    space,
    loadingSpace,
    loading,
    refetchSpaceById: onRefetchSpaceById,
  } = useNoumContext();
  const {
    connectionStatus,
    onHandleConnection,
    loadingConnectionStatus,
    userActionMode,
    isConnected,
  } = useNoumUserConnectionContext();

  const { isUnregistered } = useAuth();

  // clinet state. It will be true instantly when user connected to space
  const [isUnregisteredUserConnected, setIsUnregisterUserConneccted] =
    useState(false);

  const { requestConnectionHelper, loading: connectionLoading } =
    useRequestConnectionHelper();

  const windowSize = useWindowDimensions();

  const isMobile = useMemo(
    () => windowSize.width <= breakpoints.MOBILE_L,
    [windowSize.width],
  );

  const { onForegroundMessage } = usePushNotification();

  const inLoadingState =
    connectionLoading || loading || loadingSpace || loadingConnectionStatus;

  const spaceCanBeConnected =
    !isConnected &&
    !!space?.enableAds &&
    !!space._id &&
    !isUnregisteredUserConnected; // client state for is connected

  const allowUserToAutoConnect = isUnregistered && !!mainSpaceId;

  // Functionality for SEO enabled noums. Auto connect unregistered user to noum when user lands first time on page
  useEffect(() => {
    const connect = async () => {
      if (
        allowUserToAutoConnect &&
        spaceCanBeConnected &&
        !inLoadingState &&
        space?._id
      ) {
        requestConnectionHelper(mainSpaceId, space._id);
        setIsUnregisterUserConneccted(true);
        onRefetchSpaceById();
      }
    };
    connect();
  }, [
    allowUserToAutoConnect,
    inLoadingState,
    mainSpaceId,
    onRefetchSpaceById,
    requestConnectionHelper,
    spaceCanBeConnected,
    space,
  ]);

  useEffect(
    () =>
      onForegroundMessage((message: MessagePayload) => {
        const chamberIdFromNotification = message.data?.chamberId;
        if (chamberIdFromNotification === space?._id) {
          switch (message.data?.pnId) {
            case 'connectionInviteAccepted':
            case 'connectionInviteDeclined':
              onRefetchSpaceById();
              break;
          }
        }
      }),
    [onForegroundMessage, onRefetchSpaceById, space],
  );

  const isRiseNoum = SpaceUtils.isRiseNoum(space);

  return (
    <Stack gap={12} fullWidth={isMobile}>
      {/*  space.category rise apply now button */}
      {isRiseNoum && isConnected && <RiseNoumUserApplyButton isNoumEditor />}
      {space?._id !== mainSpaceId &&
        !isOwner &&
        !isUnregistered &&
        !SpaceUtils.isMasterNoum(space) &&
        !SpaceUtils.isSecretNoum(space) &&
        isRiseNoum && <NoumUserFollow isNoumEditor />}
      {SpaceUtils.isMasterNoum(space) && space?.uid?._id ? (
        <NoumSendMessage ownerId={space.uid._id} isNoumEditor />
      ) : null}
      {userActionMode === UserActionMode.handleConnection &&
        !isUnregistered && (
          <NoumUserConnection
            onHandle={onHandleConnection!}
            loading={loadingConnectionStatus}
            isNoumEditor
          />
        )}
      {userActionMode === UserActionMode.handleRequest && (
        <NoumRequestConnection
          connectionStatus={connectionStatus}
          onHandle={onHandleConnection!}
          loading={loadingConnectionStatus}
          isNoumEditor
        />
      )}
      {isConnected && space?.type === SpaceTypeEnum.RiseApplication && (
        <RiseApplicationActions />
      )}
    </Stack>
  );
};
