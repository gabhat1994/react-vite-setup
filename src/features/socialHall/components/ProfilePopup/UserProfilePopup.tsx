import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getFullName } from '@/utils/fullName';
import { Avatar } from '@/components/Avatar/Avatar';
import { Button } from '@/components/Button';
import { type Knock, type Maybe, type Skill } from '@/apollo/generated/types';
import { Icon } from '@/components/Icon';
import { SocialHallUtils } from '@/utils/socialHall';
import { UserUtil } from '@/utils/user';
import { useKnockUser, useRefreshKnocks } from '@/features/socialHall/hooks';
import { useSocialHallCallContext } from '@/providers/SocialHallCallProvider';
import { useSocialHallContext } from '@/providers/SocialHallProvider';
import { KnockStatusEnum } from '../SideBar/types';
import {
  KnockMessageModalTypeEnum,
  KnockMessageSelectModal,
} from '../EventModals/KnockMessageSelectModal/KnockMessageSelectModal';
import { EventModal } from '../EventModals/EventModal';
import { confirmKnockModalData } from '../EventModals/EventModal/data';
import {
  AvatarWrapper,
  ItemHeader,
  ItemWrapper,
  NameSpan,
  NameWrapper,
  TagSpan,
  TagWrapper,
  TitleSpan,
  BioSpan,
  ProfileLinkSpan,
  ButtonWrapper,
} from './styles';
import { type UserProfilePopupProps } from './types';

export const UserProfilePopup = ({
  showUserPopup,
  attendeeId,
  onCloseUserPopup,
}: UserProfilePopupProps) => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openConfirmKnock, setOpenConfirmKnock] = useState<boolean>(false);
  const {
    knockUser,
    acceptKnock,
    declineKnock,
    knockLoading,
    acceptLoading,
    declineLoading,
  } = useKnockUser();
  const { userOwnKnocks, userActiveKnocks } = useRefreshKnocks();
  const { onLeaveCall } = useSocialHallCallContext();
  const {
    socialHallAttendeesAndGroups,
    socialHallAttendee,
    userActiveGroupData,
  } = useSocialHallContext();

  const allKnocks: Maybe<Knock>[] = useMemo(
    () => [...(userOwnKnocks?.data ?? []), ...(userActiveKnocks?.data ?? [])],
    [userOwnKnocks?.data, userActiveKnocks?.data],
  );

  const userInfo = useMemo(() => {
    const attendees =
      socialHallAttendeesAndGroups?.data?.socialHallAttendee?.data;
    return attendees?.filter(
      (attendee) => attendee?.attendeeId?._id === attendeeId,
    )[0];
  }, [socialHallAttendeesAndGroups, attendeeId]);

  const { knock, status } = useMemo(
    () =>
      SocialHallUtils.getKnockDetails(allKnocks, userInfo?.attendeeId?._id!),
    [allKnocks, userInfo],
  );

  const isUserOnCall = useMemo(
    () => !!userActiveGroupData?.data?.userActiveSocialHallGroup?._id,
    [userActiveGroupData?.data?.userActiveSocialHallGroup?._id],
  );

  const handleKnock = useCallback(() => {
    if (isUserOnCall) {
      setOpenConfirmKnock(true);
    } else {
      setOpenModal(true);
    }
  }, [isUserOnCall]);

  const onKnockWithMessage = useCallback(
    (message) => {
      if (message !== null) {
        knockUser(userInfo?._id, userInfo?.hallGroupId, message);
      }
      setOpenModal(false);
    },
    [knockUser, userInfo],
  );

  const getTopSkills = useCallback(
    (skills) => (skills?.length > 3 ? skills?.slice(0, 3) : skills) || [],
    [],
  );

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
          secondary
          size="small"
          loading={knockLoading}
          onClick={handleKnock}
          data-testid="knock_button"
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
            onClick={() => acceptKnock(knock?._id!)}
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
    t,
    knock,
    status,
    handleKnock,
    acceptKnock,
    declineKnock,
    knockLoading,
    acceptLoading,
    declineLoading,
  ]);

  useEffect(() => {
    if (!userInfo) {
      onCloseUserPopup();
    }
  }, [userInfo, onCloseUserPopup]);

  return (
    <ItemWrapper data-testid="item_wrapper" isHidden={!showUserPopup}>
      <ItemHeader>
        <AvatarWrapper data-testid="avatar_wrapper">
          <Avatar
            url={UserUtil.getProfilePicture(userInfo?.attendeeId) ?? ''}
          />
        </AvatarWrapper>
        <NameWrapper>
          <NameSpan colorToken="--text-tablecell-header-neutral-highlighted">
            {getFullName(
              userInfo?.attendeeId?.firstName,
              userInfo?.attendeeId?.middleName,
              userInfo?.attendeeId?.lastName,
            )}
          </NameSpan>
          <TitleSpan colorToken="--text-tablecell-body-neutral-default">
            {userInfo?.attendeeId?.title}
          </TitleSpan>
        </NameWrapper>
        {socialHallAttendee?._id !== userInfo?._id && (
          <ButtonWrapper>{KnockButton}</ButtonWrapper>
        )}
        <Button
          size="small"
          icon={
            <Icon
              name="close_m"
              size={24}
              color="--icon-button-neutral-alt-default"
            />
          }
          onClick={onCloseUserPopup}
        />
      </ItemHeader>
      <TagWrapper>
        {getTopSkills(userInfo?.attendeeId?.skills).map((skill: Skill) => (
          <TagSpan
            colorToken="--text-skillbadge-neutral-default"
            key={skill?._id}
          >
            {skill?.name}
          </TagSpan>
        ))}
      </TagWrapper>
      <BioSpan colorToken="--text-card-neutral-default">
        {userInfo?.attendeeId?.bio}
      </BioSpan>
      <ProfileLinkSpan
        colorToken="--text-card-neutral-default"
        onClick={() =>
          window.open(`/noum/${userInfo?.attendeeId?.chamber?._id}`, '_blank')
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
