import { useMemo } from 'react';

import { Spinner } from '@/components/Spinner';
import { NetworkStatus } from '@apollo/client';
import { EventsStatus } from '@/apollo/generated/types';
import { InfiniteSpinner } from '@/components/Infinite/Infinite';
import { Infinite } from '@/components/Infinite';

import {
  EventGroupKeys,
  type IGroupedEvents,
  type IGroupedEventsProps,
  type IInfiniteScrollProps,
} from './types';
import { AllEventListWrapper } from './styles';
import { EventListGroup } from './EventListGroup';
import { EventListEmptyScreen } from './EventListEmptyScreen';

export const AllEventList = ({
  events,
  chamberId,
  refetchEvents,
  networkStatus,
  totalCount,
  fetchMore,
  activeFilter,
  type,
  ...eventHandlers
}: IGroupedEventsProps & IInfiniteScrollProps) => {
  const groupedEvents: IGroupedEvents = useMemo(
    () =>
      events.reduce(
        (prev: IGroupedEvents, event) => {
          if (
            event.status &&
            [
              EventsStatus.Live,
              EventsStatus.GoLive,
              EventsStatus.PreEvent,
              EventsStatus.PostEvent,
            ].includes(event.status)
          ) {
            prev.liveEvents.push(event);
          }
          if (event.status === EventsStatus.Upcoming)
            prev.upcomingEvents.push(event);
          if (event.status === EventsStatus.Expired)
            prev.finishedEvents.push(event);
          return prev;
        },
        { liveEvents: [], upcomingEvents: [], finishedEvents: [] },
      ),
    [events],
  );

  const canFetchMore = totalCount > events.length;

  if (!chamberId) return null;

  if (events.length === 0) {
    return (
      <>
        {networkStatus === NetworkStatus.ready ? (
          <EventListEmptyScreen activeFilter={activeFilter} />
        ) : (
          <Spinner />
        )}
      </>
    );
  }
  return (
    <Infinite
      onFetchMore={async () => {
        if (canFetchMore) {
          fetchMore();
        }
      }}
      grow
      width="100%"
      scrollbarWidth={0}
    >
      <AllEventListWrapper canFetchMore={canFetchMore}>
        {Object.values(EventGroupKeys).map((groupKey) => (
          <EventListGroup
            key={groupKey}
            events={groupedEvents[groupKey]}
            chamberId={chamberId}
            refetchEvents={refetchEvents}
            type={type}
            {...eventHandlers}
          />
        ))}
        {[
          NetworkStatus.refetch,
          NetworkStatus.loading,
          NetworkStatus.fetchMore,
        ].includes(networkStatus) && <InfiniteSpinner status="loading" />}
      </AllEventListWrapper>
    </Infinite>
  );
};
