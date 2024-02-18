import { useAuth } from '@/features/auth/contexts';
import { Avatar } from '@/components/Avatar/Avatar';
import { UserProfilePictureWrapper } from './styles';

export const UserProfilePicture = () => {
  const { user } = useAuth();
  return (
    <UserProfilePictureWrapper>
      <Avatar
        url={user?.profile?.profilePicture!}
        size="XL"
        width={80}
        height={80}
      />
    </UserProfilePictureWrapper>
  );
};
