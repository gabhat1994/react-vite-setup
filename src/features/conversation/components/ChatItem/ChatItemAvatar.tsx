import { Avatar } from '@/components/Avatar/Avatar';
import { DiagonalAvatar2 } from '@/components/Avatar/Diagonal2/Diagonal2';
import { DiagonalAvatar3 } from '@/components/Avatar/Diagonal3/Diagonal3';

import { type UserData } from '../../types';

type ChatItemAvatarProps = {
  size?: 'S' | 'M' | 'L';
  users: UserData[];
};

export const ChatItemAvatar = ({ size, users }: ChatItemAvatarProps) => {
  const urls = users.map((participant) => participant.source);

  if (urls && urls.length === 1) {
    return (
      <Avatar
        data-testid="avatar-testid"
        url={urls[0]}
        size={size === 'L' ? 'L' : 'M'}
      />
    );
  }
  if (urls && urls.length === 2) {
    return (
      <DiagonalAvatar2
        data-testid="diagonalavatar-testid"
        urls={urls}
        size={size === 'L' ? 'L' : 'M'}
      />
    );
  }
  if (urls && urls.length > 2) {
    return (
      <DiagonalAvatar3
        data-testid="diagonalavatar3-testid"
        urls={urls}
        size={size === 'L' ? 'L' : 'M'}
      />
    );
  }
  return null;
};
