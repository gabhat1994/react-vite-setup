import { t } from 'i18next';
import { useMemo } from 'react';
import { Trans } from 'react-i18next';
import { add, format, isToday } from 'date-fns';

import {
  InvitationStatus,
  SpaceTypeEnum,
  UserRole,
} from '@/apollo/generated/types';
import { Stack } from '@/layout';
import { useBreakpoints } from '@/hooks';
import { useAuth } from '@/features/auth/contexts';
import { getLocalTime, getLocalTimeFormatted } from '@/utils/date';
import { Icon, TSpan } from '@/components';
import { AddToCalendarButton } from '@/features/events/components/EventButtons';

import { generateHostedByLabel } from './utils';
import { type EventDetialsProps } from './types';
import { EventRecurringDetail } from './EventRecurringDetail';

const Details = ({
  attendees,
  eventData,
  isEventDetailPage,
}: EventDetialsProps): JSX.Element => {
  const { user } = useAuth();
  const { isMobile } = useBreakpoints();
  const localDateTime = useMemo(
    () =>
      getLocalTime({
        dateTime: new Date(eventData?.eventDate),
      }),
    [eventData?.eventDate],
  );

  const isHost = eventData?.currentUser?.userRole === UserRole.Host;
  const isCoHost =
    eventData?.currentUser?.userRole === UserRole.Cohost &&
    eventData?.currentUser.invitation?.status === InvitationStatus.Accepted;

  const content = useMemo(() => {
    let contentDate;
    const myDate = new Date(eventData?.eventDate);
    const startDateTime = format(myDate, 'MMM dd, yyyy, hh:mm a');
    const startTime = getLocalTimeFormatted({
      dateTime: eventData?.eventDate,
      returnFormat: 'hh:mm a',
    });
    const endTime = getLocalTimeFormatted({
      dateTime: add(new Date(eventData?.eventDate), {
        seconds: eventData?.duration || 0,
      }),
      returnFormat: 'hh:mm a',
    });
    const today = localDateTime ? isToday(localDateTime) : false;
    if (today)
      contentDate = `${t('noumena.date.today')}, ${startTime} - ${endTime}`;
    else contentDate = `${startDateTime} - ${endTime}`;

    return contentDate;
  }, [eventData?.duration, eventData?.eventDate, localDateTime]);

  const calendarIcon = eventData.recurring ? 'repeat_xs' : 'calendar_m';

  const padding = isMobile ? '16px 6px' : '16px';

  const { i18nString, options } = useMemo(() => {
    const isProjectNoum = eventData?.chamberId?.type === SpaceTypeEnum.Project;
    const noumName = eventData?.chamberId?.name ?? '';

    return generateHostedByLabel({
      attendees,
      isHost,
      isCoHost,
      noumName,
      isProjectNoum,
      currentUserName: user?.firstName ?? '',
    });
  }, [attendees, isHost, isCoHost, eventData?.chamberId, user?.firstName]);

  return (
    <>
      <Stack
        padding={padding}
        align="center"
        borderBottom
        justify="space-between"
      >
        {eventData.eventDate && (
          <Stack gap={10} align="center">
            <Icon name={calendarIcon} size={24} />
            <Stack vertical>
              {eventData.recurring && (
                <EventRecurringDetail {...eventData.recurringDetails} />
              )}
              <TSpan font="body-l">{content}</TSpan>
            </Stack>
          </Stack>
        )}
        <AddToCalendarButton
          event={eventData}
          isEventDetailPage={isEventDetailPage}
          type="calendar"
        />
      </Stack>
      <Stack padding="16px" align="center" borderBottom>
        <TSpan font="body-l" colorToken="--text-card-neutral-highlighted">
          <Trans
            i18nKey={i18nString}
            values={options}
            components={{
              gray: (
                <TSpan
                  data-testid="gray-text"
                  font="body-l"
                  colorToken="--text-card-neutral-default"
                />
              ),
            }}
          />
        </TSpan>
      </Stack>
      <Stack padding="16px" align="center" borderBottom>
        <TSpan font="body-l" colorToken="--text-modal-neutral-default">
          {eventData?.description}
        </TSpan>
      </Stack>
    </>
  );
};

export default Details;
