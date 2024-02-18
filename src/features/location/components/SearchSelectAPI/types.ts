import { type UseFormRegister } from 'react-hook-form';
import { type UserProfileInput } from '@/apollo/generated/types';
import { type DropdownValueType } from '@/components/Dropdown';

export type TSearchSelect = {
  label?: string;
  disabled?: boolean;
  helperText?: string;
  error?: boolean;
  options?: DropdownValueType<string>[];
  size?: number;
  onSelect?: (options: DropdownValueType<string>) => void;
  showValue?: string;
  onClear?: () => void;
  setTextFieldValue?: (value: string) => void;
  register?: UseFormRegister<UserProfileInput>;
  setSuggestedOptions?: (value: DropdownValueType<string, string>[]) => void;
};
