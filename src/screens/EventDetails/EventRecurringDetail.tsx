import { useMemo } from 'react';
import { t } from 'i18next';
import {
  Frequency,
  type RecurringDetails,
  type WeekDays,
} from '@/apollo/generated/types';
import {
  getOrdinalNumber,
  getDayShortHand,
  getSortedDaysInMap,
} from '@/utils/date';
import { TSpan } from '@/components/Typography';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';

export const EventRecurringDetail = ({
  custom,
  frequency,
  interval = 1,
  weekDays,
  monthDates,
}: RecurringDetails) => {
  const tooltipTitle = useMemo(() => {
    if (!custom) {
      switch (frequency) {
        case Frequency.Monthly:
          return t('noumena.event.occurrence_monthly');
        case Frequency.Weekly:
          return t('noumena.event.occurrence_weekly');
        default:
          return t('noumena.event.occurrence_daily');
      }
    }
    switch (frequency) {
      case Frequency.Monthly:
        return t('noumena.event.custom_occurrence_monthly', {
          interval: interval === 1 ? '' : interval,
          days: monthDates?.map((date) => `${date}${getOrdinalNumber(date!)}`),
          word: interval! > 1 ? 's' : '',
        });
      case Frequency.Weekly:
        return t('noumena.event.custom_occurrence_weekly', {
          interval: interval === 1 ? '' : interval,
          days: getSortedDaysInMap(weekDays as WeekDays[])?.map(
            (day) =>
              ` ${getDayShortHand(capitalizeFirstLetter(day.toLowerCase()!))}`,
          ),
          word: interval! > 1 ? 's' : '',
        });
      default:
        return interval === 1
          ? t('noumena.event.occurrence_daily')
          : t('noumena.event.custom_occurrence_daily', {
              interval: `${interval}${getOrdinalNumber(interval!)}`,
            });
    }
  }, [custom, frequency, interval, weekDays, monthDates]);

  return <TSpan font="body-l-bold">{tooltipTitle}</TSpan>;
};
