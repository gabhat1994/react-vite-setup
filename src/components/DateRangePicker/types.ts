import { type ChangeEvent, type Dispatch, type SetStateAction } from 'react';
import { type DateRange } from 'react-day-picker';
import { type DateFormat, type DatePickerProps } from '../DatePicker/types';
import { type ITextField } from '../TextField/types';

export type CustomDateRangePickerProps = Omit<
  DatePickerProps,
  'value' | 'onChange'
> & {
  onConfirm?: (value?: DateRange) => void;

  popperReference: HTMLSpanElement | null;

  isOpen: boolean;

  setIsOpen: Dispatch<SetStateAction<boolean>>;
  value?: DateRange;
  fromLabel?: string;
  toLabel?: string;
} & Omit<ITextField, 'value'>;

export type CustomDateFieldProps = ITextField & {
  /** Display date format */
  dateFormat?: DateFormat;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
};
