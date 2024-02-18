import { t } from 'i18next';
import { type DropdownValueType } from '@/components/Dropdown/types';

export const capacityOptions: DropdownValueType<string>[] = [
  {
    value: 'Client',
    key: 'CLIENT',
    type: 'value',
    label: t('noumena.capacity.dropdown.client'),
  },
  {
    value: 'Co-Worker',
    key: 'CO_WORKER',
    type: 'value',
    label: t('noumena.capacity.dropdown.co_worker'),
  },
  {
    value: 'Employer',
    key: 'EMPLOYER',
    type: 'value',
    label: t('noumena.capacity.dropdown.employer'),
  },
  {
    value: 'Manager',
    key: 'MANAGER',
    type: 'value',
    label: t('noumena.capacity.dropdown.manager'),
  },
  {
    value: 'Guide',
    key: 'GUIDE',
    type: 'value',
    label: t('noumena.capacity.dropdown.guide'),
  },
  {
    value: 'Supervisor',
    key: 'SUPERVISOR',
    type: 'value',
    label: t('noumena.capacity.dropdown.supervisor'),
  },
  {
    value: 'Colleague',
    key: 'COLLEAGUE',
    type: 'value',
    label: t('noumena.capacity.dropdown.colleague'),
  },
];
