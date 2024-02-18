import {
  type ISocialHallCallContext,
  type ISocialHallEventContext,
  type P2PMessageStatus,
  type ISocialHallContext,
} from '@/screens/SocialHall/types';

export const MainEventStartTimer = 120000; // 2mint

export const ScreenShareUidPostFix = 'screen_share_feed';

export const knockTimer = 120000;
export const HideDeclineKnockTimer = 5000;

export const MediaInputType = {
  AudioInput: 'audioinput',
  VideoInput: 'videoinput',
  Speaker: 'audiooutput',
};

// This will remove the offline user after 20s
export const REMOVE_OFFLINE_USER = 20000;

export const SUBSCRIPTION_MESSAGE = 'SUBSCRIPTION_MESSAGE';

export const MainEventSpeakerNotificationTimer = 7000;

export const SocialHallContextInitialValue: ISocialHallContext = {
  isHost: false,
  socialHallId: '',
  showBuzzRoom: false,
  isGridLayout: false,
  askHandsUpOnce: false,
  setDeviceId: () => {},
  isBlockNavigate: true,
  virtualBackground: null,
  isWaitingForHost: false,
  onSwitchLayout: () => {},
  hasAudioPermission: true,
  hasVideoPermission: true,
  setShowBuzzRoom: () => {},
  videoPermissionState: null,
  audioPermissionState: null,
  isPersonalSocialHall: false,
  setAskHandsUpOnce: () => {},
  activeSocialHallGroup: null,
  onCloseFullScreen: () => {},
  setIsBlockNavigate: () => {},
  refreshVisualization: () => {},
  showBrowserSupportBanner: false,
  setVirtualBackground: () => {},
  setShowBrowserSupportBanner: () => {},
  selectDefaultMediaInput: async () => {},
  deviceId: { microphone: '', camera: '', speaker: '' },
};

export const SocialHallContextCallInitialValue: ISocialHallCallContext = {
  camUsers: [],
  isMuted: false,
  mutedUsers: [],
  joinedUsers: [],
  raisedHandUsers: [],
  isShareScreen: false,
  showRaiseHand: false,
  isCameraEnable: false,
  showUserJoined: false,
  showUserLeave: false,
  networkErrorUsers: [],
  isRaiseHandRejected: false,
  remoteUserVideoFeeds: null,
  isRemoteScreenSharing: false,
  joinLeaveMember: undefined,
  agoraConnectionState: null,
  p2pMessageStatus: {} as P2PMessageStatus,

  onReset: () => {},
  startCall: () => {},
  setMessages: () => {},
  setCamUsers: () => {},
  toggleMuteCall: () => {},
  unPublishVideo: () => {},
  unpublishAudio: () => {},
  onChangeDevice: () => {},
  setIsEndedEvent: () => {},
  onUpdateMuteState: () => {},
  onSendMessage: () => {},
  toggleCamera: () => {},
  onToggleRaiseHand: () => {},
  onHostBlocked: async () => {},
  onExitSocialHallCall: async () => {},
  onSendPeerToPeerMessage: async () => {},
  onPlayBackDeviceChanged: async () => {},
  onLeaveCall: async () => {},
  publishVideo: async () => {},
  setIsCameraEnable: () => {},
  setIsMuted: () => {},
  onUpdateMutedUsers: () => {},
  setRaisedHandUsers: () => {},
  onToggleScreenSharing: () => {},
  closeAgoraConnection: () => {},
  unPublishScreenSharing: () => {},
  onUpdateAgoraChannelUsers: () => {},
  setShowUserLeave: () => {},
  setShowUserJoined: () => {},
  resetMembersNotification: () => {},
  onRemoteUserLeftChannel: () => {},
  onSendSubscriptionMessage: () => {},
};

export const SocialHallEventContextInitialValue: ISocialHallEventContext = {
  groupName: '',
  eventDetails: null,
  isKicked: false,
  eventOwner: null,
  hostJoined: false,
  isPreEvent: false,
  isEventHost: false,
  isMainEvent: false,
  isPostEvent: false,
  isEventOwner: false,
  isEndedEvent: false,
  isEventSpeaker: false,
  remainTimeForEvent: 0,
  isCancelledEvent: false,

  setIsKicked: () => {},
  setIsEndedEvent: () => {},
  onCancelledEvent: () => {},
  onCloseEvent: async () => {},
  onUserBlockedSuccess: () => {},
  onUpdateEventStatus: async () => {},
  onRedirectToEventFinished: () => {},
};
