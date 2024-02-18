import { type Maybe } from 'yup/es/types';
import { type UserOutput } from '@/apollo/generated/types';

export enum LoginStep {
  LOGIN = 'LOGIN',
  VERIFY = 'VERIFY',
}

export type LoginData = {
  type: 'phone' | 'email';
  value: string;
};

export type OTPVerifyData = LoginData & { otp: string };

export interface VerifyResp {
  errorMessage: Maybe<string>;
  errorStatus: Maybe<number>;
  user: UserOutput;
  token: {
    accessToken: string;
    refreshToken: string;
    expiresIn: string;
  };
}
