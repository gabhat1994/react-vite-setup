import { useMemo } from 'react';

import { CalendarEventsListExpanded } from '@/screens/Chamber/components/elements/CalendarEvent/components/CalendarEventsListExpanded';

import { type CalendarElementGuestViewProps } from './types';

export const CalendarElementGuestView = ({
  masterNoumId,
  events,
  onEditEvent,
  onRefetchEvents,
  onGoLive,
  onJoin,
  onAccept,
  onDecline,
  onAttend,
  onAttending,
  onNotAttending,
  isNoumLayoutSmallViewMode,
}: CalendarElementGuestViewProps) => {
  const eventHost: string = useMemo(
    () => events[0]?.chamberId?.uid?.firstName || '',
    [events],
  );

  return (
    <CalendarEventsListExpanded
      masterNoumId={masterNoumId}
      events={events}
      eventHost={eventHost}
      onGoLive={onGoLive}
      onAccept={onAccept}
      onDecline={onDecline}
      onAttending={onAttending}
      onNotAttending={onNotAttending}
      onEditEvent={onEditEvent}
      onJoinEvent={onJoin}
      onAttend={onAttend}
      refetchEvents={onRefetchEvents}
      isNoumLayoutSmallViewMode={isNoumLayoutSmallViewMode}
    />
  );
};
