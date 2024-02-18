import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import ListLayout from '@/layout/ListLayout';
import ROUTES from '@/constants/routes';
import {
  useDiscoveryMyCircleNoums,
  useDiscoveryPopularNoums,
  useDiscoveryRecommendedNoums,
  useDiscoveryFeaturedNoums,
} from '@/features/discovery/hooks';
import { DiscoveryCategoryEnum } from '@/components/ChamberBox/types';
import { useLaunchDarkly } from '@/hooks';
import { NOUMSlider } from '@/features/discovery/components';
import {
  DiscoveryTabProvider,
  useDiscoveryTabContext,
} from './DiscoveryTabContext';
import { Container } from './styles';

const Discovery = () => {
  const { t } = useTranslation();
  const { recommendedTab, setIsTabLoading } = useDiscoveryTabContext();
  const {
    noums: recommendedNoums,
    loading: recommendedNoumsLoading,
    tabLoading,
  } = useDiscoveryRecommendedNoums({ tabId: recommendedTab });
  const { noums: featuredNoums, loading: featuredNoumsLoading } =
    useDiscoveryFeaturedNoums();
  const { noums: myCircleNoums, loading: myCircleNoumsLoading } =
    useDiscoveryMyCircleNoums();
  const { noums: popularNoums, loading: popularNoumsLoading } =
    useDiscoveryPopularNoums();

  useEffect(() => {
    setIsTabLoading(tabLoading);
  }, [setIsTabLoading, tabLoading]);

  const isFeaturedNoumsVisible =
    featuredNoumsLoading || Boolean(featuredNoums.length);
  const isMyCircleNoumsVisible =
    myCircleNoumsLoading || Boolean(myCircleNoums.length);
  const isPopularNoumsVisible =
    popularNoumsLoading || Boolean(popularNoums.length);
  const { flags } = useLaunchDarkly();
  const { discoveryNewNoums } = flags;

  return (
    <ListLayout type="Discovery">
      {discoveryNewNoums && (
        <Container>
          <NOUMSlider
            title={t('noumena.discovery.recommended.title')}
            category={DiscoveryCategoryEnum.Recommended}
            route={ROUTES.DISCOVERY_RECOMMENDED_SHOW_ALL}
            cardItems={recommendedNoums}
            loading={recommendedNoumsLoading}
            description={t('noumena.discovery.recommended.description')}
          />
        </Container>
      )}
      {isFeaturedNoumsVisible && (
        <Container>
          <NOUMSlider
            title={t('noumena.discovery.featured.title')}
            category={DiscoveryCategoryEnum.Featured}
            route={ROUTES.DISCOVERY_FEATURED_SHOW_ALL}
            cardItems={featuredNoums}
            loading={featuredNoumsLoading}
            description={t('noumena.discovery.featured.description')}
          />
        </Container>
      )}
      {isMyCircleNoumsVisible && (
        <Container>
          <NOUMSlider
            title={t('noumena.discovery.mycircle.title')}
            category={DiscoveryCategoryEnum.MyCircle}
            route={ROUTES.DISCOVERY_MYCIRCLE_SHOW_ALL}
            cardItems={myCircleNoums}
            loading={myCircleNoumsLoading}
            description={t('noumena.discovery.mycircle.description')}
          />
        </Container>
      )}
      {isPopularNoumsVisible && (
        <Container>
          <NOUMSlider
            title={t('noumena.discovery.popular.title')}
            category={DiscoveryCategoryEnum.Popular}
            route={ROUTES.DISCOVERY_POPULAR_SHOW_ALL}
            cardItems={popularNoums}
            loading={popularNoumsLoading}
            description={t('noumena.discovery.popular.description')}
          />
        </Container>
      )}
    </ListLayout>
  );
};

export default () => (
  <DiscoveryTabProvider>
    <Discovery />
  </DiscoveryTabProvider>
);
