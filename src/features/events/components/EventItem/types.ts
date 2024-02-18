import { type UserRole } from '@/apollo/generated/types';
import { type EventFragment } from '@/apollo/graphql';
import { type Maybe } from '@/common/types';

export interface ItemType {
  type?: 'notification' | 'calendar';
  isEventDetail?: boolean;
  isNoumLayoutSmallViewMode?: boolean;
}

type SharedEventProps = ItemType & {
  onEditEvent: () => void;
  onGoLive: () => Promise<void>;
  onJoinEvent: () => void;
  onAccept: () => Promise<void>;
  onDecline: () => Promise<void>;
  onAttend: () => Promise<void>;
  onAttending: () => Promise<void>;
  onNotAttending: () => Promise<void>;
  onCopyLink?: () => void;
  onAddToCalendar?: () => void;
  isEventDetail?: boolean;
  isNoumLayoutSmallViewMode?: boolean;
};

export type TooltipPosition = 'top' | 'bottom';

export type EventItemProps = SharedEventProps & {
  chamberId: string;
  event: EventFragment;
  showEndTime?: boolean;
  notClickable?: boolean;
  hideDescription?: boolean;
  hideActionButtons?: boolean;
  hideBottomBorder?: boolean;
  onClickSeeMore?: () => void;
  tooltipPosition?: TooltipPosition;
  onViewAttendees: (eventId: string, isHost: boolean) => void;
};

export type EventItemButtonsProps = SharedEventProps & {
  noumId?: string;
  role?: UserRole;
  event: Maybe<EventFragment>;
};
