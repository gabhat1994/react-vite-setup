import { type Maybe } from '@/common/types';
import { type LoginData } from '../types';

export type LoginFormProps = {
  recaptchaToken?: Maybe<string>;
  loading?: boolean;
  errorMessage?: string;
  beforeSubmit: (isResending?: boolean) => void;
  onLoginFailed: (
    type: 'phone' | 'email',
    errorStatus: number,
    errorMessage: string,
  ) => void;
  onLoginSuccess: (
    msg: string,
    nextRequestAfterInSecond: number,
    remainingRequest: number,
    data: LoginData,
    isResend?: boolean,
  ) => void;
  clearInput?: () => void;
};
