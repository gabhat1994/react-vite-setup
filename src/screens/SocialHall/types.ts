import { type QueryResult } from '@apollo/client';
import { type Dispatch, type SetStateAction } from 'react';
import {
  type IRemoteVideoTrack,
  type IAgoraRTCClient,
  type IAgoraRTCRemoteUser,
  type ICameraVideoTrack,
  type ILocalVideoTrack,
  type IMicrophoneAudioTrack,
  type UID,
  type ConnectionState,
} from '@/facade/agora';

import {
  type UserActiveSocialHallGroupQuery,
  type SocialHallAttendeesAndGroupsQuery,
  type UserActiveSocialHallGroupQueryVariables,
  type SocialHallAttendeesAndGroupsQueryVariables,
} from '@/apollo/graphql';

import type {
  Maybe,
  UserRole,
  UserOutput,
  EventsStatus,
  SpeakerInvitation,
  SpeakerInvitationSubscriptionData,
  CurrentUser,
  Event,
} from '@/apollo/generated/types';
import {
  type MessageBubbleType,
  type MessageBubbleStatus,
  type MediaMessageProps,
} from '@/features/conversation/components/MessageBubbles';
import { type RtmChannel, type RtmClient } from '@/facade/agoraRTM';
import { type MediaVirtualBackground } from '@/features/socialHall/components';
import {
  type EventUserOutputFragment,
  type UserBasicOutputFragment,
  type UserFragment,
  type SocialHallAttendeeFragment,
} from '@/apollo/graphql/fragments';

export interface MediaDeviceLabel
  extends Pick<MediaDeviceInfo, 'deviceId' | 'groupId' | 'label' | 'kind'> {}

export type ConnectedDevices = {
  audioDevices: MediaDeviceLabel[];
  cameraDevices: MediaDeviceLabel[];
  speakerDevices: MediaDeviceLabel[];
};

export enum MessageAlignment {
  Left = 'left',
  Right = 'right',
  Center = 'center',
}

export type MediaDeviceId = {
  microphone: string;
  speaker?: string;
  camera: string;
};

export type SocialHallChatUserDetails = {
  _id: UID;
  profileUrl?: string;
};

export type ReceivedMessageProperties = {
  serverReceivedTs: number;
};

export type SocialHallChat = SocialHallChatUserDetails &
  MediaMessageProps & {
    name?: string;
    status: MessageBubbleStatus;
    align?: MessageAlignment;
    messageDeliveryType: MessageBubbleType;
    message: string | File | Blob;
    messageType: MessageType;
    style?: HTMLStyleElement;
    uid: string;
    type: MessageBubbleType;
  };

export enum MessageType {
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
  NOTIFICATION = 'NOTIFICATION',
}

export type ExtendedRtmChannel = RtmChannel & {
  joinState?: string;
};

export interface ISocialHallContext {
  isHost: boolean;
  groupId?: string;
  socialHallId: string;
  showBuzzRoom: boolean;
  isGridLayout: boolean;
  hasVideoPermission: boolean;
  hasAudioPermission: boolean;
  isPersonalSocialHall: boolean;
  onCloseFullScreen: () => void;
  refreshVisualization: () => void;
  deviceId: MediaDeviceId | undefined;
  stageAttendees?: UserBasicOutputFragment[];
  socialHallAttendee?: SocialHallAttendeeFragment;
  audienceAttendees?: UserBasicOutputFragment[];
  activeSocialHallGroup?:
    | UserActiveSocialHallGroupQuery['userActiveSocialHallGroup']
    | null;
  isWaitingForHost: boolean;
  showBrowserSupportBanner: boolean;
  videoPermissionState: PermissionState | null;
  audioPermissionState: PermissionState | null;
  selectDefaultMediaInput: () => Promise<void>;
  speakerInvitation?: Maybe<SpeakerInvitation>;
  userActiveGroupData?: QueryResult<
    UserActiveSocialHallGroupQuery,
    UserActiveSocialHallGroupQueryVariables
  >;
  socialHallAttendeesAndGroups?: QueryResult<
    SocialHallAttendeesAndGroupsQuery,
    SocialHallAttendeesAndGroupsQueryVariables
  >;
  askHandsUpOnce: boolean;
  isBlockNavigate: boolean;
  onSwitchLayout: Dispatch<SetStateAction<boolean>>;
  setShowBuzzRoom: Dispatch<SetStateAction<boolean>>;
  setAskHandsUpOnce: Dispatch<SetStateAction<boolean>>;
  setIsBlockNavigate: Dispatch<SetStateAction<boolean>>;
  virtualBackground: MediaVirtualBackground | null;
  setShowBrowserSupportBanner: Dispatch<SetStateAction<boolean>>;
  setDeviceId: Dispatch<SetStateAction<MediaDeviceId | undefined>>;
  setVirtualBackground: Dispatch<SetStateAction<MediaVirtualBackground | null>>;
}

export type P2PMessageStatus = {
  type: SubscriptionType;
  isPending: boolean;
  isReceived: boolean;
  peerId: string;
};

type SendPeer2PeerMessageProps = {
  type: SubscriptionType;
  peerId: string;
  data?: Object | [];
};

export interface ISocialHallCallContext {
  rtmEngine?: RtmClient;
  isMuted: boolean;
  camUsers: UID[];
  mutedUsers: UID[];
  groupId?: string;
  groupName?: string;
  isShareScreen: boolean;
  showRaiseHand?: boolean;
  isCameraEnable: boolean;
  networkErrorUsers: UID[];
  raisedHandUsers: string[];
  agoraChannelUsers?: UID[];
  messages?: SocialHallChat[];
  rtcEngine?: IAgoraRTCClient;
  isRaiseHandRejected: boolean;
  isRemoteScreenSharing: boolean;
  currentUserRole?: UserRole | null;
  rtmChannel?: ExtendedRtmChannel | null;
  localAudioTrack?: IMicrophoneAudioTrack;
  localVideoTrack?: ICameraVideoTrack | null;
  agoraConnectionState: ConnectionState | null;
  onChangeDevice: (device: MediaDeviceId) => void;
  screenSharingLocalUserFeed?: ILocalVideoTrack | null;
  speakerSubscription?: SpeakerInvitationSubscriptionData;
  screenSharingRemoteUserFeed?: IAgoraRTCRemoteUser | null;
  remoteUserVideoFeeds: { [key: string]: IRemoteVideoTrack } | null;
  joinLeaveMember: UserOutput | undefined;
  showUserJoined: boolean;
  showUserLeave: boolean;
  joinedUsers: Maybe<UserOutput>[];
  p2pMessageStatus: P2PMessageStatus;

  setCamUsers: Dispatch<SetStateAction<UID[]>>;
  onReset: () => void;
  startCall: () => void;
  onHostBlocked: () => Promise<void>;
  onSendPeerToPeerMessage: (props: SendPeer2PeerMessageProps) => Promise<void>;
  toggleMuteCall: (defaultMuteState?: boolean) => void;
  unPublishVideo: () => void;
  unpublishAudio: () => void;
  toggleCamera: () => void;
  onToggleRaiseHand: () => void;
  setIsCameraEnable: Dispatch<SetStateAction<boolean>>;
  onRemoteUserLeftChannel: (uid: UID | string) => void;
  onLeaveCall: () => Promise<void>;
  onExitSocialHallCall: () => Promise<void>;
  publishVideo: (selectedCamera?: string) => Promise<void>;
  closeAgoraConnection: () => void;
  onToggleScreenSharing: () => void;
  unPublishScreenSharing: () => void;
  setIsEndedEvent?: (value: boolean) => void;
  onSendMessage: (text: string, file?: File) => void;
  onUpdateMutedUsers: (uid: UID, isMuted: boolean) => void;
  onUpdateMuteState: (isMute: boolean, uid: string) => void;
  onPlayBackDeviceChanged: (track: {
    audioTrackId: string | null;
    videoTrackId: string | null;
  }) => void;
  setIsMuted: Dispatch<SetStateAction<boolean>>;
  setRaisedHandUsers: Dispatch<SetStateAction<string[]>>;
  setMessages: Dispatch<SetStateAction<SocialHallChat[]>>;
  onUpdateAgoraChannelUsers: (isChannelUser: boolean, uid: UID) => void;
  setShowUserJoined: Dispatch<SetStateAction<boolean>>;
  setShowUserLeave: Dispatch<SetStateAction<boolean>>;
  resetMembersNotification: () => void;
  onSendSubscriptionMessage: (message: SubscriptionContent) => void;
}
export interface ISocialHallEventContext {
  groupName: string;
  isKicked: boolean;
  hostJoined: boolean;
  isPreEvent?: boolean;
  isEndedEvent: boolean;
  isEventHost: boolean;
  isMainEvent: boolean;
  isPostEvent: boolean;
  isEventOwner: boolean;
  isEventSpeaker: boolean;
  isCancelledEvent: boolean;
  remainTimeForEvent: number;
  eventDetails: Event | null;
  onCancelledEvent: () => void;
  onUserBlockedSuccess: () => void;
  onCloseEvent: () => Promise<void>;
  setIsKicked: (value: boolean) => void;
  onRedirectToEventFinished: () => void;
  setIsEndedEvent: (value: boolean) => void;
  eventOwner?: EventUserOutputFragment | UserFragment | null;
  getEventUserRole?: CurrentUser | undefined | null;
  onUpdateEventStatus: (status: EventsStatus) => Promise<void>;
}

export enum SubscriptionType {
  RAISED_HAND = 'RAISED_HAND',
  KNOCK_UPDATES = 'KNOCK_UPDATES',
  KNOCK_ACCEPTED = 'KNOCK_ACCEPTED',
  UPDATE_GROUP_NAME = 'UPDATE_GROUP_NAME',
  SPEAKER_INVITATION = 'SPEAKER_INVITATION',
  UPDATE_EVENT_STATUS = 'UPDATE_EVENT_STATUS',
  SOCIAL_HALL_UPDATES = 'SOCIAL_HALL_UPDATES',
  QUIT_ATTENDEE_ON_GROUP = 'QUIT_ATTENDEE_ON_GROUP',
  NEW_ATTENDEE_IN_GROUP_CALL = 'NEW_ATTENDEE_IN_GROUP_CALL',
  MUTE_ATTENDEE_IN_GROUP_CALL = 'MUTE_ATTENDEE_IN_GROUP_CALL',
  NEW_ATTENDEE_ON_SOCIAL_HALL = 'NEW_ATTENDEE_ON_SOCIAL_HALL',
  QUIT_ATTENDEE_ON_SOCIAL_HALL = 'QUIT_ATTENDEE_ON_SOCIAL_HALL',
  BLOCK_ATTENDEE_ON_GROUP_CALL = 'BLOCK_ATTENDEE_ON_GROUP_CALL',
  UNMUTE_ATTENDEE_IN_GROUP_CALL = 'UNMUTE_ATTENDEE_IN_GROUP_CALL',
}

export type SubscriptionContent = {
  type: SubscriptionType;
  description?: string;
  data?: Object | [];
};

export interface Document {
  webkitFullscreenElement?: Element;
  exitFullscreen?: () => Promise<void>;
  webkitExitFullscreen?: () => Promise<void>;
}
