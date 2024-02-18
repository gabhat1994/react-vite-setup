/**
 * This hook operates once Agora sends a notification about a new user joining the channel.
 * Within a 2-second window from the Agora notification, it verifies the presence of that user in the groupList.
 * If the user is not found in the list, it then retrieves an updated groupList from the back end.
 */
import { useEffect, useCallback } from 'react';

import { AGORA_EVENT } from '@/constants/socialHall';
import { useSocialHallContext } from '@/providers';
import { type IAgoraRTCClient, type IAgoraRTCRemoteUser } from '@/facade/agora';

export const useSyncGroupUserList = (rtcEngine: IAgoraRTCClient) => {
  // Presuming that the user list will be updated by this point in time.
  const USER_CHECK_INTERVAL = 1800;
  const { userActiveGroupData, activeSocialHallGroup } = useSocialHallContext();

  const onUserJoined = useCallback(
    ({ uid }: IAgoraRTCRemoteUser) => {
      const timeout = setTimeout(() => {
        const userInGroupList = activeSocialHallGroup?.users?.find(
          (user) => user?._id === uid,
        );

        if (!userInGroupList) {
          userActiveGroupData?.refetch();
        }
        clearTimeout(timeout);
      }, USER_CHECK_INTERVAL);
    },
    [activeSocialHallGroup?.users, userActiveGroupData],
  );

  useEffect(() => {
    if (rtcEngine?.on) {
      rtcEngine.on(AGORA_EVENT.USER_JOINED, onUserJoined);
    }
    return () => {
      rtcEngine?.off(AGORA_EVENT.USER_JOINED, onUserJoined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rtcEngine]);
};
