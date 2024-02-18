import {
  NoumConnectionsWithinTimeframeType,
  type Maybe,
} from '@/apollo/generated/types';
import {
  type SpaceOutputFragment,
  useGetNoumConnectionsWithinTimeframeLazyQuery,
} from '@/apollo/graphql';
import { NetworkStatus } from '@apollo/client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { type DateRange } from 'react-day-picker';
import { NoumDashboardMetricsModalTabEnum } from './types';

export const useNoumDashboardListsHelper = (
  noumId: string,
  selectedTab: string,
  dateRange: DateRange,
) => {
  const connectionType = useMemo(
    () =>
      selectedTab === NoumDashboardMetricsModalTabEnum.Connected
        ? NoumConnectionsWithinTimeframeType.Connected
        : selectedTab === NoumDashboardMetricsModalTabEnum.Disconnected
        ? NoumConnectionsWithinTimeframeType.Disconnected
        : null,
    [selectedTab],
  );
  const PAGE_SIZE = 10;
  const [connections, setConnections] = useState<Maybe<SpaceOutputFragment>[]>(
    [],
  );
  const [
    getConnections,
    {
      data: connectionsData,
      networkStatus: connectionsNetworkStatus,
      loading: loadingConnections,
      error: errorConnections,
      fetchMore: fetchMoreConnections,
    },
  ] = useGetNoumConnectionsWithinTimeframeLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (connectionsData?.getNoumConnectionsWithinTimeframe?.data) {
      setConnections(connectionsData?.getNoumConnectionsWithinTimeframe?.data);
    }
  }, [connectionsData]);

  const summary = useMemo(() => {
    let summaryData: {
      totalCount?: number | null;
      networkStatus: NetworkStatus;
      loading?: boolean;
    } = { totalCount: 0, networkStatus: NetworkStatus.ready, loading: false };
    switch (selectedTab) {
      case NoumDashboardMetricsModalTabEnum.Connected:
      case NoumDashboardMetricsModalTabEnum.Disconnected:
      default:
        summaryData = {
          ...summaryData,
          totalCount: connectionsData?.getNoumConnectionsWithinTimeframe?.count,
          networkStatus: connectionsNetworkStatus,
          loading: loadingConnections,
        };
        break;
    }
    return summaryData;
  }, [
    connectionsData?.getNoumConnectionsWithinTimeframe?.count,
    connectionsNetworkStatus,
    loadingConnections,
    selectedTab,
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
      selectedTab === NoumDashboardMetricsModalTabEnum.Connected ||
      selectedTab === NoumDashboardMetricsModalTabEnum.Disconnected
        ? connections
        : [];
    return selectedTabData;
  }, [selectedTab, connections]);

  const fetchMore = useCallback(async () => {
    if (currentData && totalCount <= currentData?.length) return;
    let res = null;
    switch (selectedTab) {
      case NoumDashboardMetricsModalTabEnum.Connected:
      case NoumDashboardMetricsModalTabEnum.Disconnected:
      default:
        res = await fetchMoreConnections({
          variables: {
            spaceId: noumId,
            limit: PAGE_SIZE,
            offset: connections?.length,
            from: dateRange.from?.toISOString(),
            to: dateRange.to?.toISOString(),
            connectionType,
          },
        });
        setConnections([
          ...currentData,
          ...(res.data?.getNoumConnectionsWithinTimeframe?.data || []),
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
    dateRange.from,
    dateRange.to,
    connectionType,
  ]);

  useEffect(() => {
    if (noumId) {
      switch (selectedTab) {
        case NoumDashboardMetricsModalTabEnum.Connected:
        case NoumDashboardMetricsModalTabEnum.Disconnected:
          getConnections({
            variables: {
              noumId,
              from: dateRange.from?.toISOString(),
              to: dateRange.to?.toISOString(),
              limit: PAGE_SIZE,
              offset: 0,
              connectionType,
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
    dateRange.from,
    dateRange.to,
    connectionType,
  ]);

  return {
    currentData,
    totalCount,
    loading,
    networkStatus,
    error: errorConnections,
    fetchMore,
  };
};
