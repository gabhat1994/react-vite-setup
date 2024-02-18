import { type HTMLAttributes } from 'react';

export interface CommonOtpProps {
  /** Size of the OTP fields, if value is four then four fields will be displayed */
  numInputs?: number;
  /** Makes the OTP fields disabled */
  isDisabled?: boolean;
  /** Is the OTP number only or string */
  isInputNum?: boolean;
  /** Is the OTP/code password */
  isInputPassword?: boolean;
  /** OTP value to stored */
  value: string | undefined;
  /** Cypress  id to add to input for E2E tests */
  dataCy?: string;
  /** Data test  id to add to input for unit tests */
  dataTestId?: string;
  /** Override onchange to get the otp value out of the component  */
  onChange: (otp: string | undefined) => void;
  /** On enter click on last input */
  onEnter?: () => void;
  /** width of single input in PX  */
  width?: string;
  color?: string;
  launchFrom?: string;
}

type HTMLProps = HTMLAttributes<HTMLDivElement>;

export type OtpProps = HTMLProps & CommonOtpProps;
