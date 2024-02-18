import { ConnectionType, NoumMemberStatus } from '@/apollo/generated/types';
import { useCallback, useMemo } from 'react';
import { Infinite, getBottomStatusFromQuery } from '@/components/Infinite';
import {
  useAllNoumsPendingInvites,
  useAllNoumsPendingRequests,
} from '@/features/noums/hooks/noums';
import { UserUtil } from '@/utils/user';
import { RequestsAndInvitesListWrapper } from './styles';
import { type RequestsAndInvitesListProps } from './types';
import RequestsAndInvitesItemsV2 from './RequestsAndInvitesItemsV2';
import { PAGE_SIZE } from '../../constants';
import {
  ReceivedAndSent,
  RequestsAndInvites,
} from '../modals/RequestsAndInvitesModalV2/constants';

const RequestsAndInvitesListV2 = (
  props: RequestsAndInvitesListProps,
) => {
  const { typeId, statusId } = props;
  const isInvites = typeId === RequestsAndInvites.Invites;
  const isReceived = statusId === ReceivedAndSent.Received;
  const isRequests = typeId === RequestsAndInvites.Request;
  const requestStatus = isReceived
    ? NoumMemberStatus.Requested
    : NoumMemberStatus.Invited;

  const invitesStatus = isReceived
    ? ConnectionType.Received
    : ConnectionType.Sent;

  const {
    userMembers: requestedMembersData,
    networkStatus: requestedNetworkStatus,
    userMembersCount: requestedTotalCount,
    refetch: requestedMembersRefetch,
    fetchMoreMembers: requestedFetchMore,
    loading: requestedLoading,
  } = useAllNoumsPendingRequests(requestStatus, PAGE_SIZE, isInvites);

  const {
    items: invitesMembersData,
    refetch: invitesMembersRefetch,
    infinityFetch: invitesFetchMore,
    networkStatus: invitesNetworkStatus,
    totalCount: invtesTotalCount,
    loading: invitesLoading,
  } = useAllNoumsPendingInvites(invitesStatus, isRequests);

  const fetchMoreHandler = useCallback(() => {
    if (isInvites) {
      invitesFetchMore();
    } else {
      requestedFetchMore();
    }
  }, [isInvites, invitesFetchMore, requestedFetchMore]);

  const infiniteStatus = getBottomStatusFromQuery({
    networkStatus: isInvites ? invitesNetworkStatus : requestedNetworkStatus,
    currentCount: isInvites
      ? invitesMembersData?.length
      : requestedMembersData.length,
    totalCount: isInvites ? invtesTotalCount : requestedTotalCount,
  });

  const filteredInvitesMember = useMemo(
    () => invitesMembersData.filter((item) => !UserUtil.isInactive(item.user)),
    [invitesMembersData],
  );

  return (
    <RequestsAndInvitesListWrapper fullWidth scrollbarWidth={0}>
      <Infinite
        onFetchMore={fetchMoreHandler}
        status={infiniteStatus}
        width="100%"
        isSpinnerRelative
        disableFetchMoreWhileLoading
      >
        <RequestsAndInvitesItemsV2
          isInvite={isInvites}
          isReceived={isReceived}
          refetch={isInvites ? invitesMembersRefetch : requestedMembersRefetch}
          data={isInvites ? filteredInvitesMember : requestedMembersData}
          loading={requestedLoading || invitesLoading}
        />
      </Infinite>
    </RequestsAndInvitesListWrapper>
  );
};
export default RequestsAndInvitesListV2;
