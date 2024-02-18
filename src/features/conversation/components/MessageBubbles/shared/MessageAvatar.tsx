import React from 'react';

import { Avatar } from '@/components/Avatar/Avatar';
import { type MessageProps } from '../types';
import { AvatarWrapper } from '../styles';

export const MessageAvatar: React.FC<
  Pick<MessageProps, 'type' | 'userAvatar' | 'showAvatar'>
> = ({ type, userAvatar, showAvatar }) => {
  if (type !== 'received') return null;

  return (
    <AvatarWrapper type={type} data-testid="message-avatar">
      {showAvatar && <Avatar url={userAvatar} size="M" />}
    </AvatarWrapper>
  );
};
