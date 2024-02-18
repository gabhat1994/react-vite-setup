import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { chunk } from 'lodash';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { useWindowDimensions } from '@/hooks/dimensions';
import { breakpoints } from '@/constants/devices';
import SkeletonLoaderProvider from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import { useDiscoveryTabContext } from '@/screens/Discovery/DiscoveryTabContext';
import { DiscoveryCategoryEnum } from '@/components/ChamberBox/types';
import SliderBody from './SliderBody';
import { SliderHeader } from './SliderHeader';
import { type SliderProps } from './types';
import {
  DESKTOP_ITEMS_COUNT,
  OTHER_VIEWS_COUNT,
  SLIDER_BREAK_POINT,
} from './constants';
import { getCurrentPageItems } from './utils';
import * as S from './styles';

export const NOUMSlider = ({
  title,
  description,
  cardItems = [],
  loading,
  route,
  category,
  hideShowAllButton,
}: SliderProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const windowSize = useWindowDimensions();
  const isMobile = windowSize.width < breakpoints.TABLET;

  const countPerPage =
    windowSize.width > SLIDER_BREAK_POINT
      ? DESKTOP_ITEMS_COUNT
      : isMobile
      ? cardItems.length
      : OTHER_VIEWS_COUNT;

  const carouselItems = useMemo(() => {
    const { items } = getCurrentPageItems(
      [...cardItems],
      page + 1,
      countPerPage,
    );
    return items;
  }, [cardItems, countPerPage, page]);

  const pageItems = chunk(cardItems, countPerPage);

  const pageSize = useMemo(() => {
    const { totalPages } = getCurrentPageItems(
      [...cardItems],
      page + 1,
      countPerPage,
    );
    return totalPages;
  }, [cardItems, countPerPage, page]);

  const pageArray = Array.from({ length: pageSize }, (_, i) => i);

  const isShowAllButtonOnMobile =
    windowSize.width < breakpoints.TABLET && (carouselItems?.length || 0) > 1;

  const { recommendedTab } = useDiscoveryTabContext();

  const showControls = windowSize.width >= breakpoints.TABLET && pageSize > 1;

  const handleShowAllClick = useCallback(() => {
    navigate(route, {
      replace: true,
      state: { title, description },
    });
  }, [title, description, navigate, route]);

  const goNext = useCallback(() => {
    if (page < pageSize) setPage(page + 1);
  }, [page, pageSize]);

  const goPrevious = useCallback(() => {
    if (page > 0) setPage(page - 1);
  }, [page]);

  const updateCurrentSlide = useCallback(
    (slide: number) => {
      if (page !== slide) {
        setPage(slide);
      }
    },
    [page],
  );

  useEffect(() => {
    setPage(0);
  }, [recommendedTab]);

  return (
    <SkeletonLoaderProvider isLoading={!carouselItems.length && loading}>
      <S.SliderWrapper data-testid="slider">
        <SliderHeader
          title={title}
          description={description}
          showControls={showControls}
          disableNext={page === pageSize - 1}
          disablePrev={page === 0}
          goNext={goNext}
          goPrevious={goPrevious}
          handleShowAllClick={handleShowAllClick}
          hideShowAllButton={hideShowAllButton}
          showTabs={category === DiscoveryCategoryEnum.Recommended}
        />
        <SliderBody
          isMobile={isMobile}
          pageItems={pageItems}
          page={page}
          pageArray={pageArray}
          category={category}
          carouselItems={carouselItems}
          countPerPage={countPerPage}
          updateCurrentSlide={updateCurrentSlide}
        />
        {isShowAllButtonOnMobile && (
          <S.MobileShowAllButton
            data-testid="mobile_show_all"
            size="large"
            onClick={handleShowAllClick}
          >
            {t('noumena.slider.show_all')}
          </S.MobileShowAllButton>
        )}
      </S.SliderWrapper>
    </SkeletonLoaderProvider>
  );
};
