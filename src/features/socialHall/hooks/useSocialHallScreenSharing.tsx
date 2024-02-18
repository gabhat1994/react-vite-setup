import { useCallback, useState, useMemo, useEffect, useRef } from 'react';
import AgoraRTC, {
  type IAgoraRTCClient,
  type IAgoraRTCRemoteUser,
  type ILocalVideoTrack,
  type UID,
} from '@/facade/agora';
import { useSocialHallContext } from '@/providers/SocialHallProvider';
import { useAuth } from '@/features/auth/contexts';
import { SocialHallUtils } from '@/utils/socialHall';
import { useInitializeAgora } from './useInitializeAgora';

let rtcEngine: IAgoraRTCClient;
let localScreenTrack: ILocalVideoTrack | null;

export const useSocialHallScreenSharing = () => {
  const { user } = useAuth();
  const joinedUserIdRef = useRef<UID>();
  const [rtcScreenShareInstance, setRtcScreenShareInstance] =
    useState<IAgoraRTCClient | null>();
  const [rtcInstance, setRtcInstance] = useState<IAgoraRTCClient>();
  const { initializeAgoraScreenShareEngine } = useInitializeAgora();
  const { activeSocialHallGroup } = useSocialHallContext();

  const agoraConfigRef = useRef<{
    token: string;
    channelName: string;
  }>();

  const [isShareScreen, setIsShareScreen] = useState(false);
  const [screenSharingLocalUserFeed, setScreenSharingLocalUserFeed] =
    useState<ILocalVideoTrack | null>();
  const [screenSharingRemoteUserFeed, setScreenSharingRemoteUserFeed] =
    useState<IAgoraRTCRemoteUser | null>();

  const initRtcEngine = useCallback(async () => {
    rtcEngine = await initializeAgoraScreenShareEngine('rtc', 'host');
    setRtcInstance(rtcEngine);
  }, [initializeAgoraScreenShareEngine]);

  const joinChannel = useCallback(async (): Promise<UID | null> => {
    if (joinedUserIdRef.current) {
      return joinedUserIdRef.current;
    }
    if (
      !agoraConfigRef.current?.token &&
      !agoraConfigRef.current?.channelName
    ) {
      return null;
    }
    const joinedUserId = await rtcEngine?.join(
      process.env.VITE_AGORA_APP_ID ?? '',
      agoraConfigRef.current.channelName,
      agoraConfigRef.current.token,
      SocialHallUtils.getScreenShareUid(user?._id!),
    );
    joinedUserIdRef.current = joinedUserId;
    return joinedUserId;
  }, [user?._id]);

  const onScreenSharingStart = useCallback((track: ILocalVideoTrack) => {
    setScreenSharingLocalUserFeed(track);
  }, []);

  const onScreenSharingStop = useCallback(() => {
    setIsShareScreen(false);
    setScreenSharingRemoteUserFeed(null);
    setScreenSharingLocalUserFeed(null);
  }, []);

  const unPublishScreenSharing = useCallback(() => {
    if (localScreenTrack) {
      onScreenSharingStop();
      localScreenTrack.stop();
      localScreenTrack.close();
      rtcScreenShareInstance?.unpublish(localScreenTrack);
      localScreenTrack = null;
    }
  }, [onScreenSharingStop, rtcScreenShareInstance]);

  const closeScreenSharingConnection = useCallback(() => {
    if (isShareScreen) {
      onScreenSharingStop();
    }
    if (rtcScreenShareInstance) {
      rtcScreenShareInstance.leave();
      rtcScreenShareInstance.removeAllListeners();
      setRtcScreenShareInstance(null);
    }
  }, [rtcScreenShareInstance, isShareScreen, onScreenSharingStop]);

  const startScreenSharing = useCallback(async () => {
    try {
      const joinedUserId = await joinChannel();
      if (joinedUserId) {
        setRtcScreenShareInstance(rtcEngine);
        const screenTrack = await AgoraRTC.createScreenVideoTrack(
          {
            encoderConfig: '1080p_2',
            optimizationMode: 'detail',
            screenSourceType: 'screen',
          },
          'disable',
        );
        localScreenTrack = screenTrack;
        onScreenSharingStart(screenTrack);
        await rtcEngine?.publish(screenTrack);
      }
    } catch (err) {
      onScreenSharingStop();
    }
  }, [joinChannel, onScreenSharingStart, onScreenSharingStop]);

  const onToggleScreenSharing = useCallback(async () => {
    if (!isShareScreen) {
      startScreenSharing();
    } else {
      unPublishScreenSharing();
    }
    setIsShareScreen(!isShareScreen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShareScreen, screenSharingRemoteUserFeed]);

  const onScreenSharingFeed = useCallback(
    (remoteUser: IAgoraRTCRemoteUser | null) => {
      setScreenSharingRemoteUserFeed(remoteUser);
    },
    [],
  );

  const screenFeeds = useMemo(
    () => [screenSharingLocalUserFeed, screenSharingRemoteUserFeed],
    [screenSharingLocalUserFeed, screenSharingRemoteUserFeed],
  );

  useEffect(() => {
    agoraConfigRef.current = {
      token: activeSocialHallGroup?.token ?? '',
      channelName: activeSocialHallGroup?.channelName ?? '',
    };
  }, [activeSocialHallGroup]);

  useEffect(() => {
    initRtcEngine();
  }, [initRtcEngine]);

  localScreenTrack?.on('track-ended', unPublishScreenSharing);

  return {
    rtcInstance,
    screenFeeds,
    isShareScreen,
    startScreenSharing,
    onScreenSharingStop,
    onScreenSharingFeed,
    onScreenSharingStart,
    onToggleScreenSharing,
    unPublishScreenSharing,
    screenSharingLocalUserFeed,
    screenSharingRemoteUserFeed,
    closeScreenSharingConnection,
    localScreenSharing: localScreenTrack?.play,
  };
};

export default useSocialHallScreenSharing;
