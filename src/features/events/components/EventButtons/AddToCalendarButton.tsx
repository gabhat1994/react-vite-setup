import { atcb_action } from 'add-to-calendar-button';
import { addMinutes, format } from 'date-fns';
import { t } from 'i18next';
import { useCallback, useMemo, useRef } from 'react';

import { type EventFragment } from '@/apollo/graphql';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { useBreakpoints } from '@/hooks';
import { getEventDescription, getRecurringRule } from '@/utils/addToCalendar';
import { Button } from '@/components';
import { AddToCalendarWrapper, NoumEditorAddToCalendar } from './styles';
import { type EventItemProps } from '../EventItem/types';

type AddToCalendarButtonProps = {
  event: EventFragment;
  isEventDetailPage?: boolean;
  type: EventItemProps['type'];
};

export const AddToCalendarButton = ({
  event,
  isEventDetailPage,
  type,
}: AddToCalendarButtonProps) => {
  const { isMobile } = useBreakpoints();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const eventStartDate = useMemo(
    () => new Date(event.eventDate),
    [event.eventDate],
  );

  const eventEndDate = useMemo(
    () => addMinutes(new Date(event.eventDate), event.duration! / 60),
    [event.eventDate, event.duration],
  );

  const organizer = useMemo(
    () =>
      `${event.userId?.firstName} ${event.userId?.lastName}|${event.userId?.email}`,
    [event.userId],
  );

  const recurringRule = useMemo(() => {
    if (event.recurring && event.recurringDetails) {
      return getRecurringRule(event.recurringDetails);
    }
    return '';
  }, [event.recurringDetails, event.recurring]);

  const fileName = useMemo(
    () =>
      event.title
        ?.replace(/\s/g, '_')
        .replace(/[^a-z_]/gi, '')
        .toLowerCase(),
    [event.title],
  );

  const onShowAddToCalendarDD = useCallback(() => {
    if (triggerRef.current && event._id) {
      atcb_action(
        {
          identifier: 'noumena-atc',
          name: event.title,
          options: ['Google', 'Apple', 'Outlook.com'],
          availability: 'busy',
          description: getEventDescription(event),
          timeZone: 'currentBrowser',
          startDate: format(eventStartDate, 'yyyy-MM-dd'),
          startTime: format(eventStartDate, 'HH:mm'),
          endTime: format(eventEndDate, 'HH:mm'),
          hideBackground: true,
          trigger: 'click',
          uid: event._id,
          recurrence: recurringRule,
          hideCheckmark: true,
          status: 'CONFIRMED',
          hideIconButton: true,
          listStyle: 'overlay',
          iCalFileName: fileName,
          organizer: event.userId?.email ? organizer : '',
          customCss: `${window.location.origin}/css/addToCalendar.css`,
          buttonStyle: 'custom',
          hideTextLabelButton: true,
        },
        triggerRef.current,
      );
    }
  }, [
    triggerRef,
    event,
    eventStartDate,
    eventEndDate,
    organizer,
    recurringRule,
    fileName,
  ]);

  return (
    <AddToCalendarWrapper>
      {type === 'calendar' ? (
        <NoumEditorAddToCalendar
          ref={triggerRef}
          size="full_small"
          onClick={onShowAddToCalendarDD}
          isEventDetailPage={isEventDetailPage}
          leftIcon={
            <Icon
              name="calendar_external"
              size={24}
              color="--icon-button-neutral-default"
            />
          }
          rightIcon={
            <>
              {!isEventDetailPage && (
                <Icon
                  name="chevron_down_m"
                  size={15}
                  color="--icon-button-neutral-default"
                />
              )}
            </>
          }
        >
          {!isMobile && (
            <TSpan font="body-m-bold">
              {t('noumena.event.add_to_calendar')}
            </TSpan>
          )}
        </NoumEditorAddToCalendar>
      ) : (
        <Button
          ref={triggerRef}
          tooltipText={t('noumena.event.add_to_calendar')}
          tooltipPosition="top-right"
          tertiary
          size="small"
          onClick={onShowAddToCalendarDD}
        >
          <Icon
            name="calendar_external"
            size={20}
            color="--icon-button-neutral-default"
          />
        </Button>
      )}
    </AddToCalendarWrapper>
  );
};
