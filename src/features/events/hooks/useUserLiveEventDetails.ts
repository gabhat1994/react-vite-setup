import { useState, useCallback } from 'react';
import { type Event, SortOrder } from '@/apollo/generated/types';
import {
  type EventFragment,
  useEventsParticipatedLazyQuery,
  useGetEventsQuery,
} from '@/apollo/graphql';
import { EventUtils } from '@/utils/event';

export const useUserLiveEventDetails = (
  chamberId: string,
): {
  isAnotherEventLive: boolean;
  eventScheduledIn60Mins: Event;
} => {
  const [isAnotherEventLive, setIsAnotherEventLive] = useState(false);
  const [eventScheduledIn60Mins, setEventScheduledIn60Mins] =
    useState<EventFragment>();

  const setLiveEventDetails = useCallback((allEvents: Event[]): void => {
    setIsAnotherEventLive(
      () => !!EventUtils.getParticipatedLiveEvents(allEvents),
    );
    setEventScheduledIn60Mins(() =>
      EventUtils.getEventInNext60Minutes(allEvents),
    );
  }, []);

  const [eventsParticipated] = useEventsParticipatedLazyQuery({
    refetchWritePolicy: 'overwrite',
    fetchPolicy: 'cache-and-network',
    variables: {
      chamberId,
    },
    onCompleted: ({ attending, hosted }) => {
      setLiveEventDetails([
        ...(attending?.data || []),
        ...(hosted?.data || []),
      ] as Event[]);
    },
  });

  useGetEventsQuery({
    fetchPolicy: 'cache-only',
    skip: !chamberId,
    variables: {
      chamberId,
      limit: 10,
      offset: 0,
      sortOrder: SortOrder.Asc,
    },
    onCompleted({ getEvents }) {
      if (getEvents?.data?.length) {
        setLiveEventDetails(getEvents?.data as Event[]);
      } else {
        eventsParticipated();
      }
    },
  });

  return {
    isAnotherEventLive,
    eventScheduledIn60Mins: eventScheduledIn60Mins as Event,
  };
};

export default useUserLiveEventDetails;
