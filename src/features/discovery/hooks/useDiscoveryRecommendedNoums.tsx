import { useCallback, useMemo, useState, useEffect } from 'react';
import {
  type SpaceOutputFragment,
  useGetRecommendedNoumsLazyQuery,
} from '@/apollo/graphql';
import {
  type InputMaybe,
  type Maybe,
  type SpaceCategoryFilter,
  SpaceStatusEnum,
  SpaceTypeEnum,
} from '@/apollo/generated/types';

export enum DiscoveryRecommendedNoumsTab {
  ALL = 'ALL',
  NOUM_SPACES = 'NOUM_SPACES',
  MEMBERS = 'MEMBERS',
}

type UseDiscoveryRecommendedNoumsOption = {
  isInfinite?: boolean;
  pageSize?: number;
  tabId: DiscoveryRecommendedNoumsTab;
};

export const useDiscoveryRecommendedNoums = ({
  isInfinite,
  pageSize = 0,
  tabId,
}: UseDiscoveryRecommendedNoumsOption) => {
  const [infiniteState, setInfiniteState] = useState<
    'loading' | 'hasNextPage' | 'end' | 'end-with-force'
  >('hasNextPage');
  const [tabLoading, setTabLoading] = useState(false);
  const [getRecommendedNoums, { data, loading, error, fetchMore, refetch }] =
    useGetRecommendedNoumsLazyQuery();

  const currentNoums = useMemo(
    () => data?.getRecommendedNoums?.data as Maybe<SpaceOutputFragment>[],
    [data],
  );

  const filteredNoums = useMemo(
    () =>
      (data?.getRecommendedNoums?.data as Maybe<SpaceOutputFragment>[])?.filter(
        (space) =>
          (space?.type !== SpaceTypeEnum.Home &&
            space?.status === SpaceStatusEnum.Published) ||
          (space?.type === SpaceTypeEnum.Home &&
            space?.uid?.userStatus !== 'PENDING'),
      ),
    [data],
  );

  useEffect(() => {
    (async () => {
      setTabLoading(true);
      let filter: InputMaybe<SpaceCategoryFilter> | undefined;
      switch (tabId) {
        case DiscoveryRecommendedNoumsTab.NOUM_SPACES:
          filter = { spaceType: SpaceTypeEnum.Project };
          break;
        case DiscoveryRecommendedNoumsTab.MEMBERS:
          filter = { spaceType: SpaceTypeEnum.Home };
          break;
        case DiscoveryRecommendedNoumsTab.ALL:
        default:
          filter = undefined;
      }
      await getRecommendedNoums({
        variables: {
          limit: isInfinite ? pageSize : 12,
          offset: 0,
          filter,
        },
      });
      setTabLoading(false);
    })();
  }, [getRecommendedNoums, isInfinite, pageSize, tabId]);

  const fetchMoreNoums = useCallback(async () => {
    const result = await fetchMore({
      variables: {
        limit: pageSize,
        offset: currentNoums?.length || 0,
      },
    });
    if (
      (result.data.getRecommendedNoums?.count || 0) <=
      (currentNoums?.length || 0)
    ) {
      setInfiniteState('end');
    }
  }, [fetchMore, currentNoums, pageSize]);

  useEffect(() => {
    setInfiniteState(
      (data?.getRecommendedNoums?.count || 0) <= (currentNoums?.length || 0)
        ? 'end'
        : 'hasNextPage',
    );
  }, [currentNoums, data?.getRecommendedNoums?.count, pageSize]);

  return {
    noums: filteredNoums,
    loading,
    tabLoading,
    error,
    infiniteState,
    fetchMoreNoums,
    refetchRecommendedNoums: refetch,
  };
};

export default useDiscoveryRecommendedNoums;
