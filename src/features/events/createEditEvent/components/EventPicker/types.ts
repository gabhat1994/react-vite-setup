import {
  type DropdownProps,
  type DropdownTargetProps,
  type DropdownValueType,
} from '@/components/Dropdown';
import { type ITextField } from '@/components/TextField/types';

export type EventPickerProps<T> = ITextField &
  Partial<DropdownProps<T, HTMLElement>> & {
    value: string;
    selectedLabel?: string;
    inputStyle?: React.CSSProperties;
    options?: DropdownValueType<T>[];
    children?: (props: DropdownTargetProps<HTMLElement>) => JSX.Element;
    onOptionChange: (option: DropdownValueType<T>) => void;
  };
