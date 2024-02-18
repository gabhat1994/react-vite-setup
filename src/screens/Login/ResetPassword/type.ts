export type EmailForm = {
  email: string;
};

export type CreatePasswordForm = {
  password: string;
};

export type Steps =
  | 'enter-email'
  | 'otp-validation'
  | 'create-password'
  | 'success';

export type OtpScreenProps = {
  timeElapsed: boolean;
  remainingRequest: number;
  nextRequestAfterInSecond: number;
  loading: boolean;
  onTimeOut: () => void;
  onResend?: (email: { email: string }) => void;
  onResendForLoggedInUser?: () => void;
  createPasswordLoading?: boolean;
};

export type OtpVerifyProps = {
  onConfirm: (otp: string) => void;
};
