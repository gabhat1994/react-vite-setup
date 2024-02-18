import { useMemo, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getFullName } from '@/utils/fullName';
import { Avatar } from '@/components/Avatar/Avatar';
import { SocialHallUtils } from '@/utils/socialHall';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { type Knock, type Maybe, type Skill } from '@/apollo/generated/types';
import { useKnockUser, useRefreshKnocks } from '@/features/socialHall/hooks';
import { useSocialHallCallContext } from '@/providers';
import {
  KnockMessageModalTypeEnum,
  KnockMessageSelectModal,
} from '../../EventModals/KnockMessageSelectModal/KnockMessageSelectModal';
import {
  confirmKnockModalData,
  EventModal,
} from '../../EventModals/EventModal';
import {
  AvatarWrapper,
  ButtonWrapper,
  ItemHeader,
  ItemWrapper,
  NameSpan,
  NameWrapper,
  TagSpan,
  TagWrapper,
  TitleSpan,
  BioSpan,
  ProfileLinkSpan,
} from './styles';
import { KnockStatusEnum, type SideBarUserListItemProps } from '../types';

export const SideBarUserListItem = ({
  userInfo,
  showKnockBtn = true,
  isUserOnCall,
}: SideBarUserListItemProps) => {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openConfirmKnock, setOpenConfirmKnock] = useState<boolean>(false);
  const { onLeaveCall, setMessages } = useSocialHallCallContext();
  const {
    knockUser,
    acceptKnock,
    declineKnock,
    knockLoading,
    acceptLoading,
    declineLoading,
  } = useKnockUser();
  const { userOwnKnocks, userActiveKnocks } = useRefreshKnocks();

  const allKnocks: Maybe<Knock>[] = useMemo(
    () => [...(userOwnKnocks?.data ?? []), ...(userActiveKnocks?.data ?? [])],
    [userOwnKnocks?.data, userActiveKnocks?.data],
  );

  const { knock, status } = useMemo(
    () => SocialHallUtils.getKnockDetails(allKnocks, userInfo.attendeeId?._id!),
    [allKnocks, userInfo],
  );

  const onKnockWithMessage = useCallback(
    (message) => {
      if (message !== null) {
        knockUser(userInfo._id, userInfo.hallGroupId, message);
      }
      setOpenModal(false);
    },
    [userInfo, knockUser],
  );

  const getTopSkills = useCallback(
    (skills) => (skills?.length > 3 ? skills?.slice(0, 3) : skills) || [],
    [],
  );

  const handleKnock = useCallback(() => {
    if (isUserOnCall) {
      setOpenConfirmKnock(true);
    } else {
      setOpenModal(true);
    }
  }, [isUserOnCall]);

  const handleKeepConversation = useCallback(() => {
    setOpenConfirmKnock(false);
  }, []);

  const handleLeaveConversation = useCallback(async () => {
    await onLeaveCall();
    setOpenConfirmKnock(false);
    setOpenModal(true);
  }, [onLeaveCall]);

  const KnockButton = useMemo(() => {
    if (status === KnockStatusEnum.Normal) {
      return (
        <Button
          onClick={handleKnock}
          primary={isFocused}
          secondary={!isFocused}
          size="small"
          loading={knockLoading}
        >
          {t('noumena.social_hall.knock')}
        </Button>
      );
    }

    // When user receive knock
    if (status === KnockStatusEnum.IsKnocked) {
      return (
        <>
          <Button
            data-testid="close_button"
            size="small"
            onClick={() => declineKnock(knock?._id!)}
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
            onClick={() => {
              acceptKnock(knock?._id!);
              setMessages([]);
            }}
            icon={
              <Icon
                name="tick_m"
                size={24}
                color="--icon-button-neutral-alt-default"
              />
            }
            loading={acceptLoading}
          />
        </>
      );
    }

    if (status === KnockStatusEnum.IsKnocking) {
      return (
        <Button size="small" disabled>
          {t('noumena.social_hall.knocking')}
        </Button>
      );
    }

    return (
      <Button secondary size="small">
        {t('noumena.social_hall.knock')}
      </Button>
    );
  }, [
    acceptKnock,
    acceptLoading,
    declineKnock,
    declineLoading,
    handleKnock,
    isFocused,
    knock?._id,
    knockLoading,
    setMessages,
    status,
    t,
  ]);

  const fullName = useMemo(
    () =>
      getFullName(
        userInfo.attendeeId?.firstName,
        userInfo.attendeeId?.middleName,
        userInfo.attendeeId?.lastName,
      ),
    [userInfo.attendeeId],
  );

  const isUnregistered = useMemo(
    () => userInfo.attendeeId?.userStatus === 'UNREGISTERED',
    [userInfo.attendeeId?.userStatus],
  );

  return (
    <ItemWrapper
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      data-testid="item_wrapper"
    >
      <ItemHeader>
        <AvatarWrapper data-testid="avatar_wrapper">
          <Avatar url={userInfo?.attendeeId?.profile?.profilePicture || ''} />
        </AvatarWrapper>
        <NameWrapper>
          <NameSpan colorToken="--text-tablecell-header-neutral-highlighted">
            {userInfo.isHost && (
              <Icon
                name="star_s"
                size={12}
                color="--icon-call-ui-neutral-default"
              />
            )}
            {fullName}
          </NameSpan>
          <TitleSpan colorToken="--text-tablecell-body-neutral-default">
            {isUnregistered
              ? t('noumena.event.event_non_noumena_attendee')
              : userInfo.attendeeId?.title}
          </TitleSpan>
        </NameWrapper>
        {showKnockBtn && <ButtonWrapper>{KnockButton}</ButtonWrapper>}
      </ItemHeader>
      <TagWrapper>
        {getTopSkills(userInfo?.attendeeId?.skills).map((skill: Skill) => (
          <TagSpan
            colorToken="--text-skillbadge-neutral-default"
            key={skill?._id}
            isFocused={isFocused}
          >
            {skill?.name}
          </TagSpan>
        ))}
      </TagWrapper>
      {userInfo.attendeeId?.bio && (
        <BioSpan colorToken="--text-card-neutral-default">
          {userInfo.attendeeId?.bio}
        </BioSpan>
      )}
      <ProfileLinkSpan
        colorToken="--text-card-neutral-default"
        onClick={() =>
          window.open(`/noum/${userInfo.attendeeId?.chamber?._id}`, '_blank')
        }
      >
        {t('noumena.social_hall.see_full_profile')}
      </ProfileLinkSpan>
      <KnockMessageSelectModal
        isOpen={openModal}
        onClose={onKnockWithMessage}
        modalType={KnockMessageModalTypeEnum.knock}
      />
      <EventModal
        isConfirmButtonPrimary
        isOpen={openConfirmKnock}
        onClose={handleLeaveConversation}
        onConfirm={handleKeepConversation}
        {...confirmKnockModalData}
      />
    </ItemWrapper>
  );
};
