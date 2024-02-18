import { useMemo } from 'react';
import { useAllNoumsContactsQuery } from '@/apollo/graphql';
import { type DropdownValueType } from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { cleanList } from '@/utils/list';
import { Avatar } from '@/components/Avatar/Avatar';
import {
  MultiselectField,
  type MultiselectFieldProps,
} from '@/components/MultiselectField';
import { NoumContactStatus } from '@/apollo/generated/types';
import { UserUtil } from '@/utils/user';

type CustomersFilterFieldProps = Pick<
  MultiselectFieldProps<string>,
  'value' | 'onChange'
>;

export function CustomersFilterField({
  value,
  onChange,
}: CustomersFilterFieldProps) {
  const { data, loading, fetchMore } = useAllNoumsContactsQuery({
    variables: {
      limit: 10,
      offset: 0,
      query: '',
      status: NoumContactStatus.Active,
    },
  });

  const list = cleanList(data?.allNoumsContacts.data);
  const totalCount = data?.allNoumsContacts.count ?? 0;

  const handleFetchMore = () => {
    if (totalCount <= list.length) {
      return;
    }

    fetchMore({
      variables: {
        offset: list.length,
        limit: 10,
        query: '',
        status: NoumContactStatus.Active,
      },
      // The Type Policy for this query is configured for paginated list, so here we're explicitly overriding this.
      // TODO: Ask for a separate query to avoid such workarounds?
      updateQuery(prevData, { fetchMoreResult }) {
        return {
          ...prevData,
          allNoumsContacts: {
            ...prevData.allNoumsContacts,
            data: [
              ...prevData.allNoumsContacts.data,
              ...fetchMoreResult.allNoumsContacts.data,
            ],
          },
        };
      },
    });
  };

  const options = useMemo<DropdownValueType<string>[]>(
    () => [
      ...list.map((item) => ({
        key: item._id,
        label: item.displayName,
        type: 'value' as const,
        value: item._id,
        icon: <Avatar url={UserUtil.getProfilePicture(item.user)} size="M" />,
      })),
    ],
    [list],
  );

  return (
    <MultiselectField<string, string>
      options={options}
      maxContainerHeight="300px"
      inputSize="small"
      renderStickyHeader={() => {}}
      hideIcons={false}
      multiselect
      label="Customers"
      isLoading={loading}
      value={value}
      onChange={onChange}
      usePortal
      renderContainerFromBottom
      leftIcon={
        <Icon name="search_m" color="--icon-input-neutral-default" size={20} />
      }
      onFetchMore={handleFetchMore}
    />
  );
}
