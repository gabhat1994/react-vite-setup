import { type LoginData, type VerifyResp } from '../types';

export type OTPVerifyProps = {
  loginData?: LoginData;
  loading?: boolean;
  isResendLoading?: boolean;
  errorMsg?: string;
  backStep: () => void;
  beforeSubmit: () => void;
  onVerifyFailed: (msg: string) => void;
  onVerifySuccess: (resp: VerifyResp) => void;
  remainingRequests: number;
  timeLeftForNextResend: number | undefined;
};
