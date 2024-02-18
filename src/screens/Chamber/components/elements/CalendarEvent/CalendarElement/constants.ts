import { t } from 'i18next';
import { type DropdownItemType } from '@/components/Dropdown';
import { DropdownKey } from '@/features/events/types/dropdownKey';

export const addEventDropdownOptions: (
  isAnotherEventLive: boolean,
) => DropdownItemType<DropdownKey>[] = (isAnotherEventLive: boolean) => [
  {
    label: t('noumena.events.start-now'),
    description: isAnotherEventLive
      ? t('noumena.events.cant-start')
      : undefined,
    disabled: isAnotherEventLive,
    key: '1',
    type: 'value',
    value: DropdownKey.START_NOW,
  },
  {
    label: t('noumena.events.schedule'),
    key: '2',
    type: 'value',
    value: DropdownKey.SCHEDULE,
  },
];
