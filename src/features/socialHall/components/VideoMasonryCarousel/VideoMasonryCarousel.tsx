import React, {
  memo,
  useRef,
  useMemo,
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
} from 'react';
import {
  type VideoMasonryLayoutCalc,
  useVideoMasonryCarousel,
  useVideoMasonryLayoutCalc,
} from '@/features/socialHall/hooks';
import { Icon } from '@/components/Icon';
import { Stack } from '@/layout/Stack';
import { useSocialHallCallContext } from '@/providers';
import {
  Carousel,
  Container,
  Gallery,
  GalleryItem,
  PageButton,
  JumpButton,
  PaginationControl,
} from './styles';

export type VideoGalleryItem = {
  id: string;
  element: React.ReactNode;
};

type VideoMasonryCarouselProps = {
  gutterSpace?: number;
  clientWidth: number;
  clientHeight: number;
  videos: VideoGalleryItem[];
  showChatPanel: boolean;
  showMembersPanel: boolean;
  maxVideoPerPage: number;
};

export const VideoMasonryCarousel = memo(
  ({
    videos = [],
    clientWidth = 0,
    clientHeight = 0,
    maxVideoPerPage,
    gutterSpace = 0,
    showChatPanel,
    showMembersPanel,
  }: VideoMasonryCarouselProps) => {
    const { screenSharingLocalUserFeed, screenSharingRemoteUserFeed } =
      useSocialHallCallContext();

    const elemRef = useRef<HTMLDivElement | null>(null);
    const {
      onPrev,
      onNext,
      totalPage,
      currentPage,
      isDisablePrev,
      isDisableNext,
      updateCurrentSlide,
    } = useVideoMasonryCarousel({
      maxVideoPerPage,
      videoCount: videos.length,
    });
    const { calculateLayout } = useVideoMasonryLayoutCalc();
    const [dimension, setDimension] = useState<VideoMasonryLayoutCalc>({
      width: 0,
      cols: 0,
      height: 0,
      rows: 0,
    });

    useLayoutEffect(() => {
      setDimension(() =>
        calculateLayout({
          clientWidth,
          clientHeight,
          maxVideoPerPage,
          videoCount: videos.length,
        }),
      );
    }, [
      calculateLayout,
      videos,
      clientWidth,
      clientHeight,
      maxVideoPerPage,
      gutterSpace,
    ]);

    useEffect(() => {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 250);
    }, [
      clientWidth,
      screenSharingLocalUserFeed,
      screenSharingRemoteUserFeed,
      showChatPanel,
      showMembersPanel,
    ]);

    const videoItemCount = useCallback(
      (currPage: number) => {
        const remainingVideos = videos.length - maxVideoPerPage * currPage;
        return remainingVideos < maxVideoPerPage
          ? remainingVideos
          : maxVideoPerPage;
      },
      [maxVideoPerPage, videos],
    );

    const isShowNavigation = useMemo(
      () => videos.length > maxVideoPerPage,
      [maxVideoPerPage, videos],
    );

    const maxHeight = useMemo(
      () =>
        dimension.rows ? `${dimension.rows * dimension.height}px` : '100vh',
      [dimension],
    );

    const minWidth = useMemo(
      () => (dimension.width !== 0 ? `${totalPage * clientWidth}px` : '100%'),
      [totalPage, clientWidth, dimension],
    );

    const totalPageGallery = useMemo(
      () => Array.from(Array(totalPage).keys()),
      [totalPage],
    );

    const galleryVideoItem = useCallback(
      (page: number): number[] =>
        Array.from(Array(videoItemCount(page)).keys()),
      [videoItemCount],
    );

    const getKey = useCallback(
      (page: number, item: number): React.Key =>
        `${videos[page + 1 * item].id}-${item}-${page}`,
      [videos],
    );

    return (
      <Container>
        <Carousel
          className="content"
          style={{ minWidth, left: -(currentPage * clientWidth) }}
        >
          {totalPageGallery.map((page, pageIndex) => (
            <Gallery
              key={page}
              className="gallery"
              ref={elemRef}
              style={{
                maxHeight,
                minWidth: clientWidth,
              }}
            >
              {galleryVideoItem(page)
                .fill(1)
                .map((_, itemIndex) => (
                  <GalleryItem
                    gutterSpace={gutterSpace}
                    style={{
                      maxWidth: dimension.width - gutterSpace,
                      maxHeight: dimension.height - gutterSpace,
                      minWidth: dimension.width - gutterSpace,
                      minHeight: dimension.height - gutterSpace,
                    }}
                    key={getKey(pageIndex, itemIndex)}
                  >
                    {
                      videos[
                        pageIndex * galleryVideoItem(page - 1).length +
                          itemIndex
                      ].element
                    }
                  </GalleryItem>
                ))}
            </Gallery>
          ))}
        </Carousel>
        {isShowNavigation && (
          <PaginationControl>
            <Stack data-testid="pagination">
              <JumpButton
                data-testid="page-prev-button"
                textOnly
                onClick={onPrev}
                disabled={isDisablePrev}
              >
                <Icon name="chevron_small_left_m" size={24} />
              </JumpButton>
              <Stack gap={8}>
                {Array.from(Array(totalPage).keys()).map((page, pageIndex) => (
                  <PageButton
                    key={`page-btn-${page}`}
                    testId="page-button"
                    size="small"
                    secondary={currentPage === +pageIndex}
                    active={currentPage === +pageIndex}
                    onClick={() => updateCurrentSlide(+pageIndex)}
                  />
                ))}
              </Stack>
              <JumpButton
                data-testid="page-next-button"
                textOnly
                onClick={onNext}
                disabled={isDisableNext}
              >
                <Icon name="chevron_small_right_m" size={24} />
              </JumpButton>
            </Stack>
          </PaginationControl>
        )}
      </Container>
    );
  },
);
