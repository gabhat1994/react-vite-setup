import { NoumMemberStatus } from '@/apollo/generated/types';
import { useGetNoumMembersCountQuery } from '@/apollo/graphql';

interface CountNoumMembers {
  noumId?: string;
}

export function useNoumMembersCounts({ noumId }: CountNoumMembers) {
  const PAGE_SIZE = 1;
  const { data: connectedCountData, loading: membersConnectedLoading } =
    useGetNoumMembersCountQuery({
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      variables: {
        noumId: noumId!,
        input: {
          offset: 0,
          limit: PAGE_SIZE,
          statuses: [NoumMemberStatus.Connected],
        },
      },
      skip: !noumId,
    });

  const { data: requestedCountData, loading: membersRequestedLoading } =
    useGetNoumMembersCountQuery({
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      variables: {
        noumId: noumId!,
        input: {
          offset: 0,
          limit: PAGE_SIZE,
          statuses: [NoumMemberStatus.Requested],
        },
      },
      skip: !noumId,
    });

  const { data: invitedCountData, loading: membersInvitedLoading } =
    useGetNoumMembersCountQuery({
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      variables: {
        noumId: noumId!,
        input: {
          offset: 0,
          limit: PAGE_SIZE,
          statuses: [NoumMemberStatus.Invited],
        },
      },
      skip: !noumId,
    });

  const membersConnectedCounts =
    connectedCountData?.getSpaceById?.members?.count ?? 0;
  const membersRequestedCounts =
    requestedCountData?.getSpaceById?.members?.count ?? 0;
  const membersInvitedCounts =
    invitedCountData?.getSpaceById?.members?.count ?? 0;

  return {
    membersConnectedCounts,
    membersRequestedCounts,
    membersInvitedCounts,
    membersConnectedLoading,
    membersRequestedLoading,
    membersInvitedLoading,
  };
}
