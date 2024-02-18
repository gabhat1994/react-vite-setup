import { memo, useMemo, useState } from 'react';
import { breakpoints } from '@/constants/devices';
import { useLaunchDarkly } from '@/hooks/launchDarkly';
import { useWindowDimensions } from '@/hooks/dimensions';
import { Spacer } from '@/layout/Stack';
import {
  FinancialSolutionWrapper,
  Title,
  SubTitle,
  SubSubTitle,
  TitleWrapper,
  FinancialSolutionHeaderWrapper,
  ArticlesContainer,
  ArticlesContainerFlex,
} from './styles';
import { type Section01 } from '../../types';
import Article from './Article';
import SwiperComponent from './SwiperComponent';

function getSlidesPerView(width: number, isAppUiV2: boolean) {
  let slidesPerView = 1;
  if (isAppUiV2) {
    slidesPerView = 1.25;
    if (width >= breakpoints.TABLET && width < breakpoints.LAPTOP) {
      slidesPerView = 2.5;
    } else if (width >= breakpoints.LAPTOP && width < breakpoints.LAPTOP_SM) {
      slidesPerView = 1.75;
    } else if (width >= breakpoints.LAPTOP_SM && width < breakpoints.LAPTOP_L) {
      slidesPerView = 2.25;
    } else if (width >= breakpoints.LAPTOP_L) {
      slidesPerView = 2.75;
    }
  } else {
    slidesPerView = 1;
    // TODO: Simplyfiy responsiveness calculation
    // If we consider the standerd slasp in 'breakponits' object it looks odd for uneven margin between two slides
    if (width > breakpoints.LAPTOP_M) {
      slidesPerView = 2.4;
    } else if (
      width <= breakpoints.LAPTOP_M &&
      width > breakpoints.LAPTOP_M - 30
    ) {
      slidesPerView = 2.1;
    } else if (
      width <= breakpoints.LAPTOP_M - 30 &&
      width > breakpoints.LAPTOP_SM + 90
    ) {
      slidesPerView = 1.9;
    } else if (
      width <= breakpoints.LAPTOP_SM + 90 &&
      width > breakpoints.LAPTOP_SM + 30
    ) {
      slidesPerView = 1.7;
    } else if (
      width <= breakpoints.LAPTOP_SM + 30 &&
      width > breakpoints.LAPTOP_SM
    ) {
      slidesPerView = 1.6;
    } else if (
      width <= breakpoints.LAPTOP_SM &&
      width > breakpoints.LAPTOP + 100
    ) {
      slidesPerView = 1.5;
    } else if (
      width <= breakpoints.LAPTOP + 100 &&
      width > breakpoints.LAPTOP + 66
    ) {
      slidesPerView = 1.4;
    } else if (
      width <= breakpoints.LAPTOP + 66 &&
      width > breakpoints.TABLET_L
    ) {
      slidesPerView = 1.15;
    } else if (
      width <= breakpoints.TABLET_L &&
      width > breakpoints.TABLET + 152
    ) {
      slidesPerView = 2.3;
    } else if (
      width <= breakpoints.TABLET + 152 &&
      width > breakpoints.TABLET + 112
    ) {
      slidesPerView = 2.3;
    } else if (
      width <= breakpoints.TABLET + 112 &&
      width > breakpoints.TABLET + 52
    ) {
      slidesPerView = 2.1;
    } else if (
      width <= breakpoints.TABLET + 52 &&
      width > breakpoints.TABLET - 48
    ) {
      slidesPerView = 1.8;
    } else if (
      width <= breakpoints.TABLET - 48 &&
      width > breakpoints.MOBILE_MAX - 100
    ) {
      slidesPerView = 1.63;
    } else if (
      width <= breakpoints.MOBILE_MAX - 100 &&
      width > breakpoints.MOBILE_MAX - 148
    ) {
      slidesPerView = 1.51;
    } else if (
      width <= breakpoints.MOBILE_MAX - 148 &&
      width > breakpoints.MOBILE_L + 155
    ) {
      slidesPerView = 1.4;
    } else if (
      width <= breakpoints.MOBILE_L + 155 &&
      width > breakpoints.MOBILE_L + 75
    ) {
      slidesPerView = 1.1;
    } else if (
      width <= breakpoints.MOBILE_L + 75 &&
      width > breakpoints.MOBILE_L + 15
    ) {
      slidesPerView = 1;
    } else if (
      width <= breakpoints.MOBILE_L + 15 &&
      width > breakpoints.MOBILE_S
    ) {
      slidesPerView = 0.9;
    } else if (width <= breakpoints.MOBILE_S) {
      slidesPerView = 0.8;
    }
  }

  return slidesPerView;
}

type FinancialSolutionHeaderProps = {
  data: Section01 | undefined;
};

const FinancialSolutionHeader = (props: FinancialSolutionHeaderProps) => {
  const { data } = props;
  const [hidePadding, setHidePadding] = useState(false);
  const { width } = useWindowDimensions();
  const { flags } = useLaunchDarkly();

  const slidesPerView = getSlidesPerView(width, flags.newAppNavigation);

  const SwiperSlidesOptions = useMemo(
    () =>
      data?.Financial_Solutions?.map((item) => (
        <Article key={item.Article.id} data={item} />
      )),
    [data?.Financial_Solutions],
  );

  const handleHidePadding = (progress: number) => {
    if (progress > 0) {
      setHidePadding(true);
    } else {
      setHidePadding(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <FinancialSolutionWrapper>
        <TitleWrapper>
          <Title
            font="heading-m-bold"
            colorToken="--text-card-header-neutral-alt-default"
          >
            {data?.Title || ''}
          </Title>
          <Spacer height={8} />
          <SubTitle
            font="body-l"
            colorToken="--text-card-brand-secondary-default"
          >
            {data?.Description || ''}
          </SubTitle>
          <SubSubTitle
            font="footnote-bold"
            colorToken="--text-card-neutral-alt-default"
          >
            {data?.Subtitle || ''}
          </SubSubTitle>
        </TitleWrapper>
      </FinancialSolutionWrapper>
      <FinancialSolutionHeaderWrapper hidePadding={hidePadding}>
        <ArticlesContainer>
          <ArticlesContainerFlex>
            {!!SwiperSlidesOptions?.length && (
              <SwiperComponent
                SwiperSlidesOptions={SwiperSlidesOptions}
                slidesPerView={slidesPerView}
                handleHidePadding={handleHidePadding}
              />
            )}
          </ArticlesContainerFlex>
        </ArticlesContainer>
      </FinancialSolutionHeaderWrapper>
    </div>
  );
};

export default memo(FinancialSolutionHeader);
