import { type Maybe } from '@/apollo/generated/types';
import { type EventFragment } from '@/apollo/graphql';
import {
  type IActiveFilter,
  type IEventHandlers,
} from '@/features/events/hooks';

export interface NoEventsProps {
  activeFilter: IActiveFilter;
  loading: boolean;
  onAddEvent: () => void;
}

interface ISharedProps
  extends Omit<IEventHandlers, 'onGoLive' | 'onJoinEvent'> {
  events: EventFragment[];
  onEditEvent: (ev: EventFragment) => void;
  onGoLive: (ev: EventFragment) => Promise<void>;
  onJoinEvent: (ev: EventFragment) => void;
}

export interface CalendarEventsListExpandedProps extends ISharedProps {
  eventHost: string;
  masterNoumId: Maybe<string>;
  refetchEvents: () => void;
  isNoumLayoutSmallViewMode?: boolean;
  eventsCount?: number;
}

export interface CalendarEventsPlaceHolderProps {
  isNoumLayoutSmallViewMode?: boolean;
}
