import { useMemo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@/components/Avatar/Avatar';

import { notificationRemainTime } from '@/utils/date';
import { Icon } from '@/components/Icon';
import { KnockType } from '@/apollo/generated/types';
import { useKnockUser } from '@/features/socialHall/hooks';
import { Button } from '@/components/Button';
import { knockTimer } from '@/screens/SocialHall/const';
import { InlineAvatar } from '@/components/Avatar/Inline/Inline';
import { UserUtil } from '@/utils/user';
import { useSocialHallContext } from '@/providers/SocialHallProvider';
import { useSocialHallEventContext } from '@/providers/SocialHallEventProvider';
import { useSocialHallCallContext } from '@/providers/SocialHallCallProvider';
import {
  KnockingSpan,
  NameSpan,
  NotificationWrapper,
  TextWrapper,
  ButtonWrapper,
  MainWrapper,
  MessageSpan,
} from './styles';
import { type KnockNotificationProps } from '../types';

export const KnockNotification = ({
  isSingle,
  notification,
  timer = knockTimer,
  isHostJoined,
}: KnockNotificationProps) => {
  const { t } = useTranslation();
  const { socialHallAttendee, showBuzzRoom } = useSocialHallContext();
  const { eventOwner } = useSocialHallEventContext();
  const { setMessages } = useSocialHallCallContext();
  const [remainTime, setRemainTime] = useState(timer);
  const {
    declineKnock,
    acceptKnock,
    acceptLoading,
    declineLoading,
    cancelKnock,
  } = useKnockUser();

  const avatarUrls = useMemo(
    () =>
      notification?.groupInfo?.users?.map((user) =>
        UserUtil.getProfilePicture(user),
      ),
    [notification],
  );

  const acceptKnockHandler = () => {
    acceptKnock(notification?._id!);
    if (!showBuzzRoom) {
      setMessages([]);
    }
  };

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (remainTime > 0) {
        setRemainTime(remainTime - 1000);
      }
      if (remainTime === 0) {
        clearInterval(myInterval);
        cancelKnock(notification?._id!);
        declineKnock(notification?._id!);
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainTime]);

  let Com = null;

  // host has joined the room without knocking
  if (isHostJoined) {
    Com = (
      <NotificationWrapper
        key={notification?._id}
        isBordered={!isSingle}
        data-testid="outgoing_notification_wrapper"
      >
        <MainWrapper>
          <Avatar url={UserUtil.getProfilePicture(eventOwner) || ''} />
          <TextWrapper>
            <KnockingSpan colorToken="--text-card-neutral-default">
              <NameSpan colorToken="--text-card-neutral-highlighted">{`${
                eventOwner?.firstName
              }(${t('noumena.social_hall.host')}) `}</NameSpan>
              {t('noumena.social_hall.has_joined')}
            </KnockingSpan>
          </TextWrapper>
        </MainWrapper>
      </NotificationWrapper>
    );
  }

  // component will render when user knock to remote user
  if (
    notification?.receiverUser ||
    notification?.knockerUserId === socialHallAttendee?.attendeeId?._id
  ) {
    if (notification?.knockStatus === KnockType.Pending && !!remainTime) {
      Com = (
        <NotificationWrapper
          key={notification?._id}
          isBordered={!isSingle}
          data-testid="outgoing_notification_wrapper"
        >
          <MainWrapper>
            <Avatar
              url={UserUtil.getProfilePicture(notification?.knockerUser) ?? ''}
            />
            <TextWrapper>
              <KnockingSpan colorToken="--text-card-neutral-default">
                <NameSpan colorToken="--text-card-neutral-highlighted">
                  {t('noumena.you')}
                </NameSpan>
                {t('noumena.social_hall.are_knocking')}
              </KnockingSpan>
              <KnockingSpan colorToken="--text-card-neutral-default">
                {notificationRemainTime(remainTime)}
              </KnockingSpan>
            </TextWrapper>
            {notification?.receiverUser ? (
              <Avatar
                url={
                  UserUtil.getProfilePicture(notification?.receiverUser) ?? ''
                }
                size="M"
              />
            ) : (
              <InlineAvatar
                urls={avatarUrls || []}
                borderedImage={true}
                size="L"
              />
            )}
          </MainWrapper>
          {notification.knockMessage && (
            <MessageSpan colorToken="--text-card-neutral-highlighted">
              {notification.knockMessage}
            </MessageSpan>
          )}
        </NotificationWrapper>
      );
    }

    // component will render when user receive knock
    if (notification?.knockStatus === KnockType.Declined) {
      Com = (
        <NotificationWrapper
          key={notification?._id}
          isBordered={!isSingle}
          errorBorder
          data-testid="outgoing_notification_declined_wrapper"
        >
          <MainWrapper>
            <Avatar
              url={notification.receiverUser?.profile?.profilePicture || ''}
            />
            <TextWrapper>
              <KnockingSpan colorToken="--text-card-neutral-default">
                <NameSpan colorToken="--text-card-neutral-highlighted">
                  {notification.receiverUser?.firstName}
                </NameSpan>
                {t('noumena.social_hall.declined_knock')}
              </KnockingSpan>
            </TextWrapper>
            <Icon
              name="info_m"
              size={24}
              color="--icon-card-danger-primary-default"
            />
          </MainWrapper>
        </NotificationWrapper>
      );
    }
  }
  // Incase some else is knocking
  else if (notification?.knockerUser?._id) {
    Com = (
      <NotificationWrapper
        key={notification?._id}
        isBordered={!isSingle}
        data-testid="incoming_notification_wrapper"
      >
        <MainWrapper>
          <Avatar
            url={notification?.knockerUser?.profile?.profilePicture || ''}
          />
          <TextWrapper>
            <KnockingSpan colorToken="--text-card-neutral-default">
              <NameSpan colorToken="--text-card-neutral-highlighted">
                {notification?.knockerUser?.firstName}
              </NameSpan>
              {t('noumena.social_hall.is_knocking')}
            </KnockingSpan>
            <KnockingSpan colorToken="--text-card-neutral-default">
              {notification?.knockerUser?.title}
            </KnockingSpan>
          </TextWrapper>
          <ButtonWrapper>
            <Button
              size="small"
              data-testid="close_button"
              onClick={() => declineKnock(notification?._id)}
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
              onClick={() => acceptKnockHandler()}
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
        </MainWrapper>
        {notification?.knockMessage && (
          <MessageSpan colorToken="--text-card-neutral-highlighted">
            {notification?.knockMessage}
          </MessageSpan>
        )}
      </NotificationWrapper>
    );
  }
  return Com;
};
