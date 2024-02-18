import { useCallback, useRef, useState } from 'react';

import { NetworkStatus } from '@apollo/client';
import { Spinner } from '@/components/Spinner';
import { type EventFragment } from '@/apollo/graphql';
import { getBottomStatusFromQuery, Infinite } from '@/components/Infinite';
import { EventAttendeesModal, EventItem } from '@/features/events/components';

import {
  withRecurringEvent,
  type WithRecurringEventProps,
} from '../hooks/withRecurringEvent';
import { EventListEmptyScreen } from './EventListEmptyScreen';
import { EventDetailModal } from '../components/EventDetailModal';
import { AllEventListWrapper, EventItemGroupWrapper } from './styles';
import { type IGroupedEventsProps, type IInfiniteScrollProps } from './types';

export const FilteredEventList = withRecurringEvent(
  ({
    events,
    chamberId,
    totalCount,
    networkStatus,
    onGoLive,
    onJoinEvent,
    onAccept,
    onDecline,
    onAttend,
    onAttending,
    onNotAttending,
    onEditEvent,
    onCopyLink,
    refetchEvents,
    fetchMore,
    onEventAccepted,
    onEventDeclined,
    activeFilter,
    type,
  }: IGroupedEventsProps &
    IInfiniteScrollProps &
    Partial<WithRecurringEventProps>) => {
    // const spacer = activeFilter === 'all' ? 0 : 25;
    const attendeesRef =
      useRef<React.ElementRef<typeof EventAttendeesModal>>(null);
    const [openDetailModal, setOpenDetailModal] = useState<
      EventFragment | false
    >(false);

    const onViewAttendees = useCallback((eventId: string, isHost: boolean) => {
      attendeesRef.current?.open(eventId, isHost);
    }, []);

    const handleSeeMore = useCallback(
      (event: EventFragment) => {
        setOpenDetailModal(event);
      },
      [setOpenDetailModal],
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
        status={
          canFetchMore
            ? getBottomStatusFromQuery({
                networkStatus,
                totalCount,
                currentCount: events.length,
              })
            : 'end'
        }
        grow
        width="100%"
        disableFetchMoreWhileLoading={true}
        scrollbarWidth={0}
      >
        {/* <Spacer height={spacer} /> */}
        <AllEventListWrapper canFetchMore={canFetchMore}>
          <EventItemGroupWrapper>
            {events.map((event, index) => (
              <EventItem
                key={event._id}
                event={event}
                tooltipPosition={index === 0 ? 'bottom' : 'top'}
                chamberId={chamberId}
                type={type}
                onGoLive={() => onGoLive(event)}
                onAccept={() => onEventAccepted?.(event, onAccept)!}
                onDecline={() => onEventDeclined?.(event, onDecline)!}
                onAttending={() => onEventAccepted?.(event, onAttending)!}
                onNotAttending={() => onEventDeclined?.(event, onNotAttending)!}
                onJoinEvent={() => onJoinEvent(event)}
                onAttend={() => onEventAccepted?.(event, onAttend)!}
                onEditEvent={() => onEditEvent(event)}
                onClickSeeMore={() => handleSeeMore(event)}
                onViewAttendees={onViewAttendees}
                onCopyLink={() => onCopyLink?.(event?.socialHall?._id ?? '')}
              />
            ))}
          </EventItemGroupWrapper>
        </AllEventListWrapper>
        <EventAttendeesModal
          ref={attendeesRef}
          onRefetchEvents={refetchEvents}
        />

        {!!openDetailModal && (
          <EventDetailModal
            eventId={openDetailModal._id ?? ''}
            isOpen={!!openDetailModal}
            onClose={() => setOpenDetailModal(false)}
            onEditEvent={onEditEvent}
          />
        )}
      </Infinite>
    );
  },
);
