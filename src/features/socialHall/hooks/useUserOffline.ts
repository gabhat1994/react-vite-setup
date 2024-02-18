import { debounce } from 'lodash';
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { SocialHallUtils } from '@/utils/socialHall';
import { AGORA_EVENT, USER_OFFLINE_REASON } from '@/constants/socialHall';
import {
  type ConnectionState,
  type IAgoraRTCRemoteUser,
  type UID,
} from '@/facade/agora';
import { REMOVE_OFFLINE_USER } from '@/screens/SocialHall/const';
import { useSocialHallContext } from '@/providers/SocialHallProvider';
import { useSocialHallCallContext } from '@/providers/SocialHallCallProvider';

export const useUserOffline = (): [UID[], Dispatch<SetStateAction<UID[]>>] => {
  const timer = useRef<NodeJS.Timeout>();
  /**
   * We will use connectionLostUsers only to hide from stage, if user
   * network revives then we will unhide it.
   */
  const [connectionLostUsers, setConnectionLostUsers] = useState<UID[]>([]);
  const { userActiveGroupData } = useSocialHallContext();
  const { rtcEngine, rtmChannel } = useSocialHallCallContext();

  /**
   * We're monitoring the RTM `onMemberLeft` event as it's triggered
   * when user connection revival completely fails, such as when a user
   * goes offline or closes the tab where browser fails to trigger `window.unload` event.
   */
  const onMemberConnectionTemporarilyLost = useCallback(
    (user: IAgoraRTCRemoteUser, reason: string) => {
      if (reason === USER_OFFLINE_REASON.SERVER_TIME_OUT) {
        timer.current = setTimeout(() => {
          setConnectionLostUsers((users) =>
            SocialHallUtils.updateUsers(true, user.uid, users),
          );
        }, REMOVE_OFFLINE_USER);
      }
    },
    [setConnectionLostUsers],
  );

  const onChannelJoinedSuccess = useCallback((user) => {
    clearTimeout(timer.current);
    setConnectionLostUsers((users) =>
      SocialHallUtils.updateUsers(false, user.uid, users),
    );
  }, []);

  rtcEngine?.on(
    AGORA_EVENT.CONNECTION_STATE_CHANGE,
    debounce((currentState: ConnectionState, prevState: ConnectionState) => {
      if (currentState === 'CONNECTED' && prevState === 'RECONNECTING') {
        userActiveGroupData?.refetch();
      }
    }, 2000),
  );

  const bindEvent = useCallback(() => {
    if (!rtmChannel || !rtcEngine) {
      return;
    }
    rtcEngine?.on(AGORA_EVENT.USER_JOINED, onChannelJoinedSuccess);
    rtcEngine?.on(AGORA_EVENT.USER_LEFT, onMemberConnectionTemporarilyLost);
  }, [
    rtcEngine,
    rtmChannel,
    onChannelJoinedSuccess,
    onMemberConnectionTemporarilyLost,
  ]);

  useEffect(() => {
    bindEvent();
    return () => {
      rtcEngine?.off(AGORA_EVENT.USER_JOINED, onChannelJoinedSuccess);
      rtcEngine?.off(AGORA_EVENT.USER_LEFT, onMemberConnectionTemporarilyLost);
    };
  }, [
    bindEvent,
    rtcEngine,
    rtmChannel,
    onChannelJoinedSuccess,
    onMemberConnectionTemporarilyLost,
  ]);

  return [connectionLostUsers, setConnectionLostUsers];
};
