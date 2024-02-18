import { useCallback, useMemo, useState, useEffect } from 'react';
import { useGetUserCampaignsQuery } from '@/apollo/graphql';
import { type ProjectNoumCampaign } from '@/apollo/generated/types';
import { transformCampaign } from '@/features/noumCampaigns/utils';

const DEFAULT_PAGE_SIZE = 10;

export const useCampaigns = (
  spaceId: string,
  isInfinite?: boolean,
  pageSize = DEFAULT_PAGE_SIZE,
) => {
  const [infiniteState, setInfiniteState] = useState<
    'loading' | 'hasNextPage' | 'end' | 'end-with-force'
  >('hasNextPage');
  const { data, loading, error, fetchMore, refetch } = useGetUserCampaignsQuery(
    {
      variables: {
        limit: isInfinite ? pageSize : DEFAULT_PAGE_SIZE,
        offset: 0,
        filter: {
          spaceId,
        },
      },
      skip: !spaceId,
    },
  );

  const currentCampaigns = useMemo(() => {
    const campaigns = data?.getUserCampaigns?.data as ProjectNoumCampaign[];
    return campaigns?.map((campaign) => transformCampaign(campaign));
  }, [data]);

  const fetchMoreCampaigns = useCallback(async () => {
    const result = await fetchMore({
      variables: {
        limit: pageSize,
        offset: currentCampaigns?.length || 0,
      },
    });
    if ((result.data.getUserCampaigns?.data?.length || 0) < pageSize)
      setInfiniteState('end');
  }, [fetchMore, currentCampaigns, pageSize]);

  useEffect(() => {
    setInfiniteState(
      currentCampaigns && currentCampaigns?.length < pageSize
        ? 'end'
        : 'hasNextPage',
    );
  }, [currentCampaigns, pageSize]);

  useEffect(() => {
    refetch();
  }, [spaceId, refetch]);

  return {
    campaigns: currentCampaigns || [],
    loading,
    error,
    infiniteState,
    fetchMoreCampaigns,
    refetchCampaigns: refetch,
  };
};

export default useCampaigns;
