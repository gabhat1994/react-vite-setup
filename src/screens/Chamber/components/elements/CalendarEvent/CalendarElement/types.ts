import { type EventsFilter, type Maybe } from '@/apollo/generated/types';
import { type EventFragment } from '@/apollo/graphql';
import { type DropdownValueType } from '@/components/Dropdown';
import { type ElementWrapperProps } from '@/screens/Chamber/components/ElementWrapper';

export type CalendarElementProps = ElementWrapperProps;

type EventFilter = EventsFilter | 'all';

export interface CalendarElementGuestViewProps {
  masterNoumId: Maybe<string>;
  events: EventFragment[];
  onEditEvent: (ev: EventFragment) => void;
  onRefetchEvents: () => void;
  onGoLive: (event: EventFragment) => Promise<void>;
  onJoin: (event: EventFragment) => void;
  onAccept: (eventId: string, acceptAll: boolean) => Promise<void>;
  onDecline: (eventId: string, declineAll: boolean) => Promise<void>;
  onAttend: (eventId: string, acceptAll: boolean) => Promise<void>;
  onAttending: (eventId: string, acceptAll: boolean) => Promise<void>;
  onNotAttending: (eventId: string, acceptAll: boolean) => Promise<void>;
  isNoumLayoutSmallViewMode?: boolean;
}

export interface CalendarElementOwnerViewProps
  extends CalendarElementGuestViewProps {
  loading: boolean;
  eventsCount: number;
  activeFilter: EventFilter;
  activeViewMode: string;
  onChangeFilter: (f: string) => void;
  onChangeViewMode: (v: string) => void;
  onAddEvent: () => void;
  onCopyLink?: (socialHallId: string) => void;
}

export interface ViewModeHeaderProps {
  showAddEventBtn: boolean;
  hasEvents: boolean;
  currentTitle?: string;
  chamberId: string;
  isStartNowModalOpen: boolean;
  toggleStartNowModal: () => void;
  handleDropdownClick: (arg: DropdownValueType<number>) => void;
  selectedCustomPreviewTab?: string;
  onAddEvent?: () => void;
}

export interface SubHeaderProps {
  activeFilter: string;
  activeViewMode: string;
  onFilterChange: (f: string) => void;
  onViewModeChange: (v: string) => void;
}

export interface AllEventsProps {
  isOpen: boolean;
  onClose: () => void;
  isOwner: boolean;
  isNoumLayoutSmallViewMode?: boolean;
  spaceId: string;
  chamberId: string;
  spaceType: string;
}
