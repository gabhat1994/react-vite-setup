import { type DropdownValueType } from '@/components/Dropdown';

export const options: DropdownValueType<string>[] = [
  {
    key: 'downgrade',
    label: 'Downgrade',
    type: 'value',
    value: 'downgrade',
  },
  {
    key: 'cancel',
    label: 'Cancel',
    type: 'value',
    value: 'cancel',
  },
];

export const optionsMobile: DropdownValueType<string>[] = [
  {
    key: 'upgrade',
    label: 'Upgrade',
    type: 'value',
    value: 'upgrade',
  },
  {
    key: 'downgrade',
    label: 'Downgrade',
    type: 'value',
    value: 'downgrade',
  },
  {
    key: 'cancel',
    label: 'Cancel',
    type: 'value',
    value: 'cancel',
  },
];
