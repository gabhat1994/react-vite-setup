import { useMemo } from 'react';
import { debounce } from 'lodash';
import { useGetContractsForSelectorQuery } from '@/apollo/graphql';
import { type DropdownValueType } from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { cleanList } from '@/utils/list';
import { Stack } from '@/layout';
import {
  ApiEntityPickerFieldWithRemoteSearch,
  type ApiEntityPickerFieldWithRemoteSearchProps,
} from '@/components/ApiEntityPickerField';
import { ApiEntitySelectionPreviewComponent } from '@/components/ApiEntityPickerField/ApiEntitySelectionPreviewComponent';
import { type ContractBasic } from '../../types';
import { ContractDetails } from './ContractDetails';
import { DocumentStatusTag } from '../DocumentStatusTag/DocumentStatusTag';

type ContractSelectorProps = Omit<
  ApiEntityPickerFieldWithRemoteSearchProps<string, ContractBasic>,
  'options' | 'onChange' | 'children' | 'onInputChange'
> & {
  noumId: string;
  onChange: (value: string | undefined) => void;
};

export function ContractSelector({
  onChange,
  noumId,
  value,
  ...selectFieldProps
}: ContractSelectorProps) {
  const { data, loading, refetch } = useGetContractsForSelectorQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      offset: 0,
      limit: 100,
      filter: {
        noumIds: [noumId!],
        search: '',
      },
    },
    skip: !noumId,
  });

  const contracts = data?.getContractList.data;

  const options = useMemo<DropdownValueType<ContractBasic, string>[]>(() => {
    function mapContact(
      contract: ContractBasic,
    ): DropdownValueType<ContractBasic, string> {
      return {
        key: contract._id,
        type: 'value',
        value: contract,
        label: `${contract.title}`,
        icon: <Icon name="file_m" size={24} />,
      };
    }

    const cleanData = cleanList(contracts);
    return cleanData.map(mapContact);
  }, [contracts]);

  const debouncedSearch = useMemo(
    () =>
      debounce(
        (searchTerm: string) =>
          refetch({
            filter: {
              search: searchTerm,
              noumIds: [noumId],
            },
          }),
        500,
      ),
    [noumId, refetch],
  );

  const selectedOption = options.find((option) => option.key === value);

  return (
    <Stack gap={16} vertical fullWidth align="stretch">
      <ApiEntityPickerFieldWithRemoteSearch
        options={options}
        maxContainerHeight="200px"
        renderStickyHeader={() => {}}
        {...selectFieldProps}
        isLoading={loading}
        hideIcons={false}
        value={value ?? ''}
        onChange={(option) => onChange(option?.key || '')}
        onInputChange={debouncedSearch}
        leftIcon={
          <Icon
            name="search_m"
            size={20}
            color="--icon-input-neutral-default"
          />
        }
        renderSelectionPreviewComponent={(props) => (
          <ApiEntitySelectionPreviewComponent
            {...props}
            selectedRightSideOption={
              props.selectedOption && (
                <DocumentStatusTag status={props.selectedOption.value.status} />
              )
            }
          />
        )}
      />
      {selectedOption && <ContractDetails contract={selectedOption.value} />}
    </Stack>
  );
}
