import { type DropdownValueType } from '@/components/Dropdown';
import { AccountType } from './type';

export const AccounTypeDropdownOptions: DropdownValueType<string>[] = [
  {
    key: 'savings',
    value: AccountType.Savings,
    label: 'Savings',
    type: 'value',
  },
  {
    key: 'checking',
    value: AccountType.Checking,
    label: 'Checking',
    type: 'value',
  },
];
