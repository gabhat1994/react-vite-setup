import { type Maybe } from '@/common/types';
import { type LoginData } from '../../types';

export type PhoneLoginFormProps = {
  recaptchaToken?: Maybe<string>;
  loading?: boolean;
  errorMessage?: string;
  submitLoginData: (data: LoginData) => void;
};
