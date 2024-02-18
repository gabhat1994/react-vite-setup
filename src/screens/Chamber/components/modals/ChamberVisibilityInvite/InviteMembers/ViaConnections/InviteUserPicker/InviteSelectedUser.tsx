import React from 'react';
import { Icon } from '@/components/Icon';
import { Tag } from '@/components/Tag';
import { TSpan } from '@/components/Typography';

import { SelectedUser } from './styles';
import { type InviteSelectedUserProps } from './types';

export const InviteSelectedUser: React.FC<InviteSelectedUserProps> = ({
  data,
  multiselect,
  onRemove,
}) => (
  <SelectedUser data-testid="invite-selected-user">
    <Tag
      secondary
      icon={
        multiselect ? (
          <Icon
            data-testid="remove-button"
            name="close_m"
            size={24}
            color="--icon-tab-basic-brand-primary-default"
            onClick={() => onRemove(data.key)}
          />
        ) : undefined
      }
    >
      <TSpan
        data-testid="text-message"
        flex={1}
        font="body-m"
        colorToken="--text-tab-chips-brand-primary-selected"
      >
        {data.label}
      </TSpan>
    </Tag>
  </SelectedUser>
);
