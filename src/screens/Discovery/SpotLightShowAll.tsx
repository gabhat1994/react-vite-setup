import { DiscoveryCategoryEnum } from '@/components/ChamberBox/types';
import { useDiscoverySpotLightChambers } from '@/features/discovery/hooks';
import ShowAll from '@/screens/Discovery/ShowAll';

const NOUMS_PER_PAGE = 20;

const SpotLightShowAll = (): JSX.Element => {
  const { noums, loading, infiniteState, fetchMoreNoums } =
    useDiscoverySpotLightChambers({}, true, NOUMS_PER_PAGE);

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

export default SpotLightShowAll;
