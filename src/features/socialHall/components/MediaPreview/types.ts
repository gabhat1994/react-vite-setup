import { type UserOutput } from '@/apollo/generated/types';

export type IMediaPreview = UserOutput & {
  attendee?: UserOutput;
  isFullScreen: boolean;
  isMinimalView: boolean;
  isWebcamActive?: boolean;
  isReconnecting?: boolean;
  isActiveSpeaker?: boolean;
  speakerCarouselPortal?: boolean;
};
