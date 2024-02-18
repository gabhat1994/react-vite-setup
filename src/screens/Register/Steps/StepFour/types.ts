import { type SignUpValues } from '@/screens/Register/types';
import { type UserOutput } from '@/apollo/generated/types';

export interface SignUpFormProps {
  userInfo: SignUpValues | undefined;
  userOutput?: UserOutput;
}
