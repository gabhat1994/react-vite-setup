import { type FC } from 'react';
import { getFullName } from '@/utils/fullName';
import { getTimeStampForDisplaying } from '@/utils/getTimeStampForDisplaying';
import OwnerDefaultImage from '@/assets/images/profile_default.png';
import ChamberDefaultImag from '@/assets/images/chamber_default.png';
import { SpaceUtils } from '@/utils/space';
import { ProfileSummary } from '../components/ProfileSummary';
import { useNoumContext } from '../ViewChamber/ChamberProvider';

type EditChamberHeaderProps = {
  isCustomPreview?: boolean;
};

export const EditChamberHeader: FC<EditChamberHeaderProps> = ({
  isCustomPreview,
}) => {
  const { space, loading } = useNoumContext();
  const { name } = SpaceUtils.getProfileDetails(space);

  return (
    <ProfileSummary
      spaceId={space?._id || undefined}
      isUpdateMode
      category={space?.category || undefined}
      name={name}
      location={space?.uid?.location || ''}
      bio={space?.description || ''}
      followers={space?.followersCount || 0}
      imageURL={space?.profileImage || ChamberDefaultImag}
      ownerImageURL={space?.uid?.profile?.profilePicture || OwnerDefaultImage}
      lastUpdated={getTimeStampForDisplaying(space?.updatedAt)}
      title={space?.category?.name || 'Title'}
      loading={loading}
      isMasterNoum={SpaceUtils.isMasterNoum(space)}
      isSecretNoum={SpaceUtils.isSecretNoum(space)}
      ownerTitle={space?.uid?.title ? String(space?.uid?.title) : undefined}
      ownerBio={space?.uid?.bio ? String(space?.uid?.bio) : undefined}
      ownerName={
        space?.uid
          ? getFullName(
              space.uid.firstName,
              space.uid.middleName,
              space.uid.lastName,
            )
          : ''
      }
      coverURL={space?.headerBackgroundUrl || ''}
      isCustomPreview={isCustomPreview}
    />
  );
};
