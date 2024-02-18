import { useCallback, useState, useEffect } from 'react';
import {
  type SpaceOutputFragment,
  useGetFeaturedNoumsQuery,
} from '@/apollo/graphql';
import { type Maybe } from '@/apollo/generated/types';

export const useDiscoveryFeaturedNoums = (
  isInfinite?: boolean,
  pageSize = 0,
) => {
  const [infiniteState, setInfiniteState] = useState<
    'loading' | 'hasNextPage' | 'end' | 'end-with-force'
  >('hasNextPage');
  const [currentNoums, setCurrentNoums] = useState<
    Maybe<SpaceOutputFragment>[]
  >([]);
  const [totalCount, setTotalCount] = useState(0);
  const { data, loading, error, fetchMore, refetch } = useGetFeaturedNoumsQuery(
    {
      variables: {
        limit: isInfinite ? pageSize : 12,
        offset: 0,
      },
    },
  );

  useEffect(() => {
    setCurrentNoums(data?.getFeaturedNoums?.data || []);
    setTotalCount(data?.getFeaturedNoums?.count || 0);
  }, [data]);

  const fetchMoreNoums = useCallback(async () => {
    const result = await fetchMore({
      variables: {
        limit: pageSize,
        offset: currentNoums?.length || 0,
      },
    });
    const currentFetchedNoums = result?.data?.getFeaturedNoums?.data || [];
    const udpatedNoums = [...currentNoums, ...currentFetchedNoums];
    setCurrentNoums(udpatedNoums);
    if ((currentFetchedNoums.length || 0) < pageSize) setInfiniteState('end');
  }, [fetchMore, currentNoums, pageSize]);

  useEffect(() => {
    setInfiniteState(
      currentNoums && currentNoums?.length >= totalCount
        ? 'end'
        : 'hasNextPage',
    );
  }, [currentNoums, totalCount]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    noums: currentNoums,
    loading,
    error,
    infiniteState,
    fetchMoreNoums,
    refetchFeaturedNoums: refetch,
  };
};

export default useDiscoveryFeaturedNoums;
