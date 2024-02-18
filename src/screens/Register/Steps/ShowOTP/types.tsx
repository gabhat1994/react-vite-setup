export type ResendOTPInfoProps = {
  handleResendOtp: () => void;
};

export type ResendOTPMessageProps = {
  /** set disabled styling but keep functionality */
  duration: number;
  handleTimedOut: () => void;
};
