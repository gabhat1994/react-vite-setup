import { type DropdownValueType } from '@/components/Dropdown';
import { t } from 'i18next';

export const options: DropdownValueType<string>[] = [
  {
    key: 'test',
    label: t('noumena.plan_summary.plan_history'),
    type: 'value',
    value: 'plan-history',
  },
  {
    key: 'test',
    label: t('noumena.plan_summary.all_transactions'),
    type: 'value',
    value: 'all_transactions',
  },
];
