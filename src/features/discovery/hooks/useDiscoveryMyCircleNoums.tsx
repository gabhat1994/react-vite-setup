import { useCallback, useMemo, useState, useEffect } from 'react';
import { type SpaceOutputFragment, useMyCircleQuery } from '@/apollo/graphql';
import {
  type Maybe,
  SpaceStatusEnum,
  SpaceTypeEnum,
} from '@/apollo/generated/types';

export const useDiscoveryMyCircleNoums = (
  isInfinite?: boolean,
  pageSize = 0,
) => {
  const [infiniteState, setInfiniteState] = useState<
    'loading' | 'hasNextPage' | 'end' | 'end-with-force'
  >('hasNextPage');
  const [currentNoums, setCurrentNoums] = useState<
    Maybe<SpaceOutputFragment>[]
  >([]);
  const { data, loading, error, fetchMore, refetch } = useMyCircleQuery({
    variables: {
      limit: isInfinite ? pageSize : 12,
      offset: 0,
    },
  });

  useEffect(() => {
    setCurrentNoums(data?.myCircle?.data || []);
  }, [data]);

  const filteredNoums = useMemo(
    () =>
      (currentNoums as Maybe<SpaceOutputFragment>[])?.filter(
        (space) =>
          (space?.type !== SpaceTypeEnum.Home &&
            space?.status === SpaceStatusEnum.Published) ||
          (space?.type === SpaceTypeEnum.Home &&
            space?.uid?.userStatus !== 'PENDING'),
      ),
    [currentNoums],
  );

  const fetchMoreNoums = useCallback(async () => {
    const result = await fetchMore({
      variables: {
        limit: pageSize,
        offset: currentNoums?.length || 0,
      },
    });
    const currentFetchedNoums = result?.data?.myCircle?.data || [];
    const udpatedNoums = [...currentNoums, ...currentFetchedNoums];
    setCurrentNoums(udpatedNoums);
    if ((result.data.myCircle?.data?.length || 0) < pageSize)
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

export default useDiscoveryMyCircleNoums;
