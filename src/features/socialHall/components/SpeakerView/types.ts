import { type UserOutput } from '@/apollo/generated/types';
import { type ICameraVideoTrack, type IRemoteVideoTrack, type UID } from '@/facade/agora';

export type SpeakerViewProps = {
  userFeeds: UserOutput[];
  isMinimalView?: boolean;
  activeSpeaker?: string | UID;
  speakerFeed: UserOutput | null;
  isInvited?: (attendeeId: string) => boolean;
  videoFeed?: (userId: string) => IRemoteVideoTrack | ICameraVideoTrack | null;
  clientWidth: number;
  clientHeight: number;
  showChatPanel?: boolean;
  showMembersPanel?: boolean;
  isFullScreen?: boolean;
};
