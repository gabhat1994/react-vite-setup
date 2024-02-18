import { type Dispatch, type SetStateAction } from 'react';
import { type SignUpValues } from '@/screens/Register/types';

export interface SignUpStepTwoInterface {
  setStep: Dispatch<SetStateAction<number>>;
  userInfo: SignUpValues | undefined;
  setUserInfo: (data: SignUpValues) => void;
}
