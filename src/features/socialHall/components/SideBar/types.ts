import { type SocialGroup, type SocialHallAttendee } from '@/apollo/generated/types';

export enum KnockStatusEnum {
  Knocked = 'KNOCKED',
  IsKnocking = 'IS_KNOCKING',
  IsKnocked = 'IS_KNOCKED',
  Normal = 'NORMAL',
  Accepted = 'ACCEPTED',
}

export type SideBarUserListItemProps = {
  userInfo: SocialHallAttendee;
  knockLoading?: boolean;
  showKnockBtn?: boolean;
  isUserOnCall?: boolean;
};

export type SideBarGroupListItemProps = {
  groupInfo: SocialGroup;
  isUserOnCall?: boolean;
};
