import { Flag } from '@/components/Flag';
import countries from '@/assets/json/countries.json';
import { type DropdownValueType } from '@/components/Dropdown';
import { type FlagProps } from '@/components/Flag/Flag';

export const countryOptions: DropdownValueType<string>[] = countries.map(
  (country) => ({
    type: 'value',
    key: country.iso2,
    label: country.name,
    value: country.iso2,
    icon: <Flag flag={`flag_${country.iso2}` as FlagProps['flag']} size={24} />,
  }),
);
