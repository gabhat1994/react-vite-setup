import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import type SwiperCore from 'swiper';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import {
  useGetSpaceByIdLazyQuery,
  type GetSpaceByIdQuery,
} from '@/apollo/graphql';
import { SpaceStatusEnum } from '@/apollo/generated/types';
import { Spinner } from '@/components/Spinner';
import { breakpoints } from '@/constants/devices';
import { useWindowDimensions } from '@/hooks';
import ChamberBox from '@/components/ChamberBox/ChamberBox';
import OwnerDefaultImage from '@/assets/images/profile_default.png';
import { ChamberBoxNameEnum } from '@/components/ChamberBox/types';
import { getFullName } from '@/utils/fullName';
import { ChamberItem } from '@/features/discovery/components';
import { StyledSwiperControls, SpinnerContainer } from './styles';

export const SwiperFreeMode: React.FC<{ recommendedNoumIds: string[] }> = ({
  recommendedNoumIds,
}) => {
  const [gqlSpace] = useGetSpaceByIdLazyQuery();
  const [recommendedNoums, setRecommendedNoums] = useState<
    GetSpaceByIdQuery['getSpaceById'][]
  >([]);
  const [index, setIndex] = useState<number>(0);

  const [disablePrevBtn, setDisablePrevBtn] = useState(true);
  const [disableNextBtn, setDisableNextBtn] = useState(false);
  const [swiper, setSwiper] = useState<SwiperCore>();

  useEffect(() => {
    if (index < recommendedNoumIds.length) {
      gqlSpace({
        variables: {
          noumId: recommendedNoumIds[index],
          editorV2Enabled: false,
        },
        onCompleted(response) {
          setRecommendedNoums((prv) => [...prv, response.getSpaceById]);
          setIndex((prv) => prv + 1);
        },
      });
    }
  }, [gqlSpace, index, recommendedNoumIds]);

  const { width } = useWindowDimensions();
  const { t } = useTranslation();

  let slidesPerView = 3;
  if (width < breakpoints.TABLET) {
    slidesPerView = 1.25;
  }

  const showArraowsForScrolling = recommendedNoums?.length > slidesPerView;

  if (!recommendedNoums.length) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={16}
      freeMode={true}
      className="mySwiper"
      onInit={(swiperInstance) => setSwiper(swiperInstance)}
      onReachBeginning={() => setDisablePrevBtn(true)}
      onReachEnd={() => {
        const progress = swiper?.progress || 0;
        if (progress > 0.5) setDisableNextBtn(true);
      }}
    >
      {showArraowsForScrolling && (
        <StyledSwiperControls>
          <div className="swiper-icons">
            <Icon
              className={`swiper-control-btn ${
                disablePrevBtn ? 'disabled' : ''
              }`}
              name="chevron_left_m"
              size={16}
              color={
                disablePrevBtn
                  ? '--icon-button-neutral-disabled'
                  : '--icon-button-neutral-default'
              }
              onClick={() => {
                if (swiper && !swiper.destroyed) {
                  swiper.slidePrev();
                  setDisableNextBtn(false);
                }
              }}
            />
            <Icon
              className={`swiper-control-btn ${
                disableNextBtn ? 'disabled' : ''
              }`}
              name="chevron_right_m"
              size={16}
              color={
                disableNextBtn
                  ? '--icon-button-neutral-disabled'
                  : '--icon-button-neutral-default'
              }
              onClick={() => {
                if (swiper && !swiper.destroyed) {
                  swiper.slideNext();
                  setDisablePrevBtn(false);
                }
              }}
            />
          </div>
        </StyledSwiperControls>
      )}

      {recommendedNoums?.map((noum) => {
        const id = noum?._id;
        return (
          <SwiperSlide key={id}>
            <ChamberItem key={`${noum?._id}-${noum?.name}`} isBordered>
              <ChamberBox
                id={noum?._id}
                chamberUrl={`/noum/${id}`}
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
              />
            </ChamberItem>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
