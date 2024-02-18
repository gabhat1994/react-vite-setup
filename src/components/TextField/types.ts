import { type InputHTMLAttributes, type ReactNode } from 'react';

export type InputSize = 'small' | 'normal';
type FieldValue = string | number | readonly string[] | undefined | null;

/**
 * Input mask type
 * If the value needs to be number only, build mask with 0s. e.g. `00-00-0000`
 * If the value needs to be string only, build mask with Zs. e.g. `ZZZZ-ZZZZ`
 * Otherwise(any value), build mask with Xs. e.g. `XX-XXXX-XX`
 *
 * 00/00/0000: Birthday format(MM/DD/YYYY)
 */
export type TInputMask = '00/00/0000';

export interface ITextField
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
  helperText?: string;
  error?: boolean;
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  inputSize?: InputSize;
  noBorder?: boolean;
  rightIconColor?: string;
  isAlwaysFocus?: boolean;
  hideLengthHelperText?: boolean;
  helperTextAbsolute?: boolean;
  fullWidth?: boolean;
  numberOnly?: boolean;
  integerOnly?: boolean;
  isCurrency?: boolean;
  centerHelperText?: boolean;
  inputMask?: TInputMask;
  hideLeftIconPlace?: boolean;
  suffix?: string;
  onlyAlphanumeric?: boolean;
  value?: FieldValue;
  disabledIconColor?: boolean;
  readOnly?: boolean;
  blockEmptySpaces?: boolean;
}
