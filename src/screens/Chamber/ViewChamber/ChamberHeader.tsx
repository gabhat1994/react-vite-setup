import { type FC, useEffect } from 'react';
import { getFullName } from '@/utils/fullName';
import ChamberDefaultImag from '@/assets/images/chamber_default.png';
import OwnerDefaultImage from '@/assets/images/profile_default.png';
import { getTimeStampForDisplaying } from '@/utils/getTimeStampForDisplaying';
import { SpaceStatusEnum } from '@/apollo/generated/types';
import SkeletonLoaderHoumHeader from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderHoumHeader';
import { SpaceUtils } from '@/utils/space';
import { useGetSpaceFollowersLazyQuery } from '@/apollo/graphql';
import { useNoumContext } from './ChamberProvider';
import { ProfileSummary } from '../components/ProfileSummary';
import { type IChamberHead } from './types';

export const ChamberHeader: FC<IChamberHead> = ({ isCustomPreview }) => {
  const { space, loadingSpace } = useNoumContext();

  const [
    refetchFollowersCount,
    { data: followersData, loading: followersLoading },
  ] = useGetSpaceFollowersLazyQuery({
    variables: {
      spaceId: space?._id!,
    },
    fetchPolicy: 'cache-and-network',
  });
  const followersDataLoading = followersLoading && !followersData;

  useEffect(() => {
    if (refetchFollowersCount && !space?.followersCount && space?._id)
      refetchFollowersCount();
  }, [refetchFollowersCount, space?._id, space?.followersCount]);

  if (loadingSpace || followersDataLoading) return <SkeletonLoaderHoumHeader />;

  return (
    <ProfileSummary
      disabled={SpaceUtils.isArchived(space)}
      name={space?.name || ''}
      location={space?.uid?.location || ''}
      bio={space?.description || ''}
      followers={space?.followersCount || 0}
      imageURL={space?.profileImage || ChamberDefaultImag}
      ownerImageURL={space?.uid?.profile?.profilePicture || OwnerDefaultImage}
      lastUpdated={getTimeStampForDisplaying(
        SpaceUtils.getLastUpdatedAt(space),
      )}
      title={space?.category?.name || 'Title'}
      loading={loadingSpace}
      isMasterNoum={SpaceUtils.isMasterNoum(space)}
      isSecretNoum={SpaceUtils.isSecretNoum(space)}
      ownerTitle={space?.uid?.title ? String(space?.uid?.title) : undefined}
      ownerBio={space?.uid?.bio ? String(space?.uid?.bio) : undefined}
      isPublished={space?.status === SpaceStatusEnum.Published}
      coverURL={space?.headerBackgroundUrl || ''}
      ownerName={
        space?.uid
          ? getFullName(
              space.uid.firstName,
              space.uid.middleName,
              space.uid.lastName,
            )
          : ''
      }
      isCustomPreview={isCustomPreview}
      spaceId={space?._id || ''}
    />
  );
};
