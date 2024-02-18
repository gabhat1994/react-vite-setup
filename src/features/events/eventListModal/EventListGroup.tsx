import { useRef, useCallback, useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import type { EventFragment } from '@/apollo/graphql';
import { EventAttendeesModal, EventItem } from '@/features/events/components';

import {
  withRecurringEvent,
  type WithRecurringEventProps,
} from '../hooks/withRecurringEvent';
import { type IGroupedEventsProps } from './types';
import { EventDetailModal } from '../components/EventDetailModal';
import { EventItemGroupWrapper } from './styles';

export const EventListGroup = withRecurringEvent(
  ({
    events,
    chamberId,
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
    onEventAccepted,
    onEventDeclined,
    type,
  }: IGroupedEventsProps & Partial<WithRecurringEventProps>) => {
    const attendeesRef =
      useRef<React.ElementRef<typeof EventAttendeesModal>>(null);
    const [openDetailModal, setOpenDetailModal] = useState<
      EventFragment | false
    >(false);
    const navigate = useNavigate();
    const location = useLocation();
    const onViewAttendees = useCallback((eventId: string, isHost: boolean) => {
      attendeesRef.current?.open(eventId, isHost);
    }, []);

    const [searchParams] = useSearchParams();
    const eventIdFromParams = searchParams.get('event');

    useEffect(() => {
      const eventToOpen =
        events.find((event) => event._id === eventIdFromParams) || false;
      setOpenDetailModal(eventToOpen);
    }, [events, eventIdFromParams]);

    const handleSeeMore = useCallback(
      (event: EventFragment) => {
        setOpenDetailModal(event);
      },
      [setOpenDetailModal],
    );

    if (!events.length) return null;
    return (
      <>
        <EventItemGroupWrapper>
          {events.map((event) => (
            <EventItem
              key={event._id}
              event={event}
              tooltipPosition="top"
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
        <EventAttendeesModal
          ref={attendeesRef}
          onRefetchEvents={refetchEvents}
        />
        {!!openDetailModal && (
          <EventDetailModal
            eventId={openDetailModal?._id ?? ''}
            isOpen={!!openDetailModal}
            onClose={() => {
              setOpenDetailModal(false);
              navigate(location.pathname);
            }}
            onEditEvent={onEditEvent}
          />
        )}
      </>
    );
  },
);
