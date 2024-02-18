import { type ITextField } from '../TextField/types';

export type PhoneInputProps = ITextField & {
  onPhoneChange: (phone: string) => void;
  onPressEnterKey?: () => void;
};

export type Country = {
  name: string;
  dialCode: string;
  iso2: string;
};
