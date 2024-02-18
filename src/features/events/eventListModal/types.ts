import { type EventFragment } from '@/apollo/graphql';
import {
  type IActiveFilter,
  type IEventHandlers,
} from '@/features/events/hooks';
import { type NetworkStatus } from '@apollo/client';
import { type ItemType } from '../components/EventItem/types';

export interface EventListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditEvent: (ev: EventFragment, callback?: () => void) => void;
}

export enum EventGroupKeys {
  liveEvents = 'liveEvents',
  upcomingEvents = 'upcomingEvents',
  finishedEvents = 'finishedEvents',
}

export type IGroupedEvents = {
  [groupKey in EventGroupKeys]: EventFragment[];
};

export type IGroupedEventsProps = { events: EventFragment[] } & Omit<
  IEventHandlers,
  'onGoLive' | 'onJoinEvent'
> & {
    chamberId: string;
    onEditEvent: (ev: EventFragment) => void;
    onGoLive: (ev: EventFragment) => Promise<void>;
    onJoinEvent: (ev: EventFragment) => void;
    refetchEvents: () => void;
    type: ItemType['type'];
  };

export interface IInfiniteScrollProps {
  networkStatus: NetworkStatus;
  totalCount: number;
  fetchMore: () => Promise<void>;
  activeFilter: IActiveFilter;
}
