import { DiscoveryCategoryEnum } from '@/components/ChamberBox/types';
import ShowAll from '@/screens/Discovery/ShowAll';
import { useDiscoveryFavouritesNoums } from '@/features/discovery/hooks';

const NOUMS_PER_PAGE = 20;

const FavouritesShowAll = (): JSX.Element => {
  const { noums, loading, infiniteState, fetchMoreNoums } =
    useDiscoveryFavouritesNoums(true, NOUMS_PER_PAGE);

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
