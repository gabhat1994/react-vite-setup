import { type Icons } from '@/components/Icon/Icon';
import { type Privacy } from '@/apollo/generated/types';
import { type DropdownValueType } from '@/components/Dropdown';

export interface PrivacySettingOptions
  extends DropdownValueType<Privacy, string> {
  key: string;
  label: string;
  value: Privacy;
  description: string;
  iconName: keyof typeof Icons;
}
export interface DropdownOptionProps {
  onChange: (value: DropdownValueType<Privacy, string>) => void;
}

type PrivacySettingValueof<T> = T[keyof T];

export type PrivacySettingsMapping = {
  [key in PrivacySettingValueof<typeof Privacy>]: string;
};
