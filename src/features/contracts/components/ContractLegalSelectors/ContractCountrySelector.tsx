import {
  ApiEntityPickerFieldWithLocalSearch,
  type ApiEntityPickerFieldWithLocalSearchProps,
} from '@/components/ApiEntityPickerField';
import { ApiEntitySelectionPreviewComponent } from '@/components/ApiEntityPickerField/ApiEntitySelectionPreviewComponent';
import { type DropdownValueType } from '@/components/Dropdown';
import { Flag } from '@/components/Flag';
import { type FlagProps } from '@/components/Flag/Flag';
import { LegalRegionService } from '../../services/LegalRegionService';

const countryOptions: DropdownValueType<string>[] =
  LegalRegionService.getAllCountries().map((country) => ({
    type: 'value',
    key: country.code,
    label: country.label,
    value: country.code,
    icon: <Flag flag={`flag_${country.code}` as FlagProps['flag']} size={24} />,
  }));

type ContractCountrySelectorProps = Omit<
  ApiEntityPickerFieldWithLocalSearchProps<string>,
  'onChange' | 'options'
> & {
  onChange: (value: string | undefined) => void;
};

export function ContractCountrySelector({
  onChange,
  ...apiEntityPickerProps
}: ContractCountrySelectorProps) {
  return (
    <ApiEntityPickerFieldWithLocalSearch
      {...apiEntityPickerProps}
      hideIcons={false}
      inputSize="small"
      onChange={(option) => onChange(option?.key)}
      options={countryOptions}
      renderSelectionPreviewComponent={(props) => (
        <ApiEntitySelectionPreviewComponent
          {...props}
          onChange={() => onChange('')}
          bold={false}
        />
      )}
    />
  );
}
