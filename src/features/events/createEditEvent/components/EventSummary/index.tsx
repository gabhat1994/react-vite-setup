import { useMemo } from 'react';
import { t } from 'i18next';
import { format, addSeconds, isValid } from 'date-fns';

import { TSpan } from '@/components';
import { Occurrences } from '@/utils/recurringEventOccurance';
import { useCreateEditEventContext } from '@/features/events/contexts';

import { EventSummaryContainer } from './styles';

export const EventSummary = () => {
  const { eventDate, duration, frequency } = useCreateEditEventContext();
  const summary: string = useMemo(() => {
    if (!eventDate || duration === undefined || !isValid(eventDate)) return '';

    const date = format(eventDate, 'MMM dd, yyyy');
    const start = format(eventDate, 'h:mm aa');
    const end = format(addSeconds(eventDate, duration), 'h:mm aa');

    const props = { date, start, end };

    switch (frequency) {
      case Occurrences.Every_Day:
      case Occurrences.Every_Month:
      case Occurrences.Every_Week:
      case Occurrences.Every_Year:
        return t('noumena.event.modal.event_recurring_day_type', {
          occurrence: frequency.toLowerCase(),
          ...props,
        });
      default:
        return t('noumena.event.modal.event_summary', { ...props });
    }
  }, [duration, eventDate, frequency]);

  if (!summary) return null;

  return (
    <EventSummaryContainer>
      <TSpan font="footnote" colorToken="--text-tablecell-body-neutral-default">
        {summary}
      </TSpan>
    </EventSummaryContainer>
  );
};
