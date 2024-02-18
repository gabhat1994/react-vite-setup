import { useCallback, useState, useEffect, useMemo } from 'react';
import { useGetSpaceConnectionsV2Query } from '@/apollo/graphql';
import {
  ConnectionPermissionTypeEnum,
  ConnectionRequestTypeEnum,
  type SpaceConnection,
} from '@/apollo/generated/types';
import { cleanList } from '@/utils/list';

const DEFAULT_PAGE_SIZE = 10;

export const useConnections = (
  spaceId: string,
  isInfinite?: boolean,
  pageSize = DEFAULT_PAGE_SIZE,
) => {
  const [infiniteState, setInfiniteState] = useState<
    'loading' | 'hasNextPage' | 'end' | 'end-with-force'
  >('hasNextPage');

  const [approvedInfiniteState, setApprovedInfiniteState] = useState<
    'loading' | 'hasNextPage' | 'end' | 'end-with-force'
  >('hasNextPage');

  const [invitedInfiniteState, setInvitedInfiniteState] = useState<
    'loading' | 'hasNextPage' | 'end' | 'end-with-force'
  >('hasNextPage');

  const [connectionsData, setConnectionsData] = useState<
    SpaceConnection[] | undefined
  >([]);

  const [appConnectionsData, setAppConnectionsData] = useState<
    SpaceConnection[] | undefined
  >([]);

  const [invitedConnections, setInvitedConnections] = useState<
    SpaceConnection[] | undefined
  >([]);

  const [totalCount, setTotalCount] = useState(0);
  const [approvedTotalCount, setApprovedTotalCount] = useState(0);
  const [invitedTotalCount, setInvitedTotalCount] = useState(0);

  const { data, loading, error, fetchMore, refetch } =
    useGetSpaceConnectionsV2Query({
      variables: {
        limit: isInfinite ? pageSize : DEFAULT_PAGE_SIZE,
        offset: 0,
        spaceId,
      },
    });

  const {
    data: approvedConnectionsData,
    loading: approvedConnectionsLoading,
    error: approvedConnectionsError,
    fetchMore: approvedConnectionFetchMore,
    refetch: approvedConnectionFetchRefetch,
  } = useGetSpaceConnectionsV2Query({
    variables: {
      limit: isInfinite ? pageSize : DEFAULT_PAGE_SIZE,
      offset: 0,
      spaceId,
      status: ConnectionRequestTypeEnum.Approved,
    },
  });

  const {
    data: invitesData,
    loading: invitedConnectionsLoading,
    error: invitedConnectionsError,
    fetchMore: invitesFetchMore,
    refetch: refetchInvitedConnections,
  } = useGetSpaceConnectionsV2Query({
    variables: {
      limit: isInfinite ? pageSize : DEFAULT_PAGE_SIZE,
      offset: 0,
      spaceId,
      status: [
        ConnectionRequestTypeEnum.Approved,
        ConnectionRequestTypeEnum.Invited,
        ConnectionRequestTypeEnum.Declined,
      ],
    },
  });

  useEffect(() => {
    setConnectionsData(
      (data?.getSpaceConnectionsV2?.data as SpaceConnection[]) || [],
    );
    setTotalCount(data?.getSpaceConnectionsV2?.count || 0);
  }, [data]);

  useEffect(() => {
    setAppConnectionsData(
      (approvedConnectionsData?.getSpaceConnectionsV2
        ?.data as SpaceConnection[]) || [],
    );
    setApprovedTotalCount(
      approvedConnectionsData?.getSpaceConnectionsV2?.count || 0,
    );
  }, [approvedConnectionsData]);

  useEffect(() => {
    setInvitedConnections(
      (invitesData?.getSpaceConnectionsV2?.data as SpaceConnection[]) || [],
    );
    setInvitedTotalCount(invitesData?.getSpaceConnectionsV2?.count || 0);
  }, [invitesData]);

  const fetchMoreConnections = useCallback(async () => {
    const result = await fetchMore({
      variables: {
        limit: pageSize,
        offset: connectionsData?.length || 0,
      },
    });

    const currentFetchedConnections =
      (result?.data?.getSpaceConnectionsV2?.data as SpaceConnection[]) || [];
    const udpatedConnections = [
      ...(connectionsData || []),
      ...currentFetchedConnections,
    ];
    setConnectionsData(udpatedConnections);

    if ((currentFetchedConnections.length || 0) < pageSize)
      setInfiniteState('end');
  }, [fetchMore, connectionsData, pageSize]);

  const fetchMoreApprovedConnections = useCallback(async () => {
    const result = await approvedConnectionFetchMore({
      variables: {
        limit: pageSize,
        offset: appConnectionsData?.length || 0,
      },
    });

    const currentFetchedApprovedConnections =
      (result?.data?.getSpaceConnectionsV2?.data as SpaceConnection[]) || [];
    const udpatedApprovedConnections = [
      ...(appConnectionsData || []),
      ...currentFetchedApprovedConnections,
    ];
    setAppConnectionsData(udpatedApprovedConnections);
    if ((currentFetchedApprovedConnections.length || 0) < pageSize)
      setApprovedInfiniteState('end');
  }, [approvedConnectionFetchMore, appConnectionsData, pageSize]);

  const fetchMoreInvitedConnections = useCallback(async () => {
    const result = await invitesFetchMore({
      variables: {
        limit: pageSize,
        offset: invitedConnections?.length || 0,
      },
    });

    const currentFetchedInvitedConnections =
      (result?.data?.getSpaceConnectionsV2?.data as SpaceConnection[]) || [];
    const udpatedInvitedConnections = [
      ...(invitedConnections || []),
      ...currentFetchedInvitedConnections,
    ];
    setInvitedConnections(udpatedInvitedConnections);
    if ((currentFetchedInvitedConnections.length || 0) < pageSize)
      setInvitedInfiniteState('end');
  }, [invitesFetchMore, pageSize, invitedConnections]);

  const connections: SpaceConnection[] = useMemo(
    () =>
      cleanList(
        connectionsData?.filter(
          (item) =>
            item?.permission !== ConnectionPermissionTypeEnum.Disconnect,
        ),
      ),
    [connectionsData],
  );

  useEffect(() => {
    setInfiniteState(
      connectionsData && connectionsData?.length >= totalCount
        ? 'end'
        : 'hasNextPage',
    );
  }, [connectionsData, totalCount]);

  useEffect(() => {
    setApprovedInfiniteState(
      appConnectionsData && appConnectionsData?.length >= approvedTotalCount
        ? 'end'
        : 'hasNextPage',
    );
  }, [appConnectionsData, approvedTotalCount]);

  useEffect(() => {
    setInvitedInfiniteState(
      invitedConnections && invitedConnections?.length >= invitedTotalCount
        ? 'end'
        : 'hasNextPage',
    );
  }, [invitedConnections, invitedTotalCount]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    approvedConnectionFetchRefetch();
  }, [approvedConnectionFetchRefetch]);

  useEffect(() => {
    refetchInvitedConnections();
  }, [refetchInvitedConnections]);

  return {
    connectionsData,
    loading,
    error,
    infiniteState,
    fetchMoreConnections,
    refetchConnections: refetch,
    connections,
    appConnectionsData,
    approvedConnectionsLoading,
    approvedConnectionsError,
    approvedInfiniteState,
    fetchMoreApprovedConnections,
    approvedConnectionsRefetch: approvedConnectionFetchRefetch,

    invitedConnections,
    invitedConnectionsLoading,
    invitedConnectionsError,
    invitedInfiniteState,
    fetchMoreInvitedConnections,
    refetchInvitedConnections,
  };
};

export default useConnections;
