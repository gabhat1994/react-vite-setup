import { useMemo } from 'react';
import { DiagonalAvatar3 } from '@/components/Avatar/Diagonal3/Diagonal3';
import { Avatar } from '@/components/Avatar/Avatar';
import { DiagonalAvatar2 } from '@/components/Avatar/Diagonal2/Diagonal2';
import { type LoadMoreAvatarProps } from '@/screens/Chamber/components/elements/Comments/types';

const LoadMoreAvatar = (props: LoadMoreAvatarProps) => {
  const { pictures } = props;

  const UserAvatar = useMemo(
    () =>
      [...pictures].length === 1
        ? Avatar
        : [...pictures].length > 2
        ? DiagonalAvatar3
        : DiagonalAvatar2,
    [pictures],
  );
  return <UserAvatar url={pictures[0]} urls={pictures} size="M" />;
};

export default LoadMoreAvatar;
