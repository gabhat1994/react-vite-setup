import { type Dispatch, type SetStateAction } from 'react';
import { type RequiredStringSchema } from 'yup/lib/string';
import { type AnyObject } from 'yup/es/types';

import { type SignUpValues } from '@/screens/Register/types';

export interface SignUpFormProps {
  setStep: Dispatch<SetStateAction<number>>;
  userInfo: SignUpValues | undefined;
  setUserInfo: (data: SignUpValues) => void;
}

export interface SignUpFormSchema {
  firstName: RequiredStringSchema<string | undefined, AnyObject>;
  lastName: RequiredStringSchema<string | undefined, AnyObject>;
  referralCode?: RequiredStringSchema<string | undefined, AnyObject>;
}
