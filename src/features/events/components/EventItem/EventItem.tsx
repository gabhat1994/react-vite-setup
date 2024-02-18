import { t } from 'i18next';
import { generatePath, useNavigate } from 'react-router-dom';

import { Stack } from '@/layout';
import { TSpan } from '@/components';
import { Tag } from '@/components/Tag';
import routes from '@/constants/routes';
import { Icon } from '@/components/Icon';
import { UserRole } from '@/apollo/generated/types';
import { useEventMeta } from '@/features/events/hooks';

import { EventTitle, EventItemBody, EventItemWrapper } from './styles';
import { type EventItemProps } from './types';
import { EventItemButtons } from './EventItemButtons';
import { EventDescription } from '../EventDescription';
import { EventDurationBadge } from '../EventDurationBadge';
import { EventRecurringTooltip } from '../EventRecurringTooltip';

export const EventItem = ({
  type,
  event,
  chamberId,
  onClickSeeMore,
  showEndTime,
  tooltipPosition = 'top',
  onViewAttendees,
  notClickable = false,
  hideBottomBorder = false,
  hideActionButtons = false,
  hideDescription = false,
  ...restProps
}: EventItemProps) => {
  const navigate = useNavigate();

  const { userRole, timeSlotOutput } = useEventMeta({
    chamberId,
    event,
  });

  const onSeeMore = () => {
    navigate(
      generatePath(routes.SOCIAL_HALL_DETAILS, {
        id: event.socialHall?._id!,
        eventId: event._id,
      }),
    );
  };

  const isHost = [UserRole.Host, UserRole.Cohost].includes(userRole);
  const isCalendar = type === 'calendar';

  return (
    <EventItemWrapper
      hideBottomBorder={hideBottomBorder}
      data-testid="event-item-testid"
      type={type}
      isRecurring={!!event.recurring}
      isCalendarType={isCalendar}
    >
      <Stack gap={8} wrap="wrap" align="start">
        {isHost && (
          <Tag size="small" secondary>
            {userRole === UserRole.Host
              ? t('noumena.social_hall.host')
              : t('noumena.social_hall.co_host')}
          </Tag>
        )}
        {event.eventDate && event.status && (
          <EventDurationBadge
            showEndTime={!!showEndTime}
            notClickable={notClickable}
            eventDate={event.eventDate}
            durationInSeconds={event.duration || 0}
            status={event.status}
          >
            {event.recurring && event?.recurringDetails && (
              <EventRecurringTooltip
                position={tooltipPosition}
                recurringDetails={event?.recurringDetails}
                variant={timeSlotOutput.variant}
              />
            )}
          </EventDurationBadge>
        )}
        <Tag
          onClick={() => onViewAttendees(event._id, isHost)}
          size="small"
          tertiary
          icon={<Icon name="groups_m" size={16} />}
        >
          <TSpan colorToken="--text-badge-neutral-default">
            {event?.totalAttendees || 0}
          </TSpan>
        </Tag>
      </Stack>
      <EventItemBody type={type}>
        <EventTitle
          onClick={onSeeMore}
          type={type}
          colorToken="--text-card-header-neutral-highlighted"
        >
          {event.title}
        </EventTitle>
        {!hideDescription && (
          <EventDescription
            description={event.description}
            onClickSeeMore={onSeeMore}
          />
        )}
      </EventItemBody>

      {!hideActionButtons && (
        <EventItemButtons
          type={type}
          role={userRole}
          event={event}
          {...restProps}
        />
      )}
    </EventItemWrapper>
  );
};
