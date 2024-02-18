import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getFullName } from '@/utils/fullName';
import { SpaceStatusEnum } from '@/apollo/generated/types';
import { useAuth } from '@/features/auth/contexts';
import { useMarkBroadcastedNoumAsViewedMutation } from '@/apollo/graphql';
import ChamberBox from '@/components/ChamberBox/ChamberBox';
import OwnerDefaultImage from '@/assets/images/profile_default.png';
import { HandleFollowSearch } from '@/screens/Chamber/components/RightPanel/elements/NoumActions/types';
import { useSkeletonIsLoadingContext } from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import { chambersForSkeletonLoader } from '@/utils/skeletonLoaderHelpers';
import {
  ChamberBoxNameEnum,
  DiscoveryCategoryEnum,
} from '@/components/ChamberBox/types';
import { type CarouselSlideProps } from './types';
import * as S from './styles';

const { featured, source } = HandleFollowSearch;

export const CarouselSlide = ({
  items,
  countPerPage,
  category,
}: CarouselSlideProps) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [markBroadcastedNoumAsViewed] =
    useMarkBroadcastedNoumAsViewedMutation();
  const { isLoading } = useSkeletonIsLoadingContext();
  const userId = useMemo(() => user?._id ?? '', [user]);

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
    <>
      {(isLoading ? chambersForSkeletonLoader(countPerPage) : items)?.map(
        (chamber) => (
          <S.CardContainer
            key={chamber?._id}
            data-testid={`carouselItem-${chamber?._id}`}
            countPerPage={countPerPage}
            onClick={() => onClickChamber(chamber?._id)}
            isNotFilledItems={
              !!countPerPage && (items?.length || 0) % countPerPage !== 0
            }
          >
            <ChamberBox
              id={chamber?._id}
              chamberUrl={getChamberUrl(chamber?._id)}
              url={chamber?.profileImage ?? undefined}
              ownerImageURL={
                chamber?.uid?.profile?.profilePicture || OwnerDefaultImage
              }
              title={chamber?.uid?.title || ''}
              name={
                (chamber?.category?.name?.toLowerCase() as ChamberBoxNameEnum) ||
                ChamberBoxNameEnum.member
              }
              ownedby={
                userId === chamber?.uid?._id
                  ? t('noumena.you')
                  : getFullName(
                      chamber?.uid?.firstName,
                      chamber?.uid?.middleName,
                      chamber?.uid?.lastName,
                    ) ?? undefined
              }
              chamberTitle={chamber?.name || ''}
              archived={chamber?.status === SpaceStatusEnum.Archived}
              followers={chamber?.followersCount || 0}
              location={chamber?.uid?.location ?? undefined}
              category={category}
              startDate={chamber?.broadcastedAt}
              isFavouriteNoum={chamber?.isFavourited || false}
            />
          </S.CardContainer>
        ),
      )}
    </>
  );
};
