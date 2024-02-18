import { t } from 'i18next';
import { Frequency, type RecurringDetails } from '@/apollo/generated/types';
import { type EventFragment } from '@/apollo/graphql';

export const getRecurringRule = ({
  interval,
  frequency,
  custom,
  weekDays,
}: RecurringDetails): string => {
  let byDay;
  let rule = `RRULE:FREQ=${frequency};INTERVAL=${interval};`;

  if (custom && frequency === Frequency.Weekly && weekDays?.length) {
    byDay = weekDays.map((day) => day?.toString().slice(0, 2).toUpperCase());
    rule += `BYDAY=${byDay.join()}`;
  }
  return rule;
};

export const getEventDescription = (event: EventFragment): string => {
  const url = `${window.location.origin}/social-hall/${event.socialHall?._id}`;
  let message = t('noumena.addToCalendar.heading');
  message += `[p]${url}[/p][p]${event.description}[/p]`;
  return message;
};
