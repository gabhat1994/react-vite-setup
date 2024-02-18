import { t } from 'i18next';
import type { DropdownValueType } from '@/components/Dropdown';
import { Frequency } from '@/apollo/generated/types';

export const dailyCustomOccurrence: DropdownValueType<Frequency | string> = {
  label: t(`noumena.event.occurrence_custom_daily`),
  key: t(`noumena.event.occurrence_custom_daily`),
  type: 'value',
  value: Frequency.Daily,
};

const weeklyCustomOccurrence: DropdownValueType<Frequency | string> = {
  label: t(`noumena.event.occurrence_custom_weekly`),
  key: t(`noumena.event.occurrence_custom_weekly`),
  type: 'value',
  value: Frequency.Weekly,
};

const monthlyCustomOccurrence: DropdownValueType<Frequency | string> = {
  label: t(`noumena.event.occurrence_custom_monthly`),
  key: t(`noumena.event.occurrence_custom_monthly`),
  type: 'value',
  value: Frequency.Monthly,
};

export const customOccurrences: DropdownValueType<Frequency | string>[] = [
  dailyCustomOccurrence,
  weeklyCustomOccurrence,
  monthlyCustomOccurrence,
];
