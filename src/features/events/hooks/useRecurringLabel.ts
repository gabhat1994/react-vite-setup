import { t } from 'i18next';
import {
  Frequency,
  type WeekDays,
  type InputMaybe,
  type RecurringDetailsInput,
} from '@/apollo/generated/types';

import {
  getDayShortHand,
  getOrdinalNumber,
  getSortedDaysInMap,
} from '@/utils/date';

interface RecurringLabelProps {
  isShortHand: boolean;
  isCustomModalOpen?: boolean;
  recurringDetails?: InputMaybe<RecurringDetailsInput> | undefined;
}

export const useRecurringLabel = ({
  recurringDetails,
  isCustomModalOpen,
  isShortHand = true,
}: RecurringLabelProps) => {
  const getDefaultRecurringFrequencyLabel = () => {
    switch (recurringDetails?.frequency) {
      case Frequency.Monthly:
        return t('noumena.event.occurrence_monthly');
      case Frequency.Weekly:
        return t('noumena.event.occurrence_weekly');
      case Frequency.Daily:
        return t('noumena.event.occurrence_daily');
      default:
        return null;
    }
  };

  const getMonthlyFrequencyLabel = () =>
    t('noumena.event.custom_occurrence_monthly', {
      interval:
        recurringDetails?.interval === 1 ? '' : recurringDetails?.interval,
      days: recurringDetails?.monthDates
        ?.map((date) => `${date}${getOrdinalNumber(date!)}`)
        .join(', '),
      word: recurringDetails?.interval! > 1 ? 's' : '',
    });

  const getWeeklyFrequencyLabel = () => {
    const daysInSortedOrder = getSortedDaysInMap(
      recurringDetails?.weekDays as WeekDays[],
    );
    return t('noumena.event.custom_occurrence_weekly', {
      interval:
        recurringDetails?.interval === 1 ? '' : recurringDetails?.interval,
      days: isShortHand
        ? daysInSortedOrder?.map((day) => getDayShortHand(day)).join(', ')
        : daysInSortedOrder.join(', '),
      word: recurringDetails?.interval! > 1 ? 's' : '',
    });
  };

  if (isCustomModalOpen) {
    return t('noumena.event.occurrence_custom');
  }

  if (
    recurringDetails &&
    recurringDetails?.frequency &&
    !recurringDetails.custom
  ) {
    return getDefaultRecurringFrequencyLabel();
  }

  if (recurringDetails?.frequency === Frequency.Monthly) {
    return getMonthlyFrequencyLabel();
  }

  if (recurringDetails?.frequency === Frequency.Weekly) {
    return getWeeklyFrequencyLabel();
  }

  if (recurringDetails?.frequency === Frequency.Daily) {
    if (recurringDetails?.interval === 1) {
      return t('noumena.event.occurrence_daily');
    }

    return t('noumena.event.custom_occurrence_daily', {
      interval: `${recurringDetails?.interval}${getOrdinalNumber(
        recurringDetails?.interval ?? 1,
      )}`,
    });
  }

  return t('noumena.event.occurrence_single');
};
