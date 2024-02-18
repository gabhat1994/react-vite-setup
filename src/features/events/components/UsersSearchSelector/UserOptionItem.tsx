import React from 'react';

import { Avatar } from '@/components/Avatar/Avatar';
import {
  DropdownItemLayout,
  DropDownLabel,
  DropdownValueWrapper,
  DropdownValueLabel,
  DropdownValueDescription,
} from '@/components/Dropdown/styles';
import { TSpan } from '@/components';
import { t } from 'i18next';
import { InvitationStatus, UserRole } from '@/apollo/generated/types';
import { AvatarWrapper } from './styles';
import { type UserOptionItemProps } from './types';

export const UserOptionItem: React.FC<UserOptionItemProps> = ({
  option,
  activeItem,
  onSelect,
  members,
  cohosts,
}) => {
  if (option.type !== 'value') return null;
  const isInvited =
    members?.find((member) => member._id === option.value._id)
      ?.invitationStatus === InvitationStatus.Pending;

  const isAttending =
    members?.find((member) => member._id === option.value._id)
      ?.invitationStatus === InvitationStatus.Accepted;

  const isHost = cohosts?.some(
    (cohost) =>
      cohost._id === option.value._id && cohost.userRole === UserRole.Cohost,
  );

  return (
    <>
      <DropdownItemLayout
        key={option.key}
        active={activeItem?.key === option.key}
        disabled={option.disabled}
        tabIndex={0}
        onClick={() => onSelect(option)}
      >
        <DropDownLabel selected={activeItem?.key === option.key}>
          <AvatarWrapper>
            <Avatar
              url={option.value.profilePictureThumbnail || undefined}
              size="L"
            />
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
        {isHost && option.disabled && (
          <TSpan
            colorToken="--text-tablecell-header-neutral-default"
            font="body-m-bold"
            overflow="unset"
          >
            {t('noumena.event.already_host')}
          </TSpan>
        )}
        {isInvited && option.disabled && (
          <TSpan
            colorToken="--text-tablecell-header-neutral-default"
            font="body-m-bold"
            overflow="unset"
          >
            {t('noumena.event.invited')}
          </TSpan>
        )}
        {isAttending && option.disabled && (
          <TSpan
            colorToken="--text-tablecell-header-neutral-default"
            font="body-m-bold"
            overflow="unset"
          >
            {t('noumena.event.attending')}
          </TSpan>
        )}
      </DropdownItemLayout>
    </>
  );
};
