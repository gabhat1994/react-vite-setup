import { useMemo } from 'react';

import { CalendarNoEvents } from '@/screens/Chamber/components/elements/CalendarEvent/components/CalendarNoEvents';
import { CalendarEventsListExpanded } from '@/screens/Chamber/components/elements/CalendarEvent/components/CalendarEventsListExpanded';

import { Spinner } from '@/components/Spinner';
import { EventFilterDropDown } from '@/features/events/components';
import { CalendarElementViewModeSubHeader } from './CalendarElementViewModeSubHeader';

import { type CalendarElementOwnerViewProps } from './types';
import { LoadingContainer } from '../components/styles';

export const CalendarElementOwnerView = ({
  masterNoumId,
  loading,
  events,
  eventsCount,
  activeFilter,
  activeViewMode,
  onChangeFilter,
  onChangeViewMode,
  onAddEvent,
  onEditEvent,
  onRefetchEvents,
  onGoLive,
  onJoin,
  onAccept,
  onDecline,
  onAttend,
  onAttending,
  onNotAttending,
  onCopyLink,
  isNoumLayoutSmallViewMode,
}: CalendarElementOwnerViewProps) => {
  const showFilters = useMemo(
    () => (eventsCount ? true : activeFilter !== 'all'),
    [activeFilter, eventsCount],
  );

  const showNoEvents = !eventsCount;

  return (
    <>
      {!isNoumLayoutSmallViewMode && showFilters && (
        <CalendarElementViewModeSubHeader
          activeFilter={activeFilter}
          activeViewMode={activeViewMode}
          onFilterChange={onChangeFilter}
          onViewModeChange={onChangeViewMode}
        />
      )}
      {isNoumLayoutSmallViewMode && (
        <EventFilterDropDown
          activeFilter={activeFilter}
          onChange={onChangeFilter}
        />
      )}
      {loading ? (
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      ) : (
        <>
          {eventsCount > 0 && (
            <CalendarEventsListExpanded
              eventsCount={eventsCount}
              masterNoumId={masterNoumId}
              events={events}
              eventHost=""
              onGoLive={onGoLive}
              onAccept={onAccept}
              onDecline={onDecline}
              onAttending={onAttending}
              onNotAttending={onNotAttending}
              onEditEvent={onEditEvent}
              onJoinEvent={onJoin}
              onAttend={onAttend}
              refetchEvents={onRefetchEvents}
              onCopyLink={onCopyLink}
              isNoumLayoutSmallViewMode={isNoumLayoutSmallViewMode}
            />
          )}
          {showNoEvents && (
            <CalendarNoEvents
              activeFilter={activeFilter}
              loading={loading}
              onAddEvent={onAddEvent}
            />
          )}
        </>
      )}
    </>
  );
};
