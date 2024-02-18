import { debounce } from 'lodash';
import { useMemo, useState } from 'react';
import { EntityType } from '@/apollo/generated/types';
import { useGlobalSearchQuery } from '@/apollo/graphql';
import { Avatar } from '@/components/Avatar/Avatar';
import { type DropdownItemType } from '@/components/Dropdown';
import { SelectField } from '@/components/SelectField';
import { type SelectFieldProps } from '@/components/SelectField/SelectField';
import { cleanList } from '@/utils/list';
import { Icon } from '@/components/Icon';
import { SelectedUserType } from '@/features/noumContacts/hooks/contactForm';
import { type UserSearchData } from './types';

type UserSearchProps = Omit<
  SelectFieldProps<string, UserSearchData>,
  'options'
>;

const LIMIT = 10;

export function UserSearch({ onChange, ...selectFieldProps }: UserSearchProps) {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const { data, loading, fetchMore } = useGlobalSearchQuery({
    variables: {
      query: searchTerm!,
      excludeEntityTypes: [
        EntityType.Event,
        EntityType.Post,
        EntityType.ProjectNoum,
      ],
      limit: LIMIT,
      offset: 0,
    },
    skip: !searchTerm,
  });

  const results = searchTerm ? data?.globalSearch.data : undefined;
  const totalCount = data?.globalSearch?.count ?? 0;

  const stickyHeaderOptions: DropdownItemType<UserSearchData, string>[] =
    searchTerm
      ? [
          {
            key: 'add_new',
            label: `Add ${searchTerm}`,
            type: 'value',
            value: { fullName: searchTerm, userType: SelectedUserType.New },
            icon: <Icon name="add_m" size={24} />,
          },
        ]
      : [];

  const options: DropdownItemType<UserSearchData>[] = useMemo(
    () =>
      cleanList(results).map(({ user, id }) => ({
        key: user.id ?? id,
        label: user.name,
        description: user.title ? user.title : undefined,
        value: {
          ...user,
          fullName: user.name ?? '',
          userType: SelectedUserType.Existing,
        },
        type: 'value',
        icon: <Avatar url={user.thumbnailUrl} size="M" />,
      })),
    [results],
  );

  const debouncedSearch = useMemo(() => debounce(setSearchTerm, 300), []);

  return (
    <SelectField<string, UserSearchData>
      {...selectFieldProps}
      options={options}
      hideIcons={false}
      stickyHeaderOptions={stickyHeaderOptions}
      onChange={(option) => {
        onChange(option);
        setSearchTerm(null);
      }}
      onInputChange={debouncedSearch}
      onFetchMore={() => {
        if (results && totalCount > results.length) {
          fetchMore({
            variables: {
              offset: results.length,
            },
          });
        }
      }}
      isLoading={loading}
      isOpen={!!searchTerm}
    />
  );
}
