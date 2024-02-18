import { useCallback, useMemo, useState, useEffect } from 'react';
import {
  type SpaceOutputFragment,
  useGetSpotLightChambersQuery,
} from '@/apollo/graphql';
import {
  type Maybe,
  SpaceStatusEnum,
  SpaceTypeEnum,
  type SpotlightChamberFilters,
} from '@/apollo/generated/types';

export const useDiscoverySpotLightChambers = (
  filter?: SpotlightChamberFilters,
  isInfinite?: boolean,
  pageSize = 0,
) => {
  const [infiniteState, setInfiniteState] = useState<
    'loading' | 'hasNextPage' | 'end' | 'end-with-force'
  >('hasNextPage');
  const { data, loading, error, fetchMore, refetch } =
    useGetSpotLightChambersQuery({
      variables: {
        filter,
        limit: isInfinite ? pageSize : 12,
        offset: 0,
      },
    });

  const currentNoums = useMemo(
    () => data?.getSpotLightChambers?.data as Maybe<SpaceOutputFragment>[],
    [data],
  );

  const filteredNoums = useMemo(
    () =>
      (
        data?.getSpotLightChambers?.data as Maybe<SpaceOutputFragment>[]
      )?.filter(
        (space) =>
          (space?.type !== SpaceTypeEnum.Home &&
            space?.status === SpaceStatusEnum.Published) ||
          (space?.type === SpaceTypeEnum.Home &&
            space?.uid?.userStatus !== 'PENDING'),
      ),
    [data],
  );

  const fetchMoreNoums = useCallback(async () => {
    const result = await fetchMore({
      variables: {
        limit: pageSize,
        offset: currentNoums?.length || 0,
      },
    });
    if ((result.data.getSpotLightChambers?.data?.length || 0) < pageSize)
      setInfiniteState('end');
  }, [fetchMore, currentNoums, pageSize]);

  useEffect(() => {
    setInfiniteState(
      currentNoums && currentNoums?.length < pageSize ? 'end' : 'hasNextPage',
    );
  }, [currentNoums, pageSize]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    noums: filteredNoums,
    loading,
    error,
    infiniteState,
    fetchMoreNoums,
    refetchRecommendedNoums: refetch,
  };
};

export default useDiscoverySpotLightChambers;
