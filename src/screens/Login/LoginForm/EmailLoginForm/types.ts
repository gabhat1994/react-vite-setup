import { type Maybe } from '@/common/types';
import { type LoginData } from '../../types';

export type EmailLoginFormInputs = {
  email: string;
};

export type EmailLoginFormProps = {
  recaptchaToken?: Maybe<string>;
  loading?: boolean;
  submitLoginData: (data: LoginData) => void;
};
