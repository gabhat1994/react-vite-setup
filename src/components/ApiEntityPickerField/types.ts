import type React from 'react';
import {
  type DropdownItemType,
  type DropdownProps,
  type DropdownValueType,
} from '@/components/Dropdown';
import { type InputSize, type ITextField } from '../TextField/types';

export type ApiEntityPickerFieldProps<
  Key extends string,
  Data extends unknown = Key,
> = Omit<
  DropdownProps<Data, HTMLElement, string, Key>,
  'options' | 'value' | 'onChange' | 'children'
> &
  Pick<
    ITextField,
    | 'label'
    | 'inputSize'
    | 'fullWidth'
    | 'rightIcon'
    | 'autoFocus'
    | 'error'
    | 'helperText'
    | 'readOnly'
  > & {
    options: DropdownItemType<Data, Key>[];
    preselectedOption?: DropdownValueType<Data, Key>;
    placeholderText?: string;
    value: Key | undefined;
    selectedRightSideOption?: React.ReactNode;
    inputSize?: InputSize;
    onChange: (option: DropdownValueType<Data, Key> | undefined) => void;
    renderSelectionPreviewComponent?: (
      props: ApiEntitySelectionPreviewComponentProps<Key, Data>,
    ) => React.ReactElement;
  };

export type ApiEntitySelectionPreviewComponentProps<
  Key extends string,
  Data extends unknown = Key,
> = Pick<
  ApiEntityPickerFieldProps<Key, Data>,
  | 'selectedRightSideOption'
  | 'fullWidth'
  | 'disabled'
  | 'onChange'
  | 'inputSize'
> & {
  selectedOption?: DropdownValueType<Data, Key> | null;
  softDisabled?: boolean;
  softDisabledReason?: string;
  bold?: boolean;
  clearButtonDisabled?: boolean;
  onClear?: () => void;
};
