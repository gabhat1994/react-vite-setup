import React from 'react';

import { Avatar } from '@/components/Avatar/Avatar';
import { Icon } from '@/components/Icon';
import { Tag } from '@/components/Tag';
import { TSpan } from '@/components/Typography';

import { UserUtil } from '@/utils/user';
import { SelectedUser } from './styles';
import { type MessageSelectedUserProps } from './types';

export const MessageSelectedUser: React.FC<MessageSelectedUserProps> = ({
  data,
  multiselect,
  onRemove,
}) => (
  <SelectedUser data-testid="selected-user" multiselect={multiselect}>
    <Tag
      avatar={
        <Avatar
          url={UserUtil.getProfilePicture(data.value) || undefined}
          size="S"
        />
      }
      rightIcon={
        multiselect ? (
          <Icon
            data-testid="remove-button"
            name="close_m"
            size={15}
            color="--icon-tag-neutral"
            onClick={() => onRemove(data.value)}
          />
        ) : undefined
      }
    >
      <TSpan
        data-testid="text-message"
        flex={1}
        font="body-m"
        colorToken="--text-tag-neutral-default"
      >
        {data.label}
      </TSpan>
    </Tag>
  </SelectedUser>
);
