import {
  type Maybe,
  SortOperator,
  SpaceTypeEnum,
} from '@/apollo/generated/types';
import {
  type SpaceOutputFragment,
  useGetConnectedSpacesLazyQuery,
  useGetNoumConnectedMembersLazyQuery,
  useGetNoumLinkedNoumsLazyQuery,
  useGetSpaceFollowersLazyQuery,
  useGetUserNoumsLazyQuery,
} from '@/apollo/graphql';
import { NetworkStatus } from '@apollo/client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ConnectionDetailModalTabEnum } from './types';

export const useConnectionDetailsHelper = (
  noumId: string,
  selectedTab: string,
  noumLinkId?: string,
  userId?: string | null,
) => {
  const PAGE_SIZE = 10;
  const [connections, setConnections] = useState<Maybe<SpaceOutputFragment>[]>(
    [],
  );
  const [followers, setFollowers] = useState<Maybe<SpaceOutputFragment>[]>([]);
  const [linkedNoums, setLinkedNoums] = useState<Maybe<SpaceOutputFragment>[]>(
    [],
  );
  const [userNoums, setUserNoums] = useState<Maybe<SpaceOutputFragment>[]>([]);
  const [connectedProjects, setConnectedProjects] = useState<
    Maybe<SpaceOutputFragment>[]
  >([]);
  const [
    getConnections,
    {
      data: connectionsData,
      networkStatus: connectionsNetworkStatus,
      loading: loadingConnections,
      error: errorConnections,
      fetchMore: fetchMoreConnections,
    },
  ] = useGetNoumConnectedMembersLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [
    getFollowers,
    {
      data: followersData,
      loading: loadingFollowers,
      networkStatus: followersNetworkStatus,
      error: errorFollowers,
      fetchMore: fetchMoreFollowers,
    },
  ] = useGetSpaceFollowersLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [
    getLinkedNoums,
    {
      data: linkedNoumsData,
      networkStatus: linkedNoumsNetworkStatus,
      loading: loadingLinkedNoums,
      error: errorLinkedNoums,
      fetchMore: fetchMoreLinkedNoums,
    },
  ] = useGetNoumLinkedNoumsLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [
    getConnectedProjectData,
    {
      data: connectedProjectsData,
      networkStatus: connectedProjectsNetworkStatus,
      loading: loadingConnectedProjects,
      error: errorConnectedProjects,
      fetchMore: fetchMoreConnectedProjects,
    },
  ] = useGetConnectedSpacesLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [
    getUserNoumsData,
    {
      data: userNoumsData,
      networkStatus: userNoumsNetworkStatus,
      loading: loadingUserNoums,
      error: errorUserNoums,
      fetchMore: fetchMoreUserNoums,
    },
  ] = useGetUserNoumsLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (connectionsData?.getNoumConnectedMembers?.data) {
      setConnections(connectionsData?.getNoumConnectedMembers?.data);
    }
    if (followersData?.getSpaceFollowers?.data) {
      setFollowers(followersData?.getSpaceFollowers?.data);
    }
    if (linkedNoumsData?.getNoumLinkedNoums?.data) {
      setLinkedNoums(linkedNoumsData?.getNoumLinkedNoums?.data);
    }
    if (connectedProjectsData?.getConnectedSpaces?.data) {
      setConnectedProjects(
        userId ? connectedProjectsData?.getConnectedSpaces?.data : [],
      );
    }
    if (userNoumsData?.getUserNoums?.data) {
      setUserNoums(userId ? userNoumsData?.getUserNoums?.data : []);
    }
  }, [
    connectionsData,
    followersData,
    linkedNoumsData,
    userId,
    connectedProjectsData,
    userNoumsData,
  ]);

  const summary = useMemo(() => {
    let summaryData: {
      totalCount?: number | null;
      networkStatus: NetworkStatus;
      loading?: boolean;
    } = { totalCount: 0, networkStatus: NetworkStatus.ready, loading: false };
    switch (selectedTab) {
      case ConnectionDetailModalTabEnum.Connections:
        summaryData = {
          ...summaryData,
          totalCount: connectionsData?.getNoumConnectedMembers?.count,
          networkStatus: connectionsNetworkStatus,
          loading: loadingConnections,
        };
        break;
      case ConnectionDetailModalTabEnum.Noums:
        summaryData = {
          ...summaryData,
          totalCount: linkedNoumsData?.getNoumLinkedNoums?.count,
          networkStatus: linkedNoumsNetworkStatus,
          loading: loadingLinkedNoums,
        };
        break;
      case ConnectionDetailModalTabEnum.ProjectSpaces:
        summaryData = {
          ...summaryData,
          totalCount: connectedProjectsData?.getConnectedSpaces?.count,
          networkStatus: connectedProjectsNetworkStatus,
          loading: loadingConnectedProjects,
        };
        break;
      case ConnectionDetailModalTabEnum.OwnedNoums:
        summaryData = {
          ...summaryData,
          totalCount: userNoumsData?.getUserNoums?.count,
          networkStatus: userNoumsNetworkStatus,
          loading: loadingUserNoums,
        };
        break;
      case ConnectionDetailModalTabEnum.Followers:
      default:
        summaryData = {
          ...summaryData,
          totalCount: followersData?.getSpaceFollowers?.count,
          networkStatus: followersNetworkStatus,
          loading: loadingFollowers,
        };
        break;
    }
    return summaryData;
  }, [
    connectedProjectsData?.getConnectedSpaces?.count,
    connectedProjectsNetworkStatus,
    connectionsData?.getNoumConnectedMembers?.count,
    connectionsNetworkStatus,
    followersData?.getSpaceFollowers?.count,
    followersNetworkStatus,
    linkedNoumsData?.getNoumLinkedNoums?.count,
    linkedNoumsNetworkStatus,
    loadingConnectedProjects,
    loadingConnections,
    loadingFollowers,
    loadingLinkedNoums,
    loadingUserNoums,
    selectedTab,
    userNoumsData?.getUserNoums?.count,
    userNoumsNetworkStatus,
  ]);

  const networkStatus = useMemo(
    () => summary?.networkStatus,
    [summary?.networkStatus],
  );

  const totalCount = useMemo(
    () => summary?.totalCount || 0,
    [summary?.totalCount],
  );

  const loading = useMemo(() => summary.loading, [summary.loading]);

  const currentData = useMemo(() => {
    const selectedTabData =
      (selectedTab === ConnectionDetailModalTabEnum.Noums
        ? linkedNoums
        : selectedTab === ConnectionDetailModalTabEnum.Connections
        ? connections
        : selectedTab === ConnectionDetailModalTabEnum.ProjectSpaces
        ? connectedProjects
        : selectedTab === ConnectionDetailModalTabEnum.OwnedNoums
        ? userNoums
        : followers) || [];
    return selectedTabData;
  }, [
    selectedTab,
    linkedNoums,
    connections,
    connectedProjects,
    userNoums,
    followers,
  ]);

  const fetchMore = useCallback(async () => {
    if (currentData && totalCount <= currentData?.length) return;
    let res = null;
    switch (selectedTab) {
      case ConnectionDetailModalTabEnum.Connections:
        res = await fetchMoreConnections({
          variables: {
            spaceId: noumId,
            limit: PAGE_SIZE,
            offset: connections?.length,
            spaceType: SpaceTypeEnum.Home,
            sort: { column: 'approvedAt', operator: SortOperator.Desc },
          },
        });
        setConnections([
          ...currentData,
          ...(res.data?.getNoumConnectedMembers?.data || []),
        ]);
        break;
      case ConnectionDetailModalTabEnum.Followers:
        res = await fetchMoreFollowers({
          variables: {
            spaceId: noumId,
            limit: PAGE_SIZE,
            offset: followers?.length,
          },
        });
        setFollowers([
          ...currentData,
          ...(res.data?.getSpaceFollowers?.data || []),
        ]);
        break;
      case ConnectionDetailModalTabEnum.ProjectSpaces:
        res = await fetchMoreConnectedProjects({
          variables: {
            uid: userId,
            limit: PAGE_SIZE,
            offset: connectedProjects?.length,
            filter: {
              type: SpaceTypeEnum.Project,
            },
          },
        });
        setConnectedProjects([
          ...currentData,
          ...(res.data?.getConnectedSpaces?.data || []),
        ]);
        break;
      case ConnectionDetailModalTabEnum.OwnedNoums:
        res = await fetchMoreUserNoums({
          variables: {
            uid: userId,
            limit: PAGE_SIZE,
            offset: userNoums?.length,
          },
        });
        setUserNoums([...currentData, ...(res.data?.getUserNoums?.data || [])]);
        break;
      case ConnectionDetailModalTabEnum.Noums:
      default:
        res = await fetchMoreLinkedNoums({
          variables: {
            spaceId: noumLinkId,
            limit: PAGE_SIZE,
            offset: linkedNoums?.length,
          },
        });
        setLinkedNoums([
          ...currentData,
          ...(res.data?.getNoumLinkedNoums?.data || []),
        ]);
        break;
    }
  }, [
    currentData,
    totalCount,
    selectedTab,
    fetchMoreConnections,
    noumId,
    connections?.length,
    fetchMoreFollowers,
    followers?.length,
    fetchMoreConnectedProjects,
    userId,
    connectedProjects?.length,
    fetchMoreUserNoums,
    userNoums?.length,
    fetchMoreLinkedNoums,
    noumLinkId,
    linkedNoums?.length,
  ]);

  useEffect(() => {
    if (noumId || userId) {
      switch (selectedTab) {
        case ConnectionDetailModalTabEnum.Connections:
          if (noumId)
            getConnections({
              variables: {
                noumId,
                limit: PAGE_SIZE,
                offset: 0,
                sort: { column: 'approvedAt', operator: SortOperator.Desc },
              },
            });
          break;
        case ConnectionDetailModalTabEnum.Followers:
          if (noumId && noumId !== '') {
            getConnections({
              variables: {
                noumId,
                limit: 100,
                offset: 0,
              },
            });
            getFollowers({
              variables: {
                spaceId: noumId,
                limit: PAGE_SIZE,
                offset: 0,
              },
            });
          }
          break;
        case ConnectionDetailModalTabEnum.Noums:
          if (noumId) {
            getLinkedNoums({
              variables: {
                noumId,
                limit: PAGE_SIZE,
                offset: 0,
              },
            });
          }
          break;
        case ConnectionDetailModalTabEnum.ProjectSpaces:
          if (userId)
            getConnectedProjectData({
              variables: {
                uid: userId,
                limit: PAGE_SIZE,
                offset: 0,
                filter: {
                  type: SpaceTypeEnum.Project,
                },
                sort: {
                  column: 'name',
                  operator: SortOperator.Asc,
                },
              },
            });
          break;
        case ConnectionDetailModalTabEnum.OwnedNoums:
          if (userId)
            getUserNoumsData({
              variables: {
                uid: userId,
                limit: PAGE_SIZE,
                offset: 0,
              },
            });
          break;
        default:
          break;
      }
    }
  }, [
    selectedTab,
    noumId,
    getConnections,
    getFollowers,
    getLinkedNoums,
    noumLinkId,
    userId,
    getConnectedProjectData,
    getUserNoumsData,
  ]);

  return {
    currentData,
    totalCount,
    loading,
    networkStatus,
    error:
      errorConnections ||
      errorFollowers ||
      errorLinkedNoums ||
      errorConnectedProjects ||
      errorUserNoums,
    fetchMore,
  };
};
