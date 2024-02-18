import { t } from 'i18next';
import { type DropdownValueType } from '@/components/Dropdown';
import { NoumKpiGranularity } from '@/apollo/generated/types';

export const PeriodicityOptions: DropdownValueType<string>[] = [
  {
    label: t(`noumena.periodicity.daily`),
    key: NoumKpiGranularity?.Daily,
    type: 'value',
    value: NoumKpiGranularity?.Daily,
  },
  {
    label: t(`noumena.periodicity.monthly`),
    key: NoumKpiGranularity?.Monthly,
    type: 'value',
    value: NoumKpiGranularity?.Monthly,
  },
  {
    label: t(`noumena.periodicity.yearly`),
    key: NoumKpiGranularity?.Yearly,
    type: 'value',
    value: NoumKpiGranularity?.Yearly,
  },
];

export const DateRangeOptions: DropdownValueType<string>[] = [
  {
    label: t(`noumena.date_range.lifetime`),
    key: 'lifetime',
    type: 'value',
    value: 'lifetime',
  },
  {
    label: t(`noumena.date_range.today`),
    key: 'today',
    type: 'value',
    value: 'today',
  },
  {
    label: t(`noumena.date_range.yesterday`),
    key: 'yesterday',
    type: 'value',
    value: 'yesterday',
    disabled: true,
  },
  {
    label: t(`noumena.date_range.this_week`),
    key: 'this_week',
    type: 'value',
    value: 'this_week',
  },
  {
    label: t(`noumena.date_range.last_week`),
    key: 'last_week',
    type: 'value',
    value: 'last_week',
    disabled: true,
  },
  {
    label: t(`noumena.date_range.custom`),
    key: 'custom',
    type: 'value',
    value: 'custom',
    disabled: true,
  },
];
