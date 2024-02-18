import { useCallback, useMemo } from 'react';
import { useGetNoumReferencesQuery } from '@/apollo/graphql';
import { type NoumReferenceStatus } from '@/apollo/generated/types';
import { type BottomStatus as InfiniteStatus } from '@/components/Infinite/types';
import { cleanList } from '@/utils/list';

const DEFAULT_PAGE_SIZE = 10;

export const useGetNoumReferences = (
  experienceId: string,
  status: NoumReferenceStatus | NoumReferenceStatus[],
  isInfinite?: boolean,
  pageSize = DEFAULT_PAGE_SIZE,
) => {
  const { data, loading, error, fetchMore, refetch } =
    useGetNoumReferencesQuery({
      variables: {
        experienceId,
        status,
        limit: isInfinite ? pageSize : DEFAULT_PAGE_SIZE,
      },
      fetchPolicy: 'cache-and-network',
      skip: !experienceId,
    });

  const { references, count, totalCount } = useMemo(
    () => ({
      references: data?.getNoumReferences?.data || [],
      count: (data?.getNoumReferences?.data || []).length,
      totalCount: data?.getNoumReferences?.count || 0,
    }),
    [data],
  );

  const infiniteState: InfiniteStatus =
    count < totalCount ? 'hasNextPage' : 'end';

  const fetchMoreReferences = useCallback(async () => {
    try {
      await fetchMore({
        variables: { limit: pageSize, offset: count },
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }, [count, fetchMore, pageSize]);

  const refetchReferences = useCallback(async () => {
    try {
      await refetch();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }, [refetch]);

  return {
    references: cleanList(references) || [],
    loading,
    error,
    infiniteState,
    fetchMoreReferences,
    refetchReferences,
  };
};

export default useGetNoumReferences;
