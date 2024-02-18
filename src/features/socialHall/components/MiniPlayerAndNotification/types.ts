import { type Maybe, type Knock } from '@/apollo/generated/types';
import {
  type GroupProfilePopupProps,
  type UserProfilePopupProps,
} from '../ProfilePopup/types';

export type KnockNotificationProps = {
  timer?: number;
  isSingle: boolean;
  notification?: Maybe<Knock>;
  isHostJoined?: boolean;
};

export type MiniPlayerProps = {
  isLeaveLoading?: boolean;
  isCloseLoading?: boolean;
  isMuteLoading?: boolean;
};

export type MiniPlayerAndNotificationProps = MiniPlayerProps &
  UserProfilePopupProps &
  GroupProfilePopupProps & {
    initialNotifications: Maybe<Knock>[];
  } & {
    showMiniPlayerNotification: boolean;
  };
