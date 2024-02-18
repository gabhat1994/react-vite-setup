import { t } from 'i18next';
import { type DropdownValueType } from '@/components/Dropdown';
import { Frequency, WeekDays } from '@/apollo/generated/types';

export const Occurrences = {
  None: 'None',
  Custom_Repeat: 'Custom Repeat',
  Every_Day: 'Every Day',
  Every_Week: 'Every Week',
  Every_Month: 'Every Month',
  Every_Year: 'Every Year',
  Custom: 'Custom...',
  Daily: 'Daily',
  Weekly: 'Weekly',
  Monthly: 'Monthly',
};

const customOccurrence: DropdownValueType<Frequency | string> = {
  label: t(`noumena.event.occurrence_custom`),
  key: t(`noumena.event.occurrence_custom`),
  type: 'value',
  value: t(`noumena.event.occurrence_custom`),
};

const dailyOccurrence: DropdownValueType<Frequency | string> = {
  label: t(`noumena.event.occurrence_daily`),
  key: t(`noumena.event.occurrence_daily`),
  type: 'value',
  value: Frequency.Daily,
};

const weeklyOccurrence: DropdownValueType<Frequency | string> = {
  label: t(`noumena.event.occurrence_weekly`),
  key: t(`noumena.event.occurrence_weekly`),
  type: 'value',
  value: Frequency.Weekly,
};
const monthlyOccurrence: DropdownValueType<Frequency | string> = {
  label: t(`noumena.event.occurrence_monthly`),
  key: t(`noumena.event.occurrence_monthly`),
  type: 'value',
  value: Frequency.Monthly,
};

export const singleOccurance: DropdownValueType<string> = {
  label: t(`noumena.event.occurrence_single`),
  key: t(`noumena.event.occurrence_single`),
  type: 'value',
  value: '',
};

export const availableOccurrences: DropdownValueType<Frequency | string>[] = [
  dailyOccurrence,
  weeklyOccurrence,
  monthlyOccurrence,
  customOccurrence,
];

export const WeekDay: Array<{
  initial: string;
  day: WeekDays;
  position: number;
}> = [
  { initial: 'M', day: WeekDays.Monday, position: 1 },
  { initial: 'T', day: WeekDays.Tuesday, position: 2 },
  { initial: 'W', day: WeekDays.Wednesday, position: 3 },
  { initial: 'T', day: WeekDays.Thursday, position: 4 },
  { initial: 'F', day: WeekDays.Friday, position: 5 },
  { initial: 'S', day: WeekDays.Saturday, position: 6 },
  { initial: 'S', day: WeekDays.Sunday, position: 7 },
];

export const daysOfWeek: Array<WeekDays> = [
  WeekDays.Monday,
  WeekDays.Tuesday,
  WeekDays.Wednesday,
  WeekDays.Thursday,
  WeekDays.Friday,
  WeekDays.Saturday,
  WeekDays.Sunday,
];
