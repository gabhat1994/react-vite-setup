import { type LoginData } from '../types';

export type OTPResendProps = {
  loginData?: LoginData;
  minHeight?: string;
  isResendLoading?: boolean;
  remainingRequests: number;
  timeLeftForNextResend: number | undefined;
  recaptchaToken?: string | null;
  beforeSubmit: (isResending?: boolean) => void;
  onLoginFailed: (
    type: 'phone' | 'email',
    errorStatus: number,
    errorMessage: string,
    isResend?: boolean,
  ) => void;
  onLoginSuccess: (
    msg: string,
    nextRequestAfterInSecond: number,
    remainingRequest: number,
    data: LoginData,
    isResend?: boolean,
  ) => void;
};
