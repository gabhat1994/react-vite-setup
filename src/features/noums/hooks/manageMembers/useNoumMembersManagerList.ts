import { type NoumMemberStatus } from '@/apollo/generated/types';
import { useGetNoumMembersQuery } from '@/apollo/graphql';
import { cleanList } from '@/utils/list';
import { useMemo } from 'react';

interface UseNoumMembersManagerOptions {
  noumId?: string;
  rowsPerPage: number;
  skip?: boolean;
  defaultStatuses?: NoumMemberStatus[];
}

export function useNoumMembersManagerList({
  noumId,
  rowsPerPage,
  skip = false,
  defaultStatuses,
}: UseNoumMembersManagerOptions) {
  const { data, fetchMore, refetch, networkStatus, loading } =
    useGetNoumMembersQuery({
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      variables: {
        noumId: noumId!,
        input: {
          offset: 0,
          limit: rowsPerPage,
          statuses: defaultStatuses,
        },
      },
      skip: !noumId || skip,
    });

  const membersData = useMemo(
    () => cleanList(data?.getSpaceById?.members?.data),
    [data?.getSpaceById?.members?.data],
  );

  const currentCount = membersData.length;
  const totalCount = data?.getSpaceById?.members?.count ?? 0;

  const onFetchMore = () => {
    fetchMore({ variables: { offset: currentCount } });
  };

  return {
    membersData,
    currentCount,
    totalCount,
    networkStatus,
    loading,
    fetchMore: onFetchMore,
    refetch,
  };
}
