import { useMemo } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Icon } from '@/components/Icon';
import { type UserOutput } from '@/apollo/generated/types';
import { breakpoints } from '@/constants/devices';
import { useWindowDimensions } from '@/hooks/dimensions';
import { useVideoMasonryCarousel } from '@/features/socialHall/hooks';
import { useSocialHallCallContext } from '@/providers/SocialHallCallProvider';
import { MediaPreview } from '../MediaPreview';
import { type SpeakerViewCarouselProps } from './types';
import * as S from './styles';

export const SpeakerViewCarousel = ({
  userFeeds,
  speakerFeed,
  maxVideoPerPage,
  isMinimalView,
  isFullScreen,
}: SpeakerViewCarouselProps) => {
  const { width } = useWindowDimensions();
  const { isShareScreen, isRemoteScreenSharing } = useSocialHallCallContext();

  const isScreenSharing = useMemo(
    () => isShareScreen || isRemoteScreenSharing,
    [isShareScreen, isRemoteScreenSharing],
  );
  const isTablet = useMemo(
    () => width < breakpoints.LAPTOP_L && width > breakpoints.MOBILE_MAX,
    [width],
  );
  const isMobile = useMemo(() => width < breakpoints.MOBILE_MAX, [width]);

  const {
    onPrev,
    onNext,
    currentPage,
    isDisablePrev,
    isDisableNext,
    updateCurrentSlide,
    CarouselItems,
  } = useVideoMasonryCarousel({
    maxVideoPerPage,
    videoCount: userFeeds?.length!,
    SpeakerItems: userFeeds,
  });
  return (
    <S.SpeakerCarouselWrapper
      gap={16}
      align="center"
      isFullScreen={isFullScreen}
    >
      {CarouselItems.length < 2 ? null : (
        <S.Steps
          onClick={onPrev}
          data-testid="previous"
          disabled={isDisablePrev}
          size="small"
          icon={<Icon name="chevron_small_left_m" size={24} />}
        />
      )}
      <Carousel
        emulateTouch
        selectedItem={currentPage}
        onChange={updateCurrentSlide}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        width={isMobile ? 190 : isTablet ? 570 : 930}
      >
        {CarouselItems.map((item) => (
          <S.GalleryViewBody key={item[0]._id}>
            {item.map((attendee) => {
              if (attendee._id === speakerFeed?._id && !isScreenSharing) {
                return null;
              }
              return (
                <S.HostItem key={attendee._id}>
                  <MediaPreview
                    key={attendee._id}
                    isFullScreen={!!isFullScreen}
                    isMinimalView={isMinimalView!}
                    speakerCarouselPortal={!isFullScreen}
                    {...(attendee as UserOutput)}
                  />
                </S.HostItem>
              );
            })}
          </S.GalleryViewBody>
        ))}
      </Carousel>
      {CarouselItems.length < 2 ? null : (
        <S.Steps
          onClick={onNext}
          data-testid="next"
          size="small"
          disabled={isDisableNext}
          icon={<Icon name="chevron_small_right_m" size={24} />}
        />
      )}
    </S.SpeakerCarouselWrapper>
  );
};
export default SpeakerViewCarousel;
