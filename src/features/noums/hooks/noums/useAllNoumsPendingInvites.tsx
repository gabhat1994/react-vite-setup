import { ConnectionType } from '@/apollo/generated/types';
import {
  useReceivedNoumConnectionInvitesQuery,
  useSentNoumConnectionInvitesQuery,
} from '@/apollo/graphql';
import { PAGE_SIZE } from '@/screens/Chambers/constants';
import { useCallback } from 'react';

export const useAllNoumsPendingInvites = (
  defaultStatus?: ConnectionType,
  skip?: boolean,
) => {
  const {
    data: invitesReceivedData,
    loading: invitesReceivedLoader,
    networkStatus: invitesReceivedNetwrokStatus,
    refetch: invitesReceivedRefetch,
    fetchMore: invitesReceivedfetchMore,
  } = useReceivedNoumConnectionInvitesQuery({
    variables: {
      limit: PAGE_SIZE,
    },
    fetchPolicy: 'cache-and-network',
    skip: skip || defaultStatus === ConnectionType.Sent,
  });

  const {
    data: invitesSentData,
    loading: invitesSentLoader,
    networkStatus: invitesSentNetworkStatus,
    refetch: invitesSentRefetch,
    fetchMore: invitesSentFetchMore,
  } = useSentNoumConnectionInvitesQuery({
    variables: {
      limit: PAGE_SIZE,
    },
    fetchPolicy: 'cache-and-network',
    skip: skip || defaultStatus === ConnectionType.Received,
  });

  const { loading, refetch, networkStatus, items, totalCount, fetchMore } =
    defaultStatus === ConnectionType.Received
      ? {
          loading: invitesReceivedLoader,
          refetch: invitesReceivedRefetch,
          networkStatus: invitesReceivedNetwrokStatus,
          items: invitesReceivedData?.receivedNoumConnectionInvites.data || [],
          totalCount:
            invitesReceivedData?.receivedNoumConnectionInvites.count || 0,
          fetchMore: invitesReceivedfetchMore,
        }
      : {
          loading: invitesSentLoader,
          refetch: invitesSentRefetch,
          networkStatus: invitesSentNetworkStatus,
          items: invitesSentData?.sentNoumConnectionInvites.data || [],
          totalCount: invitesSentData?.sentNoumConnectionInvites.count || 0,
          fetchMore: invitesSentFetchMore,
        };

  const infinityFetch = useCallback(
    () =>
      fetchMore({
        variables: {
          offset: items?.length || 0,
        },
      }),
    [fetchMore, items?.length],
  );

  return {
    items,
    totalCount,
    loading,
    networkStatus,
    refetch,
    infinityFetch,
  };
};
export default useAllNoumsPendingInvites;
