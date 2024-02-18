import Skeleton from 'react-loading-skeleton';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout/Stack';
import { useSkeletonIsLoadingContext } from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import { useDiscoveryTabContext } from '@/screens/Discovery/DiscoveryTabContext';
import SliderHeaderControls from './SliderHeaderControls';
import * as S from './styles';
import { type SliderHeaderProps } from './types';
import { RecommendedSectionHeader } from './styles';
import { RecommendedNoumsTabs } from './RecommendedTabs';

export const SliderHeader = ({
  title,
  description,
  showControls,
  hideShowAllButton,
  disableNext,
  disablePrev,
  showTabs,
  goNext,
  goPrevious,
  handleShowAllClick,
}: SliderHeaderProps) => {
  const { isLoading } = useSkeletonIsLoadingContext();
  const { isTabLoading } = useDiscoveryTabContext();

  const loading = isLoading && !isTabLoading;
  return (
    <S.SliderHeader
      data-testid="sliderheader"
      direction={showTabs ? 'column' : 'row'}
    >
      <S.SliderInfo showTabs={showTabs}>
        {loading ? (
          <Skeleton />
        ) : (
          <TSpan
            font="heading-xs-bold"
            colorToken="--text-body-header-neutral-default"
          >
            {title}
          </TSpan>
        )}
        <Spacer height={4} />
        {loading ? (
          <Skeleton />
        ) : (
          <TSpan font="body-l" colorToken="--text-body-neutral-default">
            {description}
          </TSpan>
        )}
      </S.SliderInfo>
      <RecommendedSectionHeader full={showTabs}>
        {showTabs && (loading ? <Skeleton /> : <RecommendedNoumsTabs />)}
        <SliderHeaderControls
          showControls={showControls}
          hideShowAllButton={hideShowAllButton}
          disableNext={disableNext}
          disablePrev={disablePrev}
          goNext={goNext}
          goPrevious={goPrevious}
          handleShowAllClick={handleShowAllClick}
        />
      </RecommendedSectionHeader>
    </S.SliderHeader>
  );
};
