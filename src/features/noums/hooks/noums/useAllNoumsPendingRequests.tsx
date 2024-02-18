import { NoumMemberStatus } from '@/apollo/generated/types';
import {
  useSentNoumConnectionRequestsQuery,
  useUserMembersQuery,
} from '@/apollo/graphql';
import { useCallback } from 'react';

export const useAllNoumsPendingRequests = (
  status: NoumMemberStatus,
  limit: number,
  skip?: boolean,
) => {
  const {
    data: requestsReceivedData,
    loading: requestsReceivedLoading,
    refetch: requestsReceivedRefetch,
    fetchMore: requestsReceivedFetchMore,
    networkStatus: requestsReceivedNetworkStatus,
  } = useUserMembersQuery({
    variables: {
      status,
      limit,
      offset: 0,
    },
    fetchPolicy: 'cache-and-network',
    skip: skip || status === NoumMemberStatus.Invited,
  });

  const {
    data: requestsSentData,
    loading: requestsSentLoading,
    refetch: requestsSentRefetch,
    fetchMore: requestsSentFetchMore,
    networkStatus: requestsSentNetworkStatus,
  } = useSentNoumConnectionRequestsQuery({
    variables: {
      offset: 0,
      limit,
    },
    fetchPolicy: 'cache-and-network',
    skip: skip || status === NoumMemberStatus.Requested,
  });

  const {
    data,
    loading,
    refetch,
    networkStatus,
    userMembers,
    userMembersCount,
    fetchMore,
  } =
    status === NoumMemberStatus.Requested
      ? {
          loading: requestsReceivedLoading,
          refetch: requestsReceivedRefetch,
          networkStatus: requestsReceivedNetworkStatus,
          userMembers: requestsReceivedData?.userMembers.data || [],
          data: requestsReceivedData?.userMembers,
          userMembersCount: requestsReceivedData?.userMembers.count || 0,
          fetchMore: requestsReceivedFetchMore,
        }
      : {
          loading: requestsSentLoading,
          refetch: requestsSentRefetch,
          networkStatus: requestsSentNetworkStatus,
          userMembers: requestsSentData?.sentNoumConnectionRequests.data || [],
          data: requestsSentData?.sentNoumConnectionRequests,
          userMembersCount:
            requestsSentData?.sentNoumConnectionRequests.count || 0,
          fetchMore: requestsSentFetchMore,
        };

  const fetchMoreMembers = useCallback(
    () =>
      fetchMore({
        variables: {
          offset: userMembers.length || 0,
        },
      }),
    [fetchMore, userMembers.length],
  );

  return {
    data,
    loading,
    refetch,
    fetchMoreMembers,
    networkStatus,
    userMembers,
    userMembersCount,
  };
};
