import { type Intent } from '@/components/Dropdown';

export enum EventStatusEnum {
  NotStarted = 'NOT_STARTED',
  Countdown = 'COUNTDOWN',
  Started = 'STARTED',
}

export type SocialHallHeaderProps = {
  onViewAttendees?: () => void;
  onInviteAttendees?: () => void;
  onChangeGroupName?: () => void;
};

export type GroupNameWrapperProps = {
  isBuzzRoom: boolean;
  showMobileView: boolean;
  children: React.ReactNode;
};

export type HeaderBottomSheetProps = {
  onChangeGroupName?: () => void;
  isScreenSharing: boolean;
};

export type SocialHallHeaderMenuOptionProps = {
  key: string;
  label: string;
  value: string;
  iconName: string;
  labelColor: string;
  type: 'value';
  icon?: JSX.Element;
  intent?: Intent;
};

export type LayoutSwitchBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  onLayoutChange: (isGrid: boolean) => void;
};

export type MoreOptionsBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  onChangeRoomNameClick?: () => void;
  onSettingsClick?: () => void;
};

export type LayoutToggleProps = {
  isScreenSharing: boolean;
};
