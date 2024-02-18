import { DiscoveryCategoryEnum } from '@/components/ChamberBox/types';
import ShowAll from '@/screens/Discovery/ShowAll';
import { useDiscoveryFeaturedNoums } from '@/features/discovery/hooks';

const NOUMS_PER_PAGE = 20;

const FeaturedShowAll = (): JSX.Element => {
  const { noums, loading, infiniteState, fetchMoreNoums } =
    useDiscoveryFeaturedNoums(true, NOUMS_PER_PAGE);

  return (
    <ShowAll
      noums={noums}
      loading={loading}
      infiniteState={infiniteState}
      fetchMoreNoums={fetchMoreNoums}
      category={DiscoveryCategoryEnum.Featured}
    />
  );
};

export default FeaturedShowAll;
