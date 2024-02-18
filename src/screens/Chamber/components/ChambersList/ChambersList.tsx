import { type FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ElementStatusEnum, SpaceStatusEnum } from '@/apollo/generated/types';
import ChamberBox from '@/components/ChamberBox/ChamberBox';
import { useMarkBroadcastedNoumAsViewedMutation } from '@/apollo/graphql';
import {
  ChamberBoxNameEnum,
  DiscoveryCategoryEnum,
} from '@/components/ChamberBox/types';
import { getFullName } from '@/utils/fullName';
import { useAuth } from '@/features/auth/contexts';
import OwnerDefaultImage from '@/assets/images/profile_default.png';
import { HandleFollowSearch } from '@/screens/Chamber/components/RightPanel/elements/NoumActions/types';
import { useSkeletonIsLoadingContext } from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import { SpaceUtils } from '@/utils/space';
import { type ChambersListProps } from './types';
import { ChambersListContainer, ChamberItem } from './styles';

const { featured, source } = HandleFollowSearch;

export const ChambersList: FC<ChambersListProps> = ({
  chambers,
  fourColumnItem,
  category,
}) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const userId = useMemo(() => user?._id ?? '', [user]);
  const [markBroadcastedNoumAsViewed] =
    useMarkBroadcastedNoumAsViewedMutation();
  const handleMarkBroadcastedNoumAsViewed = useCallback(
    async (id: string) => {
      await markBroadcastedNoumAsViewed({
        variables: { spaceId: id },
        onCompleted: () => {},
      });
    },
    [markBroadcastedNoumAsViewed],
  );
  const { isLoading } = useSkeletonIsLoadingContext();

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
    <ChambersListContainer data-testid="chambers-list">
      {chambers.map(
        (chamber, index) =>
          chamber &&
          chamber.status !== SpaceStatusEnum.Deleted && (
            <ChamberItem
              key={`${chamber._id ? chamber._id + index : index}`}
              fourColumnItem={fourColumnItem}
              onClick={() => onClickChamber(chamber?._id)}
              aria-disabled={isLoading}
            >
              <ChamberBox
                id={chamber._id}
                url={chamber?.profileImage ?? undefined}
                chamberUrl={getChamberUrl(chamber?._id)}
                ownerImageURL={
                  chamber?.uid?.profile?.profilePicture || OwnerDefaultImage
                }
                isSecretNoum={SpaceUtils.isSecretNoum(chamber)}
                title={chamber.uid?.title || ''}
                chamberTitle={chamber.name || ''}
                name={
                  (chamber.category?.name?.toLowerCase() as ChamberBoxNameEnum) ||
                  ChamberBoxNameEnum.member
                }
                ownedby={
                  userId === chamber.uid?._id
                    ? t('noumena.you')
                    : getFullName(
                        chamber.uid?.firstName,
                        chamber.uid?.middleName,
                        chamber.uid?.lastName,
                      ) ?? undefined
                }
                archived={chamber.status === SpaceStatusEnum.Archived}
                followers={chamber.followersCount || 0}
                location={chamber.uid?.location ?? undefined}
                hasDraftElement={
                  userId === chamber.uid?._id &&
                  (chamber.status === ElementStatusEnum.Draft ||
                    chamber.elements?.some(
                      (element) =>
                        element?.status === ElementStatusEnum.Draft ||
                        (element?.status === ElementStatusEnum.Published &&
                          element.tempStatus === ElementStatusEnum.Draft),
                    ))
                }
                category={category}
                startDate={chamber?.broadcastedAt}
                isFavouriteNoum={chamber.isFavourited || undefined}
                projectType={chamber.projectType || undefined}
              />
            </ChamberItem>
          ),
      )}
    </ChambersListContainer>
  );
};
