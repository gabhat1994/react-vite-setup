import { Controller, type Path } from 'react-hook-form';
import { Stack, StackItem } from '@/layout';
import { getTouchedErrorProps } from '@/utils/forms';
import { TextField } from '@/components/TextField';
import {
  type ContractFormValues,
  useContractFormContext,
} from '../../hooks/contractForm';
import { ContractCountrySelector } from './ContractCountrySelector';
import { ContractCountryRegionSelector } from './ContractRegionSelector';

import { LegalRegionService } from '../../services/LegalRegionService';

type LegalSections = Extract<
  Path<ContractFormValues>,
  'governingLaw' | 'arbitration'
>;

interface ContractLegalRegionSelectorProps {
  name: LegalSections;
}

export function ContractLegalRegionSelector({
  name,
}: ContractLegalRegionSelectorProps) {
  const { control, watch, setValue } = useContractFormContext();

  const country = watch(`${name}.country` as const);

  return (
    <Stack gap={16} fullWidth>
      <StackItem grow={1} basis="50%">
        <Controller<ContractFormValues>
          name={`${name}.country` as const}
          control={control}
          render={({ field: { onChange, value }, fieldState }) => (
            <ContractCountrySelector
              disabled
              placeholderText="Country"
              maxContainerHeight="300px"
              value={value}
              onChange={(newValue) => {
                onChange(newValue);
                setValue(`${name}.region` as const, '');
              }}
              {...getTouchedErrorProps(fieldState)}
            />
          )}
        />
      </StackItem>

      {country && !LegalRegionService.hasNoRegions(country) && (
        <StackItem grow={1} basis="50%">
          <Controller<ContractFormValues>
            name={`${name}.region` as const}
            control={control}
            render={({ field: { onChange, value }, fieldState }) => {
              if (LegalRegionService.hasPresetRegions(country)) {
                return (
                  <ContractCountryRegionSelector
                    placeholderText={
                      LegalRegionService.hasState(country) ? 'State' : 'Region'
                    }
                    maxContainerHeight="300px"
                    hideIcons={true}
                    hideLeftIconPlace={false}
                    country={country}
                    value={value}
                    onChange={onChange}
                    {...getTouchedErrorProps(fieldState)}
                  />
                );
              }

              if (LegalRegionService.hasCustomRegion(country)) {
                return (
                  <TextField
                    value={value}
                    onChange={onChange}
                    placeholder="Region"
                    inputSize="small"
                  />
                );
              }

              return <></>;
            }}
          />
        </StackItem>
      )}
    </Stack>
  );
}
