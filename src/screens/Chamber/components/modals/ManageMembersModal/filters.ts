import { NoumMemberStatus } from '@/apollo/generated/types';
import { useGetNoumRolesQuery } from '@/apollo/graphql';
import { cleanList } from '@/utils/list';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const statusesForFilter: NoumMemberStatus[] = [
  NoumMemberStatus.Connected,
  NoumMemberStatus.Invited,
  NoumMemberStatus.Requested,
];

export type NoumMembersListQueryFilters = {
  statuses: NoumMemberStatus[];
  roleIDs: string[];
  search: string;
};

export function useNoumMembersListFilters() {
  const { t } = useTranslation();

  const noumRolesQuery = useGetNoumRolesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: 50,
      offset: 0,
    },
  });

  const { statusOptions, statusValues } = useMemo(() => {
    const options = statusesForFilter.map((statusName) => ({
      key: statusName,
      value: statusName,
      label: t(`noumena.chamber.members.status.${statusName.toLowerCase()}`),
      type: 'value' as const,
    }));
    const values = options.map((option) => option.value);

    return { statusOptions: options, statusValues: values };
  }, [t]);

  const { roleOptions, roleValues } = useMemo(() => {
    const options = cleanList(noumRolesQuery.data?.noumRoles.data).map(
      (role) => ({
        key: role._id,
        value: role._id,
        label: role.name,
        type: 'value' as const,
      }),
    );
    const values = options.map((option) => option.value);

    return { roleOptions: options, roleValues: values };
  }, [noumRolesQuery.data?.noumRoles.data]);

  return {
    statuses: {
      options: statusOptions,
      allValues: statusValues,
      loading: false,
    },
    roles: {
      options: roleOptions,
      allValues: roleValues,
      loading: noumRolesQuery.loading,
    },
  };
}
