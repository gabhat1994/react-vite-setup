import { type InputHTMLAttributes } from 'react';

interface CommonSingleOtpInputProps {
  /** Active field to focus */
  focus?: boolean;
  /** isDisabled true makes field to disabled */
  isDisabled?: boolean;
  /** is field is number or not a number */
  isInputNum?: boolean;
  /** is field is password */
  isInputPassword?: boolean;
  /** value  of the field */
  value?: string;
  /** width  of the field in PX */
  width?: string;
  color?: string;
  launchFrom?: string;
}

type HTMLInputProps = InputHTMLAttributes<HTMLInputElement>;

export type SingleOtpProps = HTMLInputProps & CommonSingleOtpInputProps;
