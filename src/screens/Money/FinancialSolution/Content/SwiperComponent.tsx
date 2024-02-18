import { useState, type FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import type SwiperCore from 'swiper';
import { Icon } from '@/components/Icon';
import { Spacer } from '@/layout/Stack';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import useEvent from '@/hooks/useEvent';
import { StyledSwiperControls } from './styles';

interface SwiperComponentProps {
  SwiperSlidesOptions: JSX.Element[] | undefined;
  slidesPerView: number;
  handleHidePadding: (progress: number) => void;
}

const SwiperComponent: FC<SwiperComponentProps> = ({
  SwiperSlidesOptions,
  slidesPerView,
  handleHidePadding,
}) => {
  const [disablePrevBtn, setDisablePrevBtn] = useState(true);
  const [disableNextBtn, setDisableNextBtn] = useState(false);
  const [swiper, setSwiper] = useState<SwiperCore>();
  const deviceType = useDeviceType();

  const prevSlide = useEvent(() => {
    if (swiper && !swiper.destroyed) {
      swiper.slidePrev();
      setDisableNextBtn(false);
    }
  });

  const nextSlide = useEvent(() => {
    if (swiper && !swiper.destroyed) {
      swiper.slideNext();
      setDisablePrevBtn(false);
    }
  });

  const showArraowsForScrolling = SwiperSlidesOptions
    ? SwiperSlidesOptions?.length > slidesPerView
    : false;

  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={16}
      freeMode={true}
      className="mySwiper"
      onInit={(swiperInstance) => setSwiper(swiperInstance)}
      onReachBeginning={() => setDisablePrevBtn(true)}
      onActiveIndexChange={({ activeIndex }) => handleHidePadding(activeIndex)}
      onReachEnd={() => {
        const progress = swiper?.progress || 0;
        if (progress > 0.5) setDisableNextBtn(true);
      }}
      onSliderMove={({ progress }) => handleHidePadding(progress)}
    >
      <StyledSwiperControls>
        {showArraowsForScrolling && (
          <div className="swiper-icons">
            <div className="stepper">
              <Icon
                className={disablePrevBtn ? 'disabled' : ''}
                name="chevron_left_m"
                size={16}
                color="--icon-button-neutral-alt-default"
                onClick={prevSlide}
              />
            </div>
            <div className="stepper">
              <Icon
                className={disableNextBtn ? 'disabled' : ''}
                name="chevron_right_m"
                size={16}
                color="--icon-button-neutral-alt-default"
                onClick={nextSlide}
              />
            </div>
          </div>
        )}
        {deviceType !== DeviceTypeEnum.MOBILE && <Spacer height={36} />}
      </StyledSwiperControls>
      {SwiperSlidesOptions?.map((slide) => (
        <SwiperSlide key={slide.key}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
