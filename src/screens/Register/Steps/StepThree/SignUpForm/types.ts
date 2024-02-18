import { type Dispatch, type SetStateAction } from 'react';
import { type UserOutput } from '@/apollo/generated/types';
import { type SignUpValues } from '@/screens/Register/types';

export interface SignUpFormProps {
  setStep: Dispatch<SetStateAction<number>>;
  userInfo: SignUpValues | undefined;
  setUserInfo?: (data: SignUpValues) => void;
  setUserOutput?: (data: UserOutput) => void;
}
