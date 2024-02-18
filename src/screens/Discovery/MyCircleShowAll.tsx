import { DiscoveryCategoryEnum } from '@/components/ChamberBox/types';
import { useDiscoveryMyCircleNoums } from '@/features/discovery/hooks';
import ShowAll from '@/screens/Discovery/ShowAll';

const NOUMS_PER_PAGE = 20;

const MyCircleShowAll = (): JSX.Element => {
  const { noums, loading, infiniteState, fetchMoreNoums } =
    useDiscoveryMyCircleNoums(true, NOUMS_PER_PAGE);

  return (
    <ShowAll
      noums={noums}
      loading={loading}
      infiniteState={infiniteState}
      fetchMoreNoums={fetchMoreNoums}
      category={DiscoveryCategoryEnum.MyCircle}
    />
  );
};

export default MyCircleShowAll;
