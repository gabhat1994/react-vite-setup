import { t } from 'i18next';
import { set } from 'date-fns';
import { Frequency, type WeekDays } from '@/apollo/generated/types';

export const getIntervalTitle = (value: string): string => {
  let frequency = t('noumena.event.occurrence_daily');

  if (Frequency.Monthly === value) {
    frequency = t('noumena.event.occurrence_monthly');
  }

  if (Frequency.Weekly === value) {
    frequency = t('noumena.event.occurrence_weekly');
  }

  frequency = `${frequency}(s)`;

  return frequency;
};

export const getUpdatedMonthDates = (
  date: Date | null,
  monthDates: Date[],
): Date[] => {
  let days = [...monthDates];
  if (date) {
    const duplicateDayIndex = days.findIndex(
      (day) => new Date(day).getDate() === new Date(date).getDate(),
    );
    if (duplicateDayIndex >= 0) {
      days.splice(duplicateDayIndex, 1);
    } else {
      days = [...days, date];
    }
  }
  return days;
};

export const getUpdatedWeekDays = (
  day: WeekDays,
  weekDays: WeekDays[],
): WeekDays[] => {
  let days = [...(weekDays || [])];
  if (days.includes(day)) {
    days.splice(days.indexOf(day), 1);
  } else {
    days = [...days, day];
  }
  return days;
};

export const getDayToDate = (days: number[]) =>
  days.map((day) => set(new Date(), { date: day }));
