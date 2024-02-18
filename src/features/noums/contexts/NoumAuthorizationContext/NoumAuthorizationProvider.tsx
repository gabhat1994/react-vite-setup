import { useGetNoumMemberAuthorizationInfoQuery } from '@/apollo/graphql';
import { cleanList } from '@/utils/list';
import { useMemo, type ReactNode } from 'react';
import { useLaunchDarkly } from '@/hooks';
import { NoumAuthorizationContext } from './NoumAuthorizationContext';
import { mapNoumRole } from './mappers';
import { type NoumAuthorizationContextValues } from './types';

interface NoumAuthorizationProviderProps {
  children: ReactNode;
  noumId?: string | null;
}

export function NoumAuthorizationProvider({
  children,
  noumId,
}: NoumAuthorizationProviderProps) {
  const { flags } = useLaunchDarkly();

  const { data, refetch } = useGetNoumMemberAuthorizationInfoQuery({
    variables: {
      noumId: noumId!,
    },
    skip: !flags.elementPermission || !noumId,
  });

  const assignedRole = data?.getSpaceById?.assignedRole;

  const role = useMemo(() => mapNoumRole(assignedRole), [assignedRole]);

  const permissions = useMemo(
    () => cleanList(assignedRole?.groupedPermissions),
    [assignedRole?.groupedPermissions],
  );

  const value = useMemo<NoumAuthorizationContextValues>(
    () => ({
      role,
      permissions,
      refetchNoumAuthorizationData: async () => {
        await refetch();
      },
    }),
    [permissions, refetch, role],
  );

  return (
    <NoumAuthorizationContext.Provider value={value}>
      {children}
    </NoumAuthorizationContext.Provider>
  );
}
