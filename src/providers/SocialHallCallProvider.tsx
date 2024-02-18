import {
  type FC,
  memo,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
  useContext,
  createContext,
} from 'react';
import { omit } from 'lodash';
import { generatePath, useNavigate } from 'react-router';

import {
  type ConnectionState,
  type IAgoraRTCRemoteUser,
  type IRemoteAudioTrack,
  type IRemoteVideoTrack,
  type UID,
} from '@/facade/agora';
import {
  type ISocialHallCallContext,
  type MediaDeviceId,
  type P2PMessageStatus,
  type SubscriptionContent,
  SubscriptionType,
} from '@/screens/SocialHall/types';
import {
  SUBSCRIPTION_MESSAGE,
  SocialHallContextCallInitialValue,
} from '@/screens/SocialHall/const';
import {
  useExitSocialHall,
  useRaiseHandApi,
  useSocialHallMessage,
  useBrowserUnload,
  useSocialHallScreenSharing,
  useSocialHallCall,
  useAgoraEvents,
  useSyncGroupUserList,
} from '@/features/socialHall/hooks';
import ROUTES from '@/constants/routes';
import { useAuth } from '@/features/auth/contexts';
import { SocialHallUtils } from '@/utils/socialHall';
import { setLocalStorage } from '@/utils/localStorage';
import { type UserOutput } from '@/apollo/generated/types';
import accessLocalStorage from '@/constants/accessLocalStorage';
import { useUpdateUserActiveSocialHallGroupCache } from '@/features/socialHall/hooks/gql';

import { useSocialHallContext } from './SocialHallProvider';
import { useSocialHallEventContext } from './SocialHallEventProvider';

const SocialHallCallContext = createContext<ISocialHallCallContext>(
  SocialHallContextCallInitialValue,
);

const SocialHallCallProviderInner: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { user, onSetAcceptedSkipMediaTesting, isUnregistered } = useAuth();
  const { exitFromSocialHall, exitFromSocialHallGroup } = useExitSocialHall();
  const { toggleRaisedHand } = useRaiseHandApi();
  const { getEventUserRole, setIsKicked, eventDetails } =
    useSocialHallEventContext();
  const { updateRaiseHandUsersCache } =
    useUpdateUserActiveSocialHallGroupCache();
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraEnable, setIsCameraEnable] = useState(false);
  const [remoteUserVideoFeeds, setRemoteUserVideoFeeds] = useState<{
    [key: string]: IRemoteVideoTrack;
  }>({});
  const { activeSocialHallGroup, deviceId, setDeviceId } =
    useSocialHallContext();
  const [mutedUsers, setMutedUsers] = useState<UID[]>([]);
  const [camUsers, setCamUsers] = useState<UID[]>([]);
  const [isRaiseHandRejected, setIsRaiseHandRejected] = useState(false);
  const [remoteAudioTrack, setRemoteAudioTrack] = useState<IRemoteAudioTrack>();
  const [agoraConnectionState, setAgoraConnectionState] =
    useState<ConnectionState | null>(null);
  const [p2pMessageStatus, setP2PMessageStatus] = useState<P2PMessageStatus>(
    {} as P2PMessageStatus,
  );
  const [agoraChannelUsers, setAgoraChannelUsers] = useState<UID[]>([]);
  const [networkErrorUsers, setNetworkErrorUsers] = useState<UID[]>([]);
  const [askHandsUpOnce, setAskHandsUpOnce] = useState<boolean>(false);
  const [raisedHandUsers, setRaisedHandUsers] = useState<string[]>([]);

  const socialHallMessageHook = useSocialHallMessage();

  const showRaiseHand = useMemo(
    () => activeSocialHallGroup?.raiseHands?.includes(user?._id!),
    [user?._id, activeSocialHallGroup?.raiseHands],
  );

  const onSendSubscriptionMessage = useCallback(
    async (message: SubscriptionContent) => {
      await socialHallMessageHook.onSendTextMessage(
        JSON.stringify({ ...message, description: SUBSCRIPTION_MESSAGE }),
      );
    },
    [socialHallMessageHook],
  );

  const onSendPeerToPeerMessage = useCallback(
    async ({ type, peerId, data }): Promise<void> => {
      const config = { type, peerId, isPending: true, isReceived: false };
      setP2PMessageStatus(config);
      const isReceived = await socialHallMessageHook.onSendP2PMessage(
        JSON.stringify({ data, type, description: SUBSCRIPTION_MESSAGE }),
        peerId,
      );
      setP2PMessageStatus({
        ...config,
        isPending: false,
        isReceived,
      });
    },
    [socialHallMessageHook],
  );

  useBrowserUnload(() => {
    if (!isEventOwner) {
      socialHallCallHook.rtcInstance?.leave();
      onSendSubscriptionMessage({
        type: SubscriptionType.QUIT_ATTENDEE_ON_SOCIAL_HALL,
      });
    }
  });

  const {
    onScreenSharingStop,
    onScreenSharingStart,
    onScreenSharingFeed,
    unPublishScreenSharing,
    ...socialHallScreenSharingHooks
  } = useSocialHallScreenSharing();

  const {
    localAudioTrack,
    publishVideo,
    unPublishVideo,
    ...socialHallCallHook
  } = useSocialHallCall({
    isMuted,
    isCameraEnable,
    agoraChannelUsers,
    setAskHandsUpOnce,
    setIsCameraEnable,
    unPublishScreenSharing,
    setAgoraChannelUsers: (uid?: UID) => {
      onUpdateAgoraChannelUsers(!!uid, user?._id!);
    },
  });

  const onReset = useCallback(() => {
    setMutedUsers([]);
    setIsMuted(false);
    setAgoraChannelUsers([]);
    setNetworkErrorUsers([]);
    onScreenSharingStop();
    setRaisedHandUsers([]);
    socialHallMessageHook.setMessages([]);
    setRemoteUserVideoFeeds({});
  }, [onScreenSharingStop, socialHallMessageHook]);

  const onLeaveCall = useCallback(async () => {
    await onSendSubscriptionMessage({
      type: SubscriptionType.QUIT_ATTENDEE_ON_SOCIAL_HALL,
    });
    await socialHallCallHook.leaveCall();
    await socialHallMessageHook.onCloseAgoraMessagingConnection();
    socialHallScreenSharingHooks.closeScreenSharingConnection();
    onReset();
    setLocalStorage(accessLocalStorage.GUEST_REDIRECT_TO_URI);
    navigate(
      generatePath(isUnregistered ? ROUTES.GUEST_HOME : ROUTES.HOME_NOUM),
    );
    // This settime is required or else it will again trigger the mic/camera track
    setTimeout(() => {
      onSetAcceptedSkipMediaTesting();
    }, 3000);
  }, [
    onSendSubscriptionMessage,
    socialHallCallHook,
    socialHallMessageHook,
    socialHallScreenSharingHooks,
    onReset,
    navigate,
    isUnregistered,
    onSetAcceptedSkipMediaTesting,
  ]);

  const onExitSocialHallCall = useCallback(async () => {
    if (agoraChannelUsers.length) {
      onLeaveCall();
      exitFromSocialHallGroup(activeSocialHallGroup?._id!);
      exitFromSocialHall();
    }
  }, [
    onLeaveCall,
    exitFromSocialHall,
    exitFromSocialHallGroup,
    agoraChannelUsers.length,
    activeSocialHallGroup?._id,
  ]);

  const onUpdateAgoraChannelUsers = useCallback(
    (isChannelUser: boolean, uid: UID) => {
      setAgoraChannelUsers((users) =>
        SocialHallUtils.updateUsers(isChannelUser, uid, users),
      );
    },
    [],
  );

  const startCall = useCallback(async () => {
    await socialHallMessageHook.startMessaging();
    await onSendSubscriptionMessage({
      type: SubscriptionType.NEW_ATTENDEE_IN_GROUP_CALL,
      data: {
        ...SocialHallUtils.getUserOutput(user as UserOutput),
        getEventUserRole,
        __typename: 'UserOutput',
      },
    });
    socialHallCallHook.onStartCall();
  }, [
    socialHallMessageHook,
    socialHallCallHook,
    onSendSubscriptionMessage,
    user,
    getEventUserRole,
  ]);

  const agoraCallbacks = useMemo(
    () => ({
      userMuteAudio: (userId: UID, muted: boolean) => {
        setMutedUsers((users) =>
          SocialHallUtils.updateUsers(muted, userId, users),
        );
      },
      joinChannelSuccess: (uid: UID) => {
        onUpdateAgoraChannelUsers(true, uid);
        setNetworkErrorUsers((users) =>
          SocialHallUtils.updateUsers(false, uid, users),
        );
      },
      remoteUserleftChannel: (uid: UID) => {
        // @NOTE: Method called 10s after remote user leaves channel,
        // may cause issues if rejoined within 10s. So, careful with this.
        setNetworkErrorUsers((users) =>
          SocialHallUtils.updateUsers(true, uid, users),
        );
      },
      screenSharingFeed: onScreenSharingFeed,
      videoSharingFeedPublished: (remoteUser: IAgoraRTCRemoteUser | null) => {
        if (remoteUser) {
          setCamUsers((users) =>
            SocialHallUtils.updateUsers(true, remoteUser.uid, users),
          );
          setRemoteUserVideoFeeds((_user) => ({
            ..._user,
            [remoteUser.uid]: remoteUser.videoTrack as IRemoteVideoTrack,
          }));
        }
      },
      videoSharingFeedUnPublished: (uid: UID) => {
        setCamUsers((users) => SocialHallUtils.updateUsers(false, uid, users));
        setRemoteUserVideoFeeds((feeds) => omit(feeds, [uid]));
      },
      connectionStateChange: setAgoraConnectionState,
      userNetworkError: (uid: UID) => {
        setNetworkErrorUsers((users) =>
          SocialHallUtils.updateUsers(true, uid, users),
        );
      },
      onRemoteAudioPublished: (remoteAudio: IRemoteAudioTrack) => {
        setRemoteAudioTrack(remoteAudio);
      },
    }),
    [onScreenSharingFeed, onUpdateAgoraChannelUsers],
  );

  useAgoraEvents(socialHallCallHook?.rtcInstance, agoraCallbacks);

  useSyncGroupUserList(socialHallCallHook.rtcInstance!);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onUpdateMuteState = (isMute: boolean, uid: string) => {
    // Only reset value incase of local user
    if (uid === user?._id) {
      setIsMuted(isMute);
    }
    setMutedUsers(SocialHallUtils.updateUsers(isMute, uid, mutedUsers));
  };

  const toggleMuteCall = useCallback(
    async (defaultMuteState?: boolean) => {
      const isMute =
        defaultMuteState === undefined ? isMuted : defaultMuteState;
      localAudioTrack?.setEnabled(isMute);
      onUpdateMuteState(!isMute, user?._id!);
    },
    [isMuted, onUpdateMuteState, localAudioTrack, user],
  );

  const toggleCamera = useCallback(() => {
    setIsCameraEnable(!isCameraEnable);
    if (isCameraEnable) {
      unPublishVideo();
      setCamUsers(SocialHallUtils.updateUsers(false, user?._id!, camUsers));
    } else {
      publishVideo();
      setCamUsers(SocialHallUtils.updateUsers(true, user?._id!, camUsers));
    }
  }, [
    camUsers,
    isCameraEnable,
    publishVideo,
    setIsCameraEnable,
    unPublishVideo,
    user?._id,
  ]);

  const isEventOwner = useMemo(
    () => eventDetails?.userId?._id === user?._id,
    [eventDetails?.userId, user?._id],
  );

  const onSendMessage = useCallback(
    async (text?: string, file?: File) => {
      if (text) {
        socialHallMessageHook.onSendRemoteMessage(text, async (msg) => {
          await socialHallMessageHook.onSendTextMessage(msg as string);
        });
      }
      if (file) {
        socialHallMessageHook.onSendRemoteMessage(file, async (image) => {
          socialHallMessageHook.onSendImageMessage(image as Blob);
        });
      }
    },
    [socialHallMessageHook],
  );

  const closeAgoraConnection = useCallback(async () => {
    await socialHallCallHook.closeAgoraCallConnection();
    await socialHallMessageHook.onCloseAgoraMessagingConnection();
  }, [socialHallCallHook, socialHallMessageHook]);

  const onUpdateMutedUsers = useCallback((uid: UID, muted: boolean) => {
    setMutedUsers((users) => SocialHallUtils.updateUsers(muted, uid, users));
  }, []);

  const onToggleRaiseHand = useCallback(() => {
    if (!askHandsUpOnce) {
      setAskHandsUpOnce(true);
    }
    toggleRaisedHand(!showRaiseHand, user?._id!);
    onSendSubscriptionMessage({
      type: SubscriptionType.RAISED_HAND,
      data: !showRaiseHand,
    });
    updateRaiseHandUsersCache(!showRaiseHand, user?._id!);
  }, [
    askHandsUpOnce,
    showRaiseHand,
    setAskHandsUpOnce,
    onSendSubscriptionMessage,
    toggleRaisedHand,
    user?._id,
    updateRaiseHandUsersCache,
  ]);

  const onHostBlocked = useCallback(async () => {
    if (showRaiseHand) {
      onToggleRaiseHand();
    }
    await onExitSocialHallCall();
    setIsKicked(true);
  }, [setIsKicked, showRaiseHand, onToggleRaiseHand, onExitSocialHallCall]);

  // Remove all remote user information
  const onRemoteUserLeftChannel = useCallback(
    (uid: UID) => {
      setNetworkErrorUsers((users) =>
        SocialHallUtils.updateUsers(false, uid, users),
      );
      setMutedUsers((users) => SocialHallUtils.updateUsers(false, uid, users));
      onUpdateAgoraChannelUsers(false, uid);
      setCamUsers((users) => SocialHallUtils.updateUsers(false, uid, users));
      setRemoteUserVideoFeeds((feeds) => omit(feeds, [uid]));
    },
    [onUpdateAgoraChannelUsers],
  );

  const onChangeDevice = useCallback(
    (device: MediaDeviceId) => {
      socialHallCallHook.onPlayBackDeviceChanged({
        audioTrackId: device?.microphone,
        videoTrackId: device?.camera,
      });
      setDeviceId(device);
    },
    [setDeviceId, socialHallCallHook],
  );

  useEffect(() => {
    if (activeSocialHallGroup?.raiseHands) {
      setRaisedHandUsers(activeSocialHallGroup?.raiseHands as string[]);
    } else {
      setRaisedHandUsers([]);
    }
  }, [activeSocialHallGroup?.raiseHands]);

  useEffect(() => {
    if (showRaiseHand) {
      setIsRaiseHandRejected(false);
    }
  }, [showRaiseHand]);

  useEffect(
    () => () => {
      onExitSocialHallCall();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (deviceId?.speaker && remoteAudioTrack) {
      remoteAudioTrack.setPlaybackDevice(deviceId?.speaker);
    }
  }, [remoteAudioTrack, deviceId?.speaker]);

  const value: ISocialHallCallContext = useMemo(
    () => ({
      isMuted,
      camUsers,
      onReset,
      startCall,
      mutedUsers,
      setIsMuted,
      setCamUsers,
      onLeaveCall,
      toggleCamera,
      publishVideo,
      showRaiseHand,
      onSendMessage,
      onHostBlocked,
      unPublishVideo,
      isCameraEnable,
      toggleMuteCall,
      askHandsUpOnce,
      raisedHandUsers,
      onChangeDevice,
      p2pMessageStatus,
      onUpdateMuteState,
      setAskHandsUpOnce,
      setIsCameraEnable,
      agoraChannelUsers,
      onToggleRaiseHand,
      networkErrorUsers,
      onUpdateMutedUsers,
      setRaisedHandUsers,
      isRaiseHandRejected,
      remoteUserVideoFeeds,
      closeAgoraConnection,
      onExitSocialHallCall,
      agoraConnectionState,
      unPublishScreenSharing,
      onRemoteUserLeftChannel,
      onSendPeerToPeerMessage,
      onUpdateAgoraChannelUsers,
      onSendSubscriptionMessage,
      rtcEngine: socialHallCallHook.rtcInstance,
      isRemoteScreenSharing:
        !!socialHallScreenSharingHooks.screenSharingRemoteUserFeed?.hasVideo,
      ...socialHallMessageHook,
      ...socialHallCallHook,
      ...socialHallScreenSharingHooks,
    }),
    [
      isMuted,
      onReset,
      camUsers,
      startCall,
      mutedUsers,
      onLeaveCall,
      publishVideo,
      toggleCamera,
      onSendMessage,
      showRaiseHand,
      onHostBlocked,
      onChangeDevice,
      toggleMuteCall,
      askHandsUpOnce,
      isCameraEnable,
      unPublishVideo,
      raisedHandUsers,
      p2pMessageStatus,
      networkErrorUsers,
      agoraChannelUsers,
      onUpdateMuteState,
      setIsCameraEnable,
      onToggleRaiseHand,
      onUpdateMutedUsers,
      socialHallCallHook,
      isRaiseHandRejected,
      onExitSocialHallCall,
      closeAgoraConnection,
      agoraConnectionState,
      remoteUserVideoFeeds,
      socialHallMessageHook,
      unPublishScreenSharing,
      onRemoteUserLeftChannel,
      onSendPeerToPeerMessage,
      onUpdateAgoraChannelUsers,
      onSendSubscriptionMessage,
      socialHallScreenSharingHooks,
    ],
  );

  return (
    <SocialHallCallContext.Provider value={value}>
      {children}
    </SocialHallCallContext.Provider>
  );
};

export const useSocialHallCallContext = () => useContext(SocialHallCallContext);

export const SocialHallCallProvider = memo(SocialHallCallProviderInner);
