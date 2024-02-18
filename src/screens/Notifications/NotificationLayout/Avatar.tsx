import { Avatar } from '@/components/Avatar/Avatar';
import { DiagonalAvatar2 } from '@/components/Avatar/Diagonal2/Diagonal2';
import { DiagonalAvatar3 } from '@/components/Avatar/Diagonal3/Diagonal3';
import { NestedAvatar } from '@/components/Avatar/Nested/NestedAvatar';
import { type NotificationAvatarProps } from './types';

export function NotificationAvatars({
  avatars,
  mode = 'inline',
}: NotificationAvatarProps) {
  switch (mode) {
    case 'nested': {
      return <NestedAvatar urls={avatars.slice(0, 2)} />;
    }
    case 'inline': {
      if (avatars.length >= 3) {
        return <DiagonalAvatar3 urls={avatars.slice(0, 3)} size="L" />;
      }

      if (avatars.length === 2) {
        return <DiagonalAvatar2 urls={avatars} size="L" />;
      }

      return <Avatar url={avatars[0] ?? undefined} size="L" />;
    }
    default: {
      return null;
    }
  }
}
