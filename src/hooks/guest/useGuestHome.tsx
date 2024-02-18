import { useCallback, useMemo, useState, useEffect } from 'react';
import {
  type SpaceOutputFragment,
  useGetConnectedSpacesQuery,
} from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';
import { type Maybe, SortOperator } from '@/apollo/generated/types';

const sortOptions = {
  sort: {
    column: 'name',
    operator: SortOperator.Asc,
  },
};

export const useGuestHome = (isInfinite?: boolean, pageSize = 0) => {
  const { user, isUnauthenticated } = useAuth();
  const [infiniteState, setInfiniteState] = useState<
    'loading' | 'hasNextPage' | 'end' | 'end-with-force'
  >('hasNextPage');
  const { data, loading, error, fetchMore, refetch } =
    useGetConnectedSpacesQuery({
      fetchPolicy: 'cache-and-network',
      skip: !user?._id || isUnauthenticated,
      variables: {
        uid: user?._id || '',
        limit: isInfinite ? pageSize : 12,
        offset: 0,
        ...sortOptions,
      },
    });

  const noums = useMemo(
    () => data?.getConnectedSpaces?.data as Maybe<SpaceOutputFragment>[],
    [data],
  );

  const fetchMoreNoums = useCallback(async () => {
    const result = await fetchMore({
      variables: {
        uid: user?._id || '',
        limit: pageSize,
        offset: noums?.length || 0,
        ...sortOptions,
      },
    });
    if ((result.data.getConnectedSpaces?.data?.length || 0) < pageSize)
      setInfiniteState('end');
  }, [fetchMore, noums?.length, pageSize, user?._id]);

  useEffect(() => {
    setInfiniteState(noums && noums?.length < pageSize ? 'end' : 'hasNextPage');
  }, [noums, pageSize]);

  return {
    noums,
    loading,
    error,
    infiniteState,
    fetchMoreNoums,
    refetchNoums: refetch,
  };
};

export default useGuestHome;
