import { type Placement } from '@popperjs/core';
import { type DropdownValueType } from '../Dropdown';
import { type ITextField } from '../TextField/types';

export type Language = {
  code: string;
  name: string;
  nativeName: string;
};

export type LanguagePickerProps = {
  onOptionSelect: (option: Language) => void;
  placement?: Placement;
  containerHeight?: string;
  value?: string;
} & Pick<ITextField, 'helperText' | 'error' | 'inputSize' | 'label'>;

export type State = {
  open: boolean;
  searchQuery: string;
  filteredOptions: DropdownValueType<Language, string>[];
  value: Language;
};
