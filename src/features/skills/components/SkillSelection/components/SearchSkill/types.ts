import { type DropdownValueType } from '@/components/Dropdown';

export type TSearchSkill = {
  label?: string;
  disabled?: boolean;
  helperText?: string;
  placeholder?: string;
  error?: boolean;
  options?: DropdownValueType<string>[];
  size?: number;
  onSelect?: (options: DropdownValueType<string>) => void;
};
