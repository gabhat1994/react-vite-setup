import { type Dispatch, type SetStateAction } from 'react';
import { type SignUpValues } from '@/screens/Register/types';
import { type UserOutput } from '@/apollo/generated/types';

export interface SignUpStepThreeInterface {
  setStep: Dispatch<SetStateAction<number>>;
  userInfo: SignUpValues | undefined;
  setUserOutput?: (data: UserOutput) => void;
  setUserInfo?: (data: SignUpValues) => void;
}
