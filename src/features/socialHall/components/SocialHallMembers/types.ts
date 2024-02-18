import { type UserOutput } from '@/apollo/generated/types';

interface SideBarUserItem extends UserOutput {
  isMuted?: boolean;
  isCameraEnable?: boolean;
  invitationStatus?: string;
}

export enum SideBarType {
  ON_STAGE,
  AUDIENCE,
  RAISED_HAND,
}

export type SideBarSection = {
  header: string;
  type: SideBarType;
  data: UserOutput[];
};

export type SideBarUserItemProps = {
  isOffline: boolean;
  user: SideBarUserItem;
  sideBarType: SideBarType;
  refetchAudience: () => void;
  isInvited?: (attendeeId: string) => boolean;
};

export type SocialHallMembersProps = {
  onClose: () => void;
  show: boolean;
  onlineAttendees: UserOutput[];
  isInvited?: (attendeeId: string) => boolean;
};
