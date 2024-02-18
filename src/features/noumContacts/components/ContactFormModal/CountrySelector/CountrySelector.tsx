import { type SelectFieldProps } from '@/components/SelectField/SelectField';
import { ApiEntityPickerFieldWithLocalSearch } from '@/components/ApiEntityPickerField';
import { countryOptions } from './constants';

type CountrySelectorProps = Omit<
  SelectFieldProps<string>,
  'onChange' | 'options'
> & {
  onChange: (key: string | undefined) => void;
};

export function CountrySelector({
  onChange,
  value,
  ...selectFieldProps
}: CountrySelectorProps) {
  const selectedCountry = countryOptions.find(
    (country) => country.value === value,
  );

  return (
    <ApiEntityPickerFieldWithLocalSearch
      {...selectFieldProps}
      value={value}
      hideIcons={false}
      leftIcon={selectedCountry?.icon ?? undefined}
      inputValue={selectedCountry?.label?.toString()}
      onChange={(option) => onChange(option?.value)}
      options={countryOptions}
      rightIcon={<></>}
    />
  );
}
