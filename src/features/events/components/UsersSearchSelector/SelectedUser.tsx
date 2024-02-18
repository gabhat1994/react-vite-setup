import React from 'react';

import { Avatar } from '@/components/Avatar/Avatar';
import { Icon } from '@/components/Icon';
import { Tag } from '@/components/Tag';
import { TSpan } from '@/components/Typography';

import { SelectedUserWrapper } from './styles';
import { type SelectedUserProps } from './types';

export const SelectedUser: React.FC<SelectedUserProps> = ({
  data,
  multiselect,
  onRemove,
}) => (
  <SelectedUserWrapper data-testid="selected-user" multiselect={multiselect}>
    <Tag
      secondary
      avatar={
        <Avatar
          url={data.value.profilePictureThumbnail || undefined}
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
            onClick={() => onRemove(data.key)}
          />
        ) : undefined
      }
    >
      <TSpan
        data-testid="text-message"
        flex={1}
        font="body-m"
        colorToken="--text-badge-neutral-default"
      >
        {data.label}
      </TSpan>
    </Tag>
  </SelectedUserWrapper>
);
