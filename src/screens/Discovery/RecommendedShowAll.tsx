import { DiscoveryCategoryEnum } from '@/components/ChamberBox/types';
import { useDiscoveryRecommendedNoums } from '@/features/discovery/hooks';
import ShowAll from '@/screens/Discovery/ShowAll';
import {
  DiscoveryTabProvider,
  useDiscoveryTabContext,
} from './DiscoveryTabContext';

const NOUMS_PER_PAGE = 20;

const RecommendedShowAll = (): JSX.Element => {
  const { recommendedTab } = useDiscoveryTabContext();
  const { noums, loading, infiniteState, fetchMoreNoums } =
    useDiscoveryRecommendedNoums({
      isInfinite: true,
      pageSize: NOUMS_PER_PAGE,
      tabId: recommendedTab,
    });

  return (
    <ShowAll
      showTabs
      noums={noums}
      loading={loading}
      infiniteState={infiniteState}
      fetchMoreNoums={fetchMoreNoums}
      category={DiscoveryCategoryEnum.Recommended}
    />
  );
};

export default () => (
  <DiscoveryTabProvider>
    <RecommendedShowAll />
  </DiscoveryTabProvider>
);
