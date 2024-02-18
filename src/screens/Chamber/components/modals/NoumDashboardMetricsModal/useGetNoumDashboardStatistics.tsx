import { useGetNoumConnectionsKpIsQuery } from '@/apollo/graphql';
import { type NoumKpiGranularity } from '@/apollo/generated/types';
import { type NoumDashboradTypeEnum } from './types';

export const useGetNoumDashboardStatistics = (
  noumId: string,
  dashboardType: NoumDashboradTypeEnum,
  granularity?: NoumKpiGranularity,
  dataStartTime?: string,
  dataEndTime?: string,
) => {
  const queryVariables = {
    noumId,
    from: dataStartTime,
    to: dataEndTime,
    granularity,
  };

  const {
    data: connectionsData,
    loading,
    error,
  } = useGetNoumConnectionsKpIsQuery({
    variables: queryVariables,
    fetchPolicy: 'cache-and-network',
  });

  return {
    statistics: connectionsData?.getNoumConnectionsKPIs,
    loading,
    error,
  };
};
