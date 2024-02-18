import Skeleton from 'react-loading-skeleton';
import { useMemo } from 'react';
import { StyledAvatar } from '@/screens/Community/styles';
import defaultProfile from '@/assets/images/profile_default.png';
import { useAuth } from '@/features/auth/contexts';
import { UserUtil } from '@/utils/user';
import { type UserAvatarProps } from './types';

const UserAvatar = ({ user, onClick }: UserAvatarProps) => {
  const { user: currentUser } = useAuth();
  const isActive = useMemo(() => !UserUtil.isInactive(user), [user]);

  const isUnregistered = useMemo(
    () => UserUtil.isUnregistered(currentUser),
    [currentUser],
  );

  return (
    <>
      {user ? (
        <StyledAvatar
          isClickable={isActive && !isUnregistered && Boolean(onClick)}
          src={
            isActive
              ? user?.profile?.profilePicture || defaultProfile
              : defaultProfile
          }
          alt="addingPostUserAvatar"
          onClick={isActive && !isUnregistered ? onClick : null || (() => {})}
        />
      ) : (
        <Skeleton width="52px" height="52px" />
      )}
    </>
  );
};
export default UserAvatar;
