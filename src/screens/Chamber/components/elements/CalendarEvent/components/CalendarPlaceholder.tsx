import { t } from 'i18next';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { EventItem, EventFilterDropDown } from '@/features/events/components';
import { placeHolderdata } from '../CalendarElement/data';
import { type CalendarEventsPlaceHolderProps } from './types';
import { CalendarElementViewModeSubHeader } from '../CalendarElement/CalendarElementViewModeSubHeader';

export const CalendarPlaceHolder = ({
  isNoumLayoutSmallViewMode,
}: CalendarEventsPlaceHolderProps) => (
  <Stack fullWidth vertical padding="16px" gap={25}>
    <Stack justify="space-between" fullWidth align="center">
      <TSpan font="heading-xs-bold">
        {t('noumena.homeChambers.event.event_other')}
      </TSpan>
      <Button size="small" secondary icon={<Icon name="plus_m" size={24} />} />
    </Stack>
    {isNoumLayoutSmallViewMode ? (
      <EventFilterDropDown activeFilter="all" onChange={() => {}} />
    ) : (
      <CalendarElementViewModeSubHeader
        activeFilter="all"
        activeViewMode=""
        onFilterChange={() => {}}
        onViewModeChange={() => {}}
      />
    )}
    {placeHolderdata.map((event, index) => (
      <EventItem
        key={event._id}
        event={event}
        chamberId=""
        type="calendar"
        hideBottomBorder={placeHolderdata.length - 1 === index}
        onGoLive={async () => undefined}
        onAccept={async () => undefined}
        onDecline={async () => undefined}
        onAttending={async () => undefined}
        onNotAttending={async () => undefined}
        onEditEvent={async () => undefined}
        onJoinEvent={async () => undefined}
        onAttend={async () => undefined}
        onClickSeeMore={async () => undefined}
        onViewAttendees={async () => undefined}
        isNoumLayoutSmallViewMode={isNoumLayoutSmallViewMode}
      />
    ))}
  </Stack>
);
