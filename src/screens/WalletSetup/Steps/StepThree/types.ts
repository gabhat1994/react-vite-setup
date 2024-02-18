export interface FormValues {
  email: string;
}

export type ResendOTPMessageProps = {
  /** set disabled styling but keep functionality */
  duration: number;
  handleTimedOut: () => void;
};
