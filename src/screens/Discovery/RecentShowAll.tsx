import { DiscoveryCategoryEnum } from '@/components/ChamberBox/types';
import { useDiscoveryRecentNoums } from '@/features/discovery/hooks';
import ShowAll from '@/screens/Discovery/ShowAll';

const NOUMS_PER_PAGE = 20;

const FavouritesShowAll = (): JSX.Element => {
  const { noums, loading, infiniteState, fetchMoreNoums } =
    useDiscoveryRecentNoums(true, NOUMS_PER_PAGE);

  return (
    <ShowAll
      noums={noums}
      loading={loading}
      infiniteState={infiniteState}
      fetchMoreNoums={fetchMoreNoums}
      category={DiscoveryCategoryEnum.Spotlight}
    />
  );
};

export default FavouritesShowAll;
