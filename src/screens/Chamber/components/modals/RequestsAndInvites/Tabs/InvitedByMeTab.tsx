import {
  ConnectionRequestStatus,
  NoumMemberStatus,
} from '@/apollo/generated/types';
import { Infinite, getBottomStatusFromQuery } from '@/components/Infinite';
import { useRequestedConnectionsInfiniteData } from '@/features/noums/hooks';
import { useNoumMembersManagerList } from '@/features/noums/hooks/manageMembers';
import { useRequestedConnections } from '@/features/noums/hooks/spaceQuery';
import { useBreakpoints, useLaunchDarkly } from '@/hooks';
import { Stack } from '@/layout';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import InvitesOrMyRequestsList from '@/screens/Chamber/components/modals/RequestsAndInvites/InvitesOrMyRequestsList';
import { type InvitedByMeTabProps } from '@/screens/Chamber/components/modals/RequestsAndInvites/types';
import React, { useCallback, useMemo } from 'react';
import { SpaceUtils } from '@/utils/space';
import InvitesOrMyRequestsListV2 from '../InvitesOrMyRequestsListV2';
import { InviteNonNemberNoListNote } from '../components/InviteNonNemberNoListNote';

const PAGE_SIZE = 20;

const InvitedByMeTab: React.FC<InvitedByMeTabProps> = ({
  noumId,
  isChambersScreen,
  isNotPrivateNoum,
}) => {
  const { space, isOwner } = useNoumContext();
  const isMasterNoum = SpaceUtils.isMasterNoum(space);

  const {
    flags: { elementPermission },
  } = useLaunchDarkly();
  const { isMobile } = useBreakpoints();
  const { data, loading, refetch, fetchMore } = useRequestedConnections({
    limit: PAGE_SIZE,
    requestFrom: isChambersScreen || (isMasterNoum && isOwner) ? null : noumId,
    status: ConnectionRequestStatus.Invited,
  });
  const { infiniteData, infiniteState, infinityFetch } =
    useRequestedConnectionsInfiniteData({
      data,
      pageSize: PAGE_SIZE,
      fetchMore,
    });

  const {
    totalCount,
    membersData,
    networkStatus,
    loading: membersLoader,
    fetchMore: membersFetchMore,
    refetch: membersRefetch,
  } = useNoumMembersManagerList({
    noumId,
    rowsPerPage: PAGE_SIZE,
    defaultStatuses: [NoumMemberStatus.Invited],
  });

  const invitedMembers = useMemo(
    () =>
      elementPermission
        ? membersData
        : infiniteData?.requestedConnection?.data || [],
    [elementPermission, membersData, infiniteData?.requestedConnection?.data],
  );

  const currentCount = invitedMembers.length ?? 0;

  const fetchMoreHandler = useCallback(() => {
    if (elementPermission) {
      membersFetchMore();
    } else {
      infinityFetch();
    }
  }, [elementPermission, membersFetchMore, infinityFetch]);

  const infiniteStatus = elementPermission
    ? getBottomStatusFromQuery({
        networkStatus,
        totalCount,
        currentCount,
      })
    : infiniteState;

  return (
    <Stack fullWidth vertical justify="space-between">
      <Infinite
        onFetchMore={fetchMoreHandler}
        status={infiniteStatus}
        paddingRight={infiniteData ? '12px' : '0'}
        isSpinnerRelative
        width="100%"
        style={{
          overflowX: 'hidden',
          maxHeight: isMobile || isMasterNoum ? 'unset' : 325,
        }}
      >
        {elementPermission ? (
          <InvitesOrMyRequestsListV2
            connectionStatus={ConnectionRequestStatus.Invited}
            refetch={membersRefetch}
            data={membersData}
            loading={membersLoader}
          />
        ) : (
          <InvitesOrMyRequestsList
            isChambersScreen={isChambersScreen}
            isInvite
            refetch={refetch}
            chamberId={noumId}
            data={infiniteData}
            loading={loading}
            isNotPrivateNoum={isNotPrivateNoum}
            isModal={true}
          />
        )}
      </Infinite>
      {invitedMembers.length > 0 && !isMasterNoum && (
        <InviteNonNemberNoListNote />
      )}
    </Stack>
  );
};

export default InvitedByMeTab;
