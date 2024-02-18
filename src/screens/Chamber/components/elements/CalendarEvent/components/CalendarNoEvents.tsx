import { t } from 'i18next';

import { EventsFilter, PermissibleElementType } from '@/apollo/generated/types';
import { Icon } from '@/components/Icon';
import { type IActiveFilter } from '@/features/events/hooks';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { ButtonUtils } from '@/components/Button/utils';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { type NoEventsProps } from './types';
import {
  CalendarNoEventsWrapper,
  NoEventsIconWrapper,
  StyledText,
  AddNewEventButton,
} from './styles';

const noEventMessage: Record<IActiveFilter, string> = {
  all: t('noumena.homeChambers.calendar.noEvents'),
  [EventsFilter.Attending]: t(
    'noumena.homeChambers.calendar.noAttendingEvents',
  ),
  [EventsFilter.Hosting]: t('noumena.homeChambers.calendar.noHostingEvents'),
  [EventsFilter.Invitation]: t('noumena.homeChambers.calendar.noInvitedEvents'),
  [EventsFilter.Expired]: t('noumena.homeChambers.calendar.noPastEvents'),
  [EventsFilter.Upcoming]: t('noumena.homeChambers.calendar.noUpcoming'),
};

export const CalendarNoEvents = ({
  activeFilter,
  onAddEvent,
  loading,
}: NoEventsProps) => {
  const { isOwner } = useNoumContext();
  const { hasElementPermission } = useNoumAuthorization();
  const hasCreateEventPermission = hasElementPermission(
    PermissibleElementType.Calendar,
    'create-event',
    isOwner,
  );
  if (loading) return null;

  return (
    <CalendarNoEventsWrapper data-testid="calendar-no-events-wrapper">
      <NoEventsIconWrapper>
        <Icon
          name="calendar_xxxl"
          size={64}
          color="--icon-placeholder-neutral-default"
        />
      </NoEventsIconWrapper>
      <StyledText
        data-testid="no-events-text"
        font="body-xl"
        colorToken="--text-placeholder-neutral-default"
      >
        {noEventMessage[activeFilter]}
      </StyledText>
      {['all', EventsFilter.Hosting].includes(activeFilter) && (
        <AddNewEventButton
          disabled={!hasCreateEventPermission}
          {...ButtonUtils.getTooltipProps({
            message: t('noumena.event.no_permission.create_event'),
            visible: !hasCreateEventPermission,
          })}
          secondary
          onClick={onAddEvent}
        >
          {t('noumena.homeChambers.event.add_new_event')}
        </AddNewEventButton>
      )}
    </CalendarNoEventsWrapper>
  );
};
