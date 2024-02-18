import { type Placement } from '@popperjs/core';
import {
  type CaptionLayout,
  type DateRange,
  type DayPickerBase,
} from 'react-day-picker';

export type DateFormat = 'MMM dd, yyyy' | 'yyyy-MM-dd' | 'MM/dd/yyyy';
export type DatePickerColor = 'main' | 'placeholder';

export type DatePickerSize = 'small' | 'large';

export type DatePickerRefProps = { onClose: () => void };

export type DatePickerProps = {
  /** Whether to show border on focus or not */
  borderOnFocus?: boolean;

  /** Display date format */
  dateFormat?: DateFormat;

  /** Whether the field is disabled or not */
  disabled?: DayPickerBase['disabled'];

  /** Whether the field has error or not */
  error?: boolean;

  /** Minimum year user can select */
  fromYear?: number;

  /** Whether the field should be stretched or not */
  fullSize?: boolean;

  /** Datepicker mode */
  mode?: 'range' | 'single';

  /** value for `range` mode */
  rangeValue?: DateRange;

  /** Helper text displaying under the field, especially error message */
  helperText?: string;

  /** Field label */
  label?: string;

  /** Layout type: dropdown | buttons */
  layout?: CaptionLayout;

  /** Maximum date user can select */
  maxDate?: Date;

  /** Minimum date user can select */
  minDate?: Date;

  /** Minimum width of the field */
  minWidth?: string;

  /** Minimum width of the popper */
  minPopperWidth?: string;

  /** Date panel placement */
  placement?: Placement;

  /** Whether the field is required or not */
  required?: boolean;

  /** Whether show calendar icon or not */
  showIcon?: boolean;

  /** data-testid */
  testId?: string;

  /** Maximum year user can select */
  toYear?: number;

  /** Value */
  value?: Date | null;

  /** Picker input size */
  size?: DatePickerSize;

  /** Placeholder for the input */
  placeholder?: string;

  customIcon?: React.ReactNode;

  /** Change callback */
  customDisplayValue?: string;
  onChange?: (value?: Date) => void;
  onChangeRange?: (value?: DateRange) => void;
  renderCaption?: (date: Date) => React.ReactElement;
  renderFooter?: () => React.ReactElement;
};

export const pickDateColor: { [color in DatePickerColor]: string } = {
  main: 'var(--text-input-neutral-filled)',
  placeholder: 'var(--text-input-neutral-default)',
};
