import { useCallback, useMemo, useState } from 'react';
import { type UserOutput } from '@/apollo/generated/types';

type VideoMasonryCarouselProps = {
  videoCount: number;
  maxVideoPerPage: number;
  SpeakerItems?: UserOutput[] | null | undefined;
};

const DEFAULT_CAROUSEL_PAGE = 0;

export const useVideoMasonryCarousel = ({
  videoCount,
  maxVideoPerPage,
  SpeakerItems,
}: VideoMasonryCarouselProps) => {
  const totalPage = useMemo(
    () => Math.ceil(videoCount / maxVideoPerPage),
    [videoCount, maxVideoPerPage],
  );

  const [currentPage, setCurrentPage] = useState(DEFAULT_CAROUSEL_PAGE);

  const isDisablePrev = useMemo(
    () => currentPage === DEFAULT_CAROUSEL_PAGE,
    [currentPage],
  );
  const isDisableNext = useMemo(
    () => currentPage === totalPage - 1,
    [currentPage, totalPage],
  );

  const onNext = useCallback(() => {
    if (totalPage - 1 !== currentPage) {
      setCurrentPage((page) => page + 1);
    }
  }, [currentPage, totalPage]);

  const onPrev = useCallback(() => {
    if (currentPage !== DEFAULT_CAROUSEL_PAGE) {
      setCurrentPage((page) => page - 1);
    }
  }, [currentPage]);

  const updateCurrentSlide = useCallback(
    (slide: number) => {
      if (currentPage !== slide) {
        setCurrentPage(slide);
      }
    },
    [currentPage, setCurrentPage],
  );

  const tempCarouselArray = [...(SpeakerItems ?? [])];
  let CarouselChunks;
  const CarouselItems = [];

  while (tempCarouselArray && tempCarouselArray.length > 0) {
    CarouselChunks = tempCarouselArray.splice(0, maxVideoPerPage);
    CarouselItems.push(CarouselChunks);
  }

  return {
    onPrev,
    onNext,
    updateCurrentSlide,
    totalPage,
    currentPage,
    isDisablePrev,
    isDisableNext,
    CarouselItems,
  };
};

export default useVideoMasonryCarousel;
