import { useGetNoumRolesQuery } from '@/apollo/graphql';
import { SelectField, type SelectFieldProps } from '@/components/SelectField';
import { cleanList } from '@/utils/list';
import { useMemo } from 'react';
import { type DropdownValueType } from '@/components/Dropdown';
import { mapRoleOptionsFromList } from './mappers';

interface NoumRolePickerProps
  extends Omit<SelectFieldProps<string>, 'value' | 'onChange' | 'options'> {
  value: string;
  onChange(option: DropdownValueType<string>): void;
}

export function NoumRolePicker({
  value,
  onChange,
  ...selectFieldProps
}: NoumRolePickerProps) {
  const { data, loading } = useGetNoumRolesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: 50,
      offset: 0,
    },
  });

  const noumRoleOptions = useMemo(
    () => mapRoleOptionsFromList(cleanList(data?.noumRoles.data)),
    [data?.noumRoles.data],
  );

  return (
    <SelectField
      isLoading={loading}
      hideIcons
      options={noumRoleOptions}
      searchable={false}
      searchPlaceholder={value ? undefined : 'Role'}
      value={value}
      onChange={onChange}
      maxContainerHeight="250px"
      {...selectFieldProps}
    />
  );
}
