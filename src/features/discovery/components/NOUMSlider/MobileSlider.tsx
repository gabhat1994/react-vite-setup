import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import type SwiperCore from 'swiper';
import ChamberBox from '@/components/ChamberBox/ChamberBox';
import { useWindowDimensions } from '@/hooks';
import { getFullName } from '@/utils/fullName';
import { useMarkBroadcastedNoumAsViewedMutation } from '@/apollo/graphql';
import { HandleFollowSearch } from '@/screens/Chamber/components/RightPanel/elements/NoumActions/types';
import { SpaceStatusEnum } from '@/apollo/generated/types';
import {
  ChamberBoxNameEnum,
  DiscoveryCategoryEnum,
} from '@/components/ChamberBox/types';
import OwnerDefaultImage from '@/assets/images/profile_default.png';
import { ChamberItem, SwiperContainer } from './styles';
import { type MobileSliderProps } from './types';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';

export const MobileSlider = ({ items, category }: MobileSliderProps) => {
  const [isEnd, setEnd] = useState(false);
  const [isSwiping, setSwiping] = useState(false);
  const [swiper, setSwiper] = useState<SwiperCore>();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const slidesPerView = width / 252;
  const { featured, source } = HandleFollowSearch;
  const [markBroadcastedNoumAsViewed] =
    useMarkBroadcastedNoumAsViewedMutation();

  swiper?.on('progress', (currentSwiper) => {
    setSwiping(currentSwiper?.progress > 0);
  });

  const handleMarkBroadcastedNoumAsViewed = useCallback(
    async (id: string) => {
      await markBroadcastedNoumAsViewed({
        variables: { spaceId: id },
        onCompleted: () => {},
      });
    },
    [markBroadcastedNoumAsViewed],
  );

  const onClickChamber = useCallback(
    (id: string | null | undefined) => {
      const isFromFeaturedPage = category === DiscoveryCategoryEnum.Featured;
      if (isFromFeaturedPage) {
        handleMarkBroadcastedNoumAsViewed(id ?? '');
      }
    },
    [category, handleMarkBroadcastedNoumAsViewed],
  );

  const getChamberUrl = (id: string | null | undefined) =>
    id
      ? category === DiscoveryCategoryEnum.Featured
        ? `/noum/${id}?${source}=${featured}`
        : `/noum/${id}`
      : undefined;

  return (
    <SwiperContainer isSwiping={isSwiping} isEnd={isEnd}>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={16}
        freeMode={true}
        className="discoverySwiper"
        onInit={(swiperInstance) => setSwiper(swiperInstance)}
        onReachEnd={() => {
          setSwiping(false);
          setEnd(true);
        }}
        width={width - 32}
      >
        {items?.map((noum) => (
          <SwiperSlide key={noum?._id}>
            <ChamberItem
              key={noum?._id}
              onClick={() => onClickChamber(noum?._id)}
              data-testid={`noum-${noum?._id}`}
            >
              <ChamberBox
                id={noum?._id}
                chamberUrl={getChamberUrl(noum?._id)}
                url={noum?.profileImage ?? undefined}
                ownerImageURL={
                  noum?.uid?.profile?.profilePicture || OwnerDefaultImage
                }
                title={noum?.uid?.title || ''}
                chamberTitle={noum?.name || ''}
                name={
                  (noum?.category?.name?.toLowerCase() as ChamberBoxNameEnum) ||
                  ChamberBoxNameEnum.member
                }
                ownedby={
                  noum?._id === noum?.uid?._id
                    ? t('noumena.you')
                    : getFullName(
                        noum?.uid?.firstName,
                        noum?.uid?.middleName,
                        noum?.uid?.lastName,
                      ) ?? undefined
                }
                archived={noum?.status === SpaceStatusEnum.Archived}
                followers={noum?.followersCount || 0}
                location={noum?.uid?.location ?? undefined}
                category={category}
                startDate={noum?.broadcastedAt}
                isFavouriteNoum={noum?.isFavourited || false}
              />
            </ChamberItem>
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );
};
