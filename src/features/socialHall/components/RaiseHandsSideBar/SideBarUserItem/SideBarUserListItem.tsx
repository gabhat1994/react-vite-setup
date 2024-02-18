import { useState, useCallback } from 'react';
import { getFullName } from '@/utils/fullName';
import { Avatar } from '@/components/Avatar/Avatar';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { useRaiseHandApi } from '@/features/socialHall/hooks';
import {
  AvatarWrapper,
  ButtonWrapper,
  ItemWrapper,
  NameSpan,
  NameWrapper,
  TitleSpan,
} from './styles';
import { type SideBarUserItemProps } from '../types';

export const SideBarUserItem = ({ userInfo }: SideBarUserItemProps) => {
  const { onDeclineRaiseHand, onAcceptRaiseHand } = useRaiseHandApi();
  const [declineLoading, setDeclineLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);

  const handleAccept = useCallback(async () => {
    setAcceptLoading(true);
    await onAcceptRaiseHand(userInfo._id);
    setAcceptLoading(false);
  }, [onAcceptRaiseHand, userInfo._id]);

  const handleReject = useCallback(async () => {
    setDeclineLoading(true);
    await onDeclineRaiseHand(userInfo._id);
    setDeclineLoading(false);
  }, [onDeclineRaiseHand, userInfo._id]);

  return (
    <ItemWrapper>
      <AvatarWrapper data-testid="avatar_wrapper">
        <Avatar url={userInfo?.profile?.profilePicture || ''} />
      </AvatarWrapper>
      <NameWrapper>
        <NameSpan
          colorToken="--text-tablecell-header-neutral-highlighted"
          font="body-l-bold"
        >
          {getFullName(
            userInfo?.firstName,
            userInfo?.middleName,
            userInfo?.lastName,
          )}
        </NameSpan>
        <TitleSpan
          font="body-m"
          colorToken="--text-tablecell-body-neutral-default"
        >
          {userInfo.title}
        </TitleSpan>
      </NameWrapper>
      <ButtonWrapper>
        <Button
          data-testid="close_button"
          size="small"
          onClick={handleReject}
          icon={
            <Icon
              name="close_m"
              size={24}
              color="--icon-button-neutral-default"
            />
          }
          loading={declineLoading}
        />
        <Button
          data-testid="accept_button"
          primary
          size="small"
          onClick={handleAccept}
          icon={
            <Icon
              name="tick_m"
              size={24}
              color="--icon-button-neutral-alt-default"
            />
          }
          loading={acceptLoading}
        />
      </ButtonWrapper>
    </ItemWrapper>
  );
};
