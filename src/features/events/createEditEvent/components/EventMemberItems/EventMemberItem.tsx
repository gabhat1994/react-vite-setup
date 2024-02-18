import { t } from 'i18next';
import { useMemo } from 'react';

import { TSpan } from '@/components';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { getFullName } from '@/utils/fullName';
import { Avatar } from '@/components/Avatar/Avatar';

import {
  EventUserItemWrapper,
  EventUserInfoWrapper,
  EventUserTitle,
} from './styles';
import { HostElementRowHeight } from './const';
import type { EventUserItemProps } from './types';

export const EventMemberItem = ({
  currentUser,
  user,
  type,
  onRemove,
  splitter,
  isNoumEditor,
}: EventUserItemProps) => {
  const useTitle = useMemo(() => {
    if (type === 'host') {
      return user?.isHost
        ? t('noumena.event.modal.host_label')
        : t('noumena.event.modal.cohost_label');
    }

    return user?.title;
  }, [type, user?.isHost, user?.title]);

  if (!user) {
    return null;
  }

  return (
    <EventUserItemWrapper
      align="center"
      fullWidth
      gap={16}
      key={user._id}
      splitter={splitter}
      isNoumEditor={isNoumEditor}
      maxHeight={HostElementRowHeight}
    >
      <Avatar url={user.profilePictureThumbnail || ''} />
      <EventUserInfoWrapper>
        <TSpan
          font="body-l-bold"
          colorToken="--text-tablecell-header-neutral-highlighted"
        >
          {getFullName(
            user.firstName,
            user.middleName,
            user.lastName,
            user.email,
          )}
        </TSpan>
        <EventUserTitle
          font="body-m"
          colorToken="--text-tablecell-body-neutral-default"
        >
          {useTitle}
        </EventUserTitle>
      </EventUserInfoWrapper>
      {!user.isHost && currentUser !== user._id && (
        <Button
          testId="invite-cancel-button"
          tertiary
          textOnly={isNoumEditor}
          size="small"
          icon={
            <Icon
              name="close_m"
              size={16}
              color="--icon-button-neutral-default"
            />
          }
          onClick={() => onRemove?.(user)}
        />
      )}
    </EventUserItemWrapper>
  );
};
