import { useMemo } from 'react';
import {
  ApiEntityPickerFieldWithLocalSearch,
  type ApiEntityPickerFieldWithLocalSearchProps,
} from '@/components/ApiEntityPickerField';
import { ApiEntitySelectionPreviewComponent } from '@/components/ApiEntityPickerField/ApiEntitySelectionPreviewComponent';
import { type DropdownValueType } from '@/components/Dropdown';
import { LegalRegionService } from '@/features/contracts/services/LegalRegionService';

type ContractCountryRegionSelectorProps = Omit<
  ApiEntityPickerFieldWithLocalSearchProps<string>,
  'onChange' | 'options'
> & {
  onChange: (value: string | undefined) => void;
  country: string | undefined;
};

export function ContractCountryRegionSelector({
  onChange,
  country,
  ...apiEntityPickerProps
}: ContractCountryRegionSelectorProps) {
  const options = useMemo<DropdownValueType<string>[]>(() => {
    if (!country || !LegalRegionService.hasPresetRegions(country)) {
      return [];
    }

    return LegalRegionService.getAllRegionsForCountryCode(country).map(
      (region) => ({
        type: 'value',
        key: region.code,
        label: region.label,
        value: region.code,
      }),
    );
  }, [country]);

  return (
    <ApiEntityPickerFieldWithLocalSearch
      {...apiEntityPickerProps}
      inputSize="small"
      onChange={(option) => onChange(option?.key)}
      options={options}
      renderSelectionPreviewComponent={(props) => (
        <ApiEntitySelectionPreviewComponent
          {...props}
          bold={false}
          onChange={() => onChange('')}
        />
      )}
    />
  );
}
