import { useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import {
  type ConnectionState,
  type IAgoraRTCClient,
  type IAgoraRTCRemoteUser,
  type IRemoteAudioTrack,
  type UID,
} from '@/facade/agora';
import { type RtmMessage } from '@/facade/agoraRTM';
import {
  AGORA_EVENT,
  USER_OFFLINE_REASON,
  USER_PUBLISH_STATE,
} from '@/constants/socialHall';
import { type ReceivedMessageProperties } from '@/screens/SocialHall/types';
import { SocialHallUtils } from '@/utils/socialHall';

type Agora = {
  connectionStateChange?: (state: ConnectionState) => void;
  userNetworkError?: (uid: UID) => void;
  onMemeberLeft?: (uid: string) => void;
  onMemeberJoined?: (uid: string) => void;
  joinChannelSuccess?: (uid: UID) => void;
  remoteUserleftChannel?: (uid: UID) => void;
  onRemoteAudioPublished?: (remoteAudio: IRemoteAudioTrack) => void;
  userMuteAudio?: (uid: UID, isMute: boolean) => void;
  screenSharingFeed?: (user: IAgoraRTCRemoteUser | null) => void;
  videoSharingFeedPublished?: (user: IAgoraRTCRemoteUser | null) => void;
  videoSharingFeedUnPublished?: (user: UID) => void;
  onChannelMessage?: (
    message: RtmMessage,
    memberId: string,
    messageProps?: ReceivedMessageProperties,
  ) => void;
};

export const useAgoraEvents = (rtcEngine?: IAgoraRTCClient, cb: Agora = {}) => {
  const onCloseShareScreen = useCallback(() => {
    if (document.exitFullscreen && document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, []);

  const bindEvent = useCallback(() => {
    const {
      userMuteAudio,
      userNetworkError,
      screenSharingFeed,
      joinChannelSuccess,
      remoteUserleftChannel,
      connectionStateChange,
      onRemoteAudioPublished,
      videoSharingFeedPublished,
      videoSharingFeedUnPublished,
    } = cb;

    rtcEngine?.on(AGORA_EVENT.USER_INFO_UPDATED, (uid: UID, msg: string) => {
      if (!userMuteAudio) {
        return;
      }

      if (msg === USER_PUBLISH_STATE.MUTE_AUDIO) {
        userMuteAudio(uid, true);
      } else if (msg === USER_PUBLISH_STATE.UNMUTE_AUDIO) {
        userMuteAudio(uid, false);
      }
    });

    rtcEngine?.on(
      AGORA_EVENT.USER_PUBLISHED,
      async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
        await rtcEngine?.subscribe(user, mediaType);
        if (mediaType === 'audio') {
          const remoteAudioTrack = user.audioTrack;
          remoteAudioTrack?.play();
          onRemoteAudioPublished?.(remoteAudioTrack!);
        }
        if (mediaType === 'video' && user.hasVideo) {
          if (SocialHallUtils.isScreenShareFeed(user.uid)) {
            screenSharingFeed?.(user);
          } else {
            videoSharingFeedPublished?.(user);
          }
        }
      },
    );

    rtcEngine?.on(
      AGORA_EVENT.USER_UNPUBLISHED,
      async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
        await rtcEngine?.unsubscribe(user, mediaType);
        if (mediaType === 'video') {
          if (SocialHallUtils.isScreenShareFeed(user.uid)) {
            screenSharingFeed?.(null);
            onCloseShareScreen();
          } else {
            videoSharingFeedUnPublished?.(user.uid);
          }
        }
      },
    );

    // Remote user joined the channel
    rtcEngine?.on(AGORA_EVENT.USER_JOINED, (user: IAgoraRTCRemoteUser) => {
      joinChannelSuccess?.(user.uid);
    });

    // Remote user leaves the channel
    rtcEngine?.on(
      AGORA_EVENT.USER_LEFT,
      (user: IAgoraRTCRemoteUser, reason: string) => {
        if (
          userNetworkError &&
          reason === USER_OFFLINE_REASON.SERVER_TIME_OUT
        ) {
          userNetworkError(user.uid);
        }

        if (remoteUserleftChannel && reason === USER_OFFLINE_REASON.QUIT) {
          remoteUserleftChannel(user.uid);
        }
      },
    );

    // Local user leaves the channel
    rtcEngine?.on(
      AGORA_EVENT.CONNECTION_STATE_CHANGE,
      debounce((curState: ConnectionState) => {
        connectionStateChange?.(curState);
      }, 2000),
    );
  }, [cb, onCloseShareScreen, rtcEngine]);

  useEffect(() => {
    if (rtcEngine) {
      bindEvent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rtcEngine]);
};

export default useAgoraEvents;
