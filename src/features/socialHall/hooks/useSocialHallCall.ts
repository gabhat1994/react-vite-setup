import { useCallback, useMemo, useState, useEffect } from 'react';
import AgoraRTC, {
  type IAgoraRTCClient,
  type ICameraVideoTrack,
  type ILocalVideoTrack,
  type IMicrophoneAudioTrack,
  type SDK_MODE,
  type UID,
} from '@/facade/agora';
import {
  SDK_MODE_LIVE,
  USER_ROLE_AUDIENCE,
  USER_ROLE_HOST,
} from '@/constants/socialHall';
import { useAuth } from '@/features/auth/contexts';
import { useError } from '@/hooks';
import { useSocialHallEventContext } from '@/providers/SocialHallEventProvider';
import { useSocialHallContext } from '@/providers/SocialHallProvider';
import { useAgoraVideoBackground } from './useAgoraVideoBackground';
import { useInitializeAgora } from './useInitializeAgora';

type AgoraError = Error & {
  code: string;
  name?: string;
};
let rtcEngine: IAgoraRTCClient;
let localAudioTrack: IMicrophoneAudioTrack | null;

type SocialHallCall = {
  agoraChannelUsers: Array<UID>;
  setAskHandsUpOnce?: (value: boolean) => void;
  unPublishScreenSharing: () => void;
  setAgoraChannelUsers: (value?: UID) => void;
  setIsCameraEnable: (value: boolean) => void;
  isMuted: boolean;
  isCameraEnable: boolean;
};

export const useSocialHallCall = ({
  isMuted,
  isCameraEnable,
  agoraChannelUsers,
  setAgoraChannelUsers,
  setIsCameraEnable,
  unPublishScreenSharing,
}: SocialHallCall) => {
  const { enableBackground, disableBackground } = useAgoraVideoBackground();
  const { isMainEvent } = useSocialHallEventContext();
  const [localVideoTrack, setLocalVideoTrack] =
    useState<ICameraVideoTrack | null>();
  const [rtcInstance, setRtcInstance] = useState<IAgoraRTCClient>();
  const [isCameraPublished, setIsCameraPublished] = useState<boolean>(false);
  const { logError } = useError();
  const { user } = useAuth();

  const {
    deviceId,
    virtualBackground,
    socialHallAttendee,
    audioPermissionState,
    videoPermissionState,
    activeSocialHallGroup,
  } = useSocialHallContext();

  const { initializeAgoraEngine } = useInitializeAgora();

  const role = 'host';

  const mode: SDK_MODE = useMemo(
    () => (isMainEvent ? 'live' : 'rtc'),
    [isMainEvent],
  );

  const isJoinedSocialHallCall = useMemo(
    () => agoraChannelUsers.includes(user?._id!),
    [agoraChannelUsers, user?._id],
  );

  const isHost = useMemo(() => role === USER_ROLE_HOST, []);

  const unpublishTrack = useCallback(
    async (
      track: IMicrophoneAudioTrack | ILocalVideoTrack | ICameraVideoTrack,
    ) => {
      try {
        if (track) {
          track.setEnabled(false);
          await rtcEngine?.unpublish(track);
          track.close();
          track.stop();
        }
      } catch (err) {
        logError(err, '', false, true);
      }
    },
    [logError],
  );

  const unpublishVideoTrack = useCallback(async () => {
    if (localVideoTrack) {
      await unpublishTrack(localVideoTrack);
      setLocalVideoTrack(null);
      setIsCameraEnable(false);
    }
  }, [localVideoTrack, unpublishTrack, setIsCameraEnable]);

  const unpublishAudioTrack = useCallback(async () => {
    if (localAudioTrack) {
      await unpublishTrack(localAudioTrack);
      localAudioTrack = null;
    }
  }, [unpublishTrack]);

  const publishVideo = useCallback(
    async (selectedCamera?: string) => {
      try {
        if (localVideoTrack) {
          rtcEngine.publish(localVideoTrack);
          return;
        }
        setIsCameraPublished(true);
        const track = await AgoraRTC.createCameraVideoTrack({
          cameraId: selectedCamera ?? deviceId?.camera,
          facingMode: 'user',
        });
        setLocalVideoTrack(track);
        await rtcEngine.publish(track);
      } catch (err) {
        logError(err, '', false, true);
      }
    },
    [deviceId?.camera, localVideoTrack, logError],
  );

  const publishAudio = useCallback(
    async () => {
      try {
        if (localAudioTrack) {
          await rtcEngine?.publish(localAudioTrack);
          return;
        }
        const microphoneId = deviceId?.microphone;
        await reconnect();
        // create local track from user microphone
        const audioTrack = await AgoraRTC.createMicrophoneAudioTrack({
          microphoneId,
        });
        // Enabling audio Track
        audioTrack.setEnabled(!isMuted);
        // saving the track instance as this need to be destroyed once call closed.
        localAudioTrack = audioTrack;
        // publish for remote users.
        await rtcEngine?.publish(audioTrack);
      } catch (err) {
        logError(err, '', false, true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMuted],
  );

  const closeAgoraCallConnection = useCallback(async (): Promise<void> => {
    try {
      unpublishVideoTrack();
      unpublishAudioTrack();
      unPublishScreenSharing();
      rtcEngine?.removeAllListeners();
      await rtcEngine?.leave();
    } catch (err) {
      logError(err, '', false, true);
    }
  }, [
    logError,
    unpublishAudioTrack,
    unPublishScreenSharing,
    unpublishVideoTrack,
  ]);

  const onStartCall = useCallback(async (): Promise<void> => {
    try {
      if (
        !rtcEngine ||
        (rtcEngine && rtcEngine.connectionState === 'DISCONNECTED')
      ) {
        rtcEngine = await initializeAgoraEngine(mode, role);
        setRtcInstance(rtcEngine);

        const token = activeSocialHallGroup?.token;
        const channelName = activeSocialHallGroup?.channelName;

        if (channelName && token && socialHallAttendee?._id) {
          if (mode === SDK_MODE_LIVE) {
            await rtcEngine?.setClientRole(role);
          }
          const joinedUserId = await rtcEngine.join(
            process.env.VITE_AGORA_APP_ID ?? '',
            channelName,
            token,
            user?._id,
          );
          setAgoraChannelUsers(joinedUserId);
        }
      }
    } catch (error) {
      logError(error, '', false, true);
    }
  }, [
    mode,
    role,
    logError,
    user?._id,
    setAgoraChannelUsers,
    initializeAgoraEngine,
    activeSocialHallGroup,
    socialHallAttendee?._id,
  ]);

  useEffect(() => {
    if (isHost && isJoinedSocialHallCall) {
      if (audioPermissionState === 'granted') {
        publishAudio();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHost, audioPermissionState, isJoinedSocialHallCall]);

  useEffect(() => {
    if (isHost && isJoinedSocialHallCall) {
      if (
        isCameraEnable &&
        videoPermissionState === 'granted' &&
        !isCameraPublished
      ) {
        publishVideo();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isHost,
    isCameraEnable,
    videoPermissionState,
    isCameraPublished,
    isJoinedSocialHallCall,
  ]);

  const reconnect = useCallback(async () => {
    if (rtcEngine.connectionState === 'DISCONNECTED') {
      await onStartCall();
    }
  }, [onStartCall]);

  const onUserRoleChangeToSpeaker = useCallback(async () => {
    try {
      await rtcEngine?.setClientRole(USER_ROLE_HOST);
      await publishAudio();
    } catch (err) {
      logError(err, '', false, true);
    }
  }, [publishAudio, logError]);

  const onUserRoleChangeToAudience = useCallback(async () => {
    try {
      if (localAudioTrack) {
        await unpublishTrack(localAudioTrack);
        if (localVideoTrack) {
          await unpublishTrack(localVideoTrack);
          unPublishScreenSharing();
        }
        await rtcEngine?.setClientRole(USER_ROLE_AUDIENCE);
      }
    } catch (err) {
      logError(err, '', false, true);
    }
  }, [unpublishTrack, logError, localVideoTrack, unPublishScreenSharing]);

  // @TODO: this method should be moved to SocialHallCallProvider
  const leaveCall = async () => {
    try {
      await closeAgoraCallConnection();
    } catch (err) {
      const error = err as AgoraError;
      if (error?.name !== 'RtmInvalidStatusError') {
        logError(err, '', false, true);
      }
    }
  };

  const onPlayBackDeviceChanged = useCallback(
    ({ audioTrackId, videoTrackId }) => {
      if (audioTrackId) {
        localAudioTrack?.setDevice(audioTrackId);
      }
      if (videoTrackId) {
        localVideoTrack?.setDevice(videoTrackId);
      }
    },
    [localVideoTrack],
  );

  useEffect(() => {
    if (localVideoTrack) {
      if (virtualBackground) {
        enableBackground(localVideoTrack);
      } else {
        disableBackground(localVideoTrack);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [virtualBackground, localVideoTrack]);

  return {
    leaveCall,
    rtcInstance,
    onStartCall,
    publishAudio,
    publishVideo,
    localVideoTrack,
    localAudioTrack,
    onPlayBackDeviceChanged,
    closeAgoraCallConnection,
    onUserRoleChangeToSpeaker,
    onUserRoleChangeToAudience,
    unPublishVideo: unpublishVideoTrack,
    unpublishAudio: unpublishAudioTrack,
  };
};

export default useSocialHallCall;
