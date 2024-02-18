import { Carousel } from 'react-responsive-carousel';
import { useSkeletonIsLoadingContext } from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import { type SpaceOutputFragment } from '@/apollo/graphql';
import * as S from './styles';
import { MobileSlider } from './MobileSlider';
import { CarouselSlide } from './CarouselSlide';
import { type SliderBodyProps } from './types';

const SliderBody = ({
  isMobile,
  carouselItems,
  countPerPage,
  category,
  updateCurrentSlide,
  page,
  pageArray,
  pageItems,
}: SliderBodyProps) => {
  const { isLoading } = useSkeletonIsLoadingContext();

  if (isMobile)
    return (
      <S.SliderBody
        data-testid="sliderBody"
        flexStart={carouselItems && carouselItems?.length < countPerPage}
      >
        <MobileSlider items={carouselItems || []} category={category} />
      </S.SliderBody>
    );
  return (
    <S.ResponsiveSlider data-testid="sliderBody">
      <Carousel
        showArrows={false}
        selectedItem={page}
        onChange={updateCurrentSlide}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        swipeable={false}
      >
        {(isLoading ? [...Array(countPerPage).keys()] : pageArray)?.map(
          (item) => (
            <CarouselSlide
              key={item}
              items={
                pageItems
                  ? pageItems[item as number]
                  : [
                      {} as SpaceOutputFragment,
                      {} as SpaceOutputFragment,
                      {} as SpaceOutputFragment,
                    ]
              }
              countPerPage={countPerPage}
              category={category}
            />
          ),
        )}
      </Carousel>
    </S.ResponsiveSlider>
  );
};

export default SliderBody;
