import { useMemo } from 'react';
import { useGetNoumsLinkedToUserInvoicesQuery } from '@/apollo/graphql';

import { type DropdownValueType } from '@/components/Dropdown';
import { cleanList } from '@/utils/list';
import { Avatar } from '@/components/Avatar/Avatar';
import { Icon } from '@/components/Icon';
import {
  MultiselectField,
  type MultiselectFieldProps,
} from '@/components/MultiselectField';

type NoumFilterFieldProps = Pick<
  MultiselectFieldProps<string>,
  'value' | 'onChange'
>;

export function NoumFilterField({
  onChange,
  ...selectFieldProps
}: NoumFilterFieldProps) {
  const { data, loading } = useGetNoumsLinkedToUserInvoicesQuery({
    fetchPolicy: 'cache-and-network',
  });

  const options = useMemo<DropdownValueType<string, string>[]>(
    () =>
      cleanList(data?.getNoumsLinkedToUserInvoices).map((noum) => ({
        type: 'value',
        value: noum._id ?? '',
        key: noum._id ?? '',
        label: noum.name ?? '',
        icon: <Avatar url={noum.profileImage} size="M" />,
      })),

    [data],
  );

  return (
    <MultiselectField
      {...selectFieldProps}
      options={options}
      hideIcons={false}
      isLoading={loading}
      label="Noums"
      inputSize="small"
      onChange={onChange}
      usePortal
      renderContainerFromBottom
      leftIcon={
        <Icon name="search_m" color="--icon-input-neutral-default" size={20} />
      }
    />
  );
}
