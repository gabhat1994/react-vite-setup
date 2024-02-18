import { useCallback, useRef, useState } from 'react';
import { t } from 'i18next';
import { EventAttendeesModal, EventItem } from '@/features/events/components';
import { EventDetailModal } from '@/features/events/components/EventDetailModal';
import {
  type WithRecurringEventProps,
  withRecurringEvent,
} from '@/features/events/hooks/withRecurringEvent';

import { type EventFragment } from '@/apollo/graphql';
import { type CalendarEventsListExpandedProps } from './types';
import { EventsListExpandedWrapper, GuestEventsHeaderTitle } from './styles';

export const CalendarEventsListExpanded = withRecurringEvent(
  ({
    events,
    eventHost,
    masterNoumId,
    onGoLive,
    onAccept,
    onDecline,
    onAttending,
    onNotAttending,
    onEditEvent,
    onJoinEvent,
    onAttend,
    refetchEvents,
    onCopyLink,
    onEventDeclined,
    onEventAccepted,
    isNoumLayoutSmallViewMode,
    eventsCount,
  }: CalendarEventsListExpandedProps & Partial<WithRecurringEventProps>) => {
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

    return (
      <>
        <EventsListExpandedWrapper
          data-testid="events-list-expanded"
          isEventBottomBorder={(eventsCount || 0) <= 3}
        >
          {!!eventHost && (
            <GuestEventsHeaderTitle
              font="body-m"
              colorToken="--text-card-neutral-highlighted"
            >
              {t('noumena.homeChambers.event.guest_upcoming_events', {
                host: eventHost,
              })}
            </GuestEventsHeaderTitle>
          )}
          {events.map((event) => (
            <EventItem
              key={event._id}
              event={event}
              chamberId={masterNoumId || ''}
              type="calendar"
              onGoLive={() => onGoLive(event)}
              onAccept={() => onEventAccepted?.(event, onAccept)!}
              onDecline={() => onEventDeclined?.(event, onDecline)!}
              onAttending={() => onEventAccepted?.(event, onAttending)!}
              onNotAttending={() => onEventDeclined?.(event, onNotAttending)!}
              onEditEvent={() => onEditEvent(event)}
              onJoinEvent={() => onJoinEvent(event)}
              onAttend={() => onEventAccepted?.(event, onAttend)!}
              onClickSeeMore={() => handleSeeMore(event)}
              onViewAttendees={onViewAttendees}
              onCopyLink={() => onCopyLink?.(event?.socialHall?._id ?? '')}
              isNoumLayoutSmallViewMode={isNoumLayoutSmallViewMode}
            />
          ))}
        </EventsListExpandedWrapper>
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
      </>
    );
  },
);
