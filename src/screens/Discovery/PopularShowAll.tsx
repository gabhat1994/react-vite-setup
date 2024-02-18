import { DiscoveryCategoryEnum } from '@/components/ChamberBox/types';
import ShowAll from '@/screens/Discovery/ShowAll';
import { useDiscoveryPopularNoums } from '@/features/discovery/hooks';

const NOUMS_PER_PAGE = 20;

const PopularShowAll = (): JSX.Element => {
  const { noums, loading, infiniteState, fetchMoreNoums } =
    useDiscoveryPopularNoums(true, NOUMS_PER_PAGE);

  return (
    <ShowAll
      noums={noums}
      loading={loading}
      infiniteState={infiniteState}
      fetchMoreNoums={fetchMoreNoums}
      category={DiscoveryCategoryEnum.Popular}
    />
  );
};

export default PopularShowAll;
