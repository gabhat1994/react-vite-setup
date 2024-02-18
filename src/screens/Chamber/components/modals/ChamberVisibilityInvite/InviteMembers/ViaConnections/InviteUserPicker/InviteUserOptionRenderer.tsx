import React from 'react';
import { Avatar } from '@/components/Avatar/Avatar';
import { Infinite } from '@/components/Infinite';
import {
  DropdownItemLayout,
  DropDownLabel,
  DropdownValueWrapper,
  DropdownValueLabel,
  DropdownValueDescription,
} from '@/components/Dropdown/styles';
import { AvatarWrapper } from './styles';
import { type UserOptionItemProps } from './types';

export const InviteUserOptionRenderer: React.FC<UserOptionItemProps> = ({
  options,
  activeItem,
  loading,
  hasMore,
  onSelect,
  onFetchMore,
}) => (
  <Infinite
    data-testid="invite-users-list"
    status={loading ? 'loading' : hasMore ? 'end-with-force' : 'end'}
    onFetchMore={onFetchMore}
  >
    {options.map((option) =>
      option.type === 'value' ? (
        <DropdownItemLayout
          key={option.key}
          active={activeItem?.key === option.key}
          tabIndex={0}
          onClick={() => onSelect(option)}
        >
          <DropDownLabel selected={activeItem?.key === option.key}>
            <AvatarWrapper>
              <Avatar url={option.value.user.thumbnailUrl ?? ''} size="M" />
            </AvatarWrapper>
            <DropdownValueWrapper>
              <DropdownValueLabel>{option.label}</DropdownValueLabel>
              {option.description && (
                <DropdownValueDescription>
                  {option.description}
                </DropdownValueDescription>
              )}
            </DropdownValueWrapper>
          </DropDownLabel>
        </DropdownItemLayout>
      ) : null,
    )}
  </Infinite>
);
