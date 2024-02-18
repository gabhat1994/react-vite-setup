import { useCallback, useEffect, useState } from 'react';
import { useReceivedConnections } from '@/features/noums/hooks/spaceQuery';
import RequestList from '@/screens/Chamber/components/RightPanel/elements/ReceivedRequests/RequestList';
import { Infinite, getBottomStatusFromQuery } from '@/components/Infinite';
import { type ReceivedConnectionRequestQuery } from '@/apollo/graphql';
import { useLaunchDarkly, useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import { useNoumMembersManagerList } from '@/features/noums/hooks/manageMembers';
import { PAGE_SIZE } from '@/screens/Chambers/constants';
import { NoumMemberStatus } from '@/apollo/generated/types';
import { type ReceivedRequestsTabProps } from '../types';
import RecievedRequestListV2 from '../../../RightPanel/elements/ReceivedRequests/ReceivedRequestListV2';

const ReceivedRequestsTab = ({
  noumId,
  isChambersScreen,
  refetchReceivedRequests,
}: ReceivedRequestsTabProps) => {
  const pageSize = 10;
  const { data, refetch, loading, fetchMore } = useReceivedConnections(
    isChambersScreen
      ? { limit: pageSize }
      : { spaceId: noumId, limit: pageSize },
  );
  const {
    flags: { elementPermission },
  } = useLaunchDarkly();
  const { width } = useWindowDimensions();
  const isMobile = width < breakpoints.TABLET;

  const {
    currentCount: membersCurrentCount,
    totalCount,
    membersData,
    networkStatus,
    loading: membersLoader,
    fetchMore: membersFetchMore,
    refetch: membersRefetch,
  } = useNoumMembersManagerList({
    noumId: noumId ?? '',
    rowsPerPage: PAGE_SIZE,
    defaultStatuses: [NoumMemberStatus.Requested],
  });

  const [infiniteData, setInfiniteData] = useState<
    ReceivedConnectionRequestQuery | undefined
  >(undefined);

  const [infiniteState, setInfiniteState] = useState<
    'loading' | 'hasNextPage' | 'end' | 'end-with-force'
  >('hasNextPage');

  const infinityFetch = useCallback(async () => {
    if (!data?.receivedConnectionRequest?.data) return;

    const result = await fetchMore({
      variables: {
        limit: pageSize,
        offset: infiniteData?.receivedConnectionRequest?.data?.length || 0,
      },
    });
    if (result.data?.receivedConnectionRequest?.data) {
      const tempData = [
        ...(infiniteData?.receivedConnectionRequest?.data || []),
        ...result.data.receivedConnectionRequest.data,
      ];
      setInfiniteData({
        receivedConnectionRequest: {
          data: tempData,
        },
      });
    }
    if (
      (result.data?.receivedConnectionRequest?.data?.length || 0) < pageSize
    ) {
      setInfiniteState('end');
    }
  }, [
    pageSize,
    setInfiniteData,
    data?.receivedConnectionRequest?.data,
    fetchMore,
    infiniteData?.receivedConnectionRequest?.data,
  ]);

  useEffect(() => {
    if (data?.receivedConnectionRequest?.data) {
      setInfiniteData(data);
      setInfiniteState(
        data?.receivedConnectionRequest?.data &&
          data?.receivedConnectionRequest?.data.length < pageSize
          ? 'end'
          : 'hasNextPage',
      );
    }
  }, [data, data?.receivedConnectionRequest?.data, pageSize, setInfiniteData]);

  const onRefetch = () => {
    if (refetchReceivedRequests) refetchReceivedRequests();
    refetch();
  };

  const invitedMembers = elementPermission
    ? membersData
    : infiniteData?.receivedConnectionRequest?.data || [];

  const currentCount = elementPermission
    ? membersCurrentCount
    : invitedMembers?.length;

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
    <Infinite
      onFetchMore={fetchMoreHandler}
      status={infiniteStatus}
      style={{
        paddingLeft: isMobile ? 16 : 0,
        paddingRight: isMobile ? 16 : infiniteStatus ? 12 : 0,
        overflowX: 'hidden',
      }}
      isSpinnerRelative
      width="100%"
    >
      {elementPermission ? (
        <RecievedRequestListV2
          refetch={membersRefetch}
          data={membersData}
          loading={membersLoader}
        />
      ) : (
        <RequestList
          showCategory
          refetchReceivedRequests={onRefetch}
          chamberId={noumId}
          data={infiniteData}
          loading={loading}
          isModal
        />
      )}
    </Infinite>
  );
};

export default ReceivedRequestsTab;
