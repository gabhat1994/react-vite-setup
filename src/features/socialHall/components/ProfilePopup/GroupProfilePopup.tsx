import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getFullName } from '@/utils/fullName';
import { Button } from '@/components/Button';
import { Avatar } from '@/components/Avatar/Avatar';
import { Icon } from '@/components/Icon';
import { SocialHallUtils } from '@/utils/socialHall';
import {
  type Knock,
  type Maybe,
  type UserOutput,
} from '@/apollo/generated/types';
import { UserUtil } from '@/utils/user';
import { useSocialHallContext } from '@/providers/SocialHallProvider';
import { useSocialHallCallContext } from '@/providers/SocialHallCallProvider';
import { useSocialHallEventContext } from '@/providers/SocialHallEventProvider';
import { useKnockUser, useRefreshKnocks } from '@/features/socialHall/hooks';
import {
  KnockMessageModalTypeEnum,
  KnockMessageSelectModal,
} from '../EventModals/KnockMessageSelectModal/KnockMessageSelectModal';
import { KnockStatusEnum } from '../SideBar/types';
import { confirmKnockModalData, EventModal } from '../EventModals/EventModal';
import {
  ItemHeader,
  NameSpan,
  NameWrapper,
  ItemWrapper,
  TitleSpan,
  UsersWrapper,
  UserWrapper,
  AvatarWrapper,
} from './styles';
import { type GroupProfilePopupProps } from './types';

export const GroupProfilePopup = ({
  groupId,
  showGroupPopup,
  onCloseGroupPopup,
}: GroupProfilePopupProps) => {
  const { t } = useTranslation();
  const {
    socialHallAttendeesAndGroups,
    socialHallAttendee,
    userActiveGroupData,
  } = useSocialHallContext();

  const { onLeaveCall } = useSocialHallCallContext();
  const { isEventHost } = useSocialHallEventContext();
  const {
    knockUser,
    declineKnock,
    acceptKnock,
    knockLoading,
    declineLoading,
    acceptLoading,
  } = useKnockUser();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openConfirmKnock, setOpenConfirmKnock] = useState<boolean>(false);
  const groupInfo = useMemo(() => {
    const groups = socialHallAttendeesAndGroups?.data?.socialHallGroups?.data;
    return groups?.filter((group) => group?._id === groupId)[0];
  }, [socialHallAttendeesAndGroups, groupId]);
  const { userOwnKnocks, userActiveKnocks } = useRefreshKnocks();

  const allKnocks: Maybe<Knock>[] = useMemo(
    () => [...(userOwnKnocks?.data ?? []), ...(userActiveKnocks?.data ?? [])],
    [userOwnKnocks?.data, userActiveKnocks?.data],
  );

  const { knock, status } = useMemo(
    () =>
      SocialHallUtils.getGroupKnockDetails(
        allKnocks,
        socialHallAttendee?.attendeeId?._id!,
      ),
    [allKnocks, socialHallAttendee],
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

  const hideJoinButton = useCallback(
    () =>
      SocialHallUtils.isUserInGroupCall(
        socialHallAttendee?.attendeeId?._id ?? '',
        (groupInfo?.users ?? []) as UserOutput[],
      ),
    [socialHallAttendee, groupInfo],
  );

  const handleKeepConversation = useCallback(() => {
    setOpenConfirmKnock(false);
  }, []);

  const handleLeaveConversation = useCallback(async () => {
    await onLeaveCall();
    setOpenConfirmKnock(false);
    setOpenModal(true);
  }, [onLeaveCall]);

  const onKnockWithMessage = useCallback(
    (message) => {
      if (message !== null) {
        knockUser(null, groupInfo?._id, message);
      }
      setOpenModal(false);
    },
    [groupInfo, knockUser],
  );

  const KnockButton = useMemo(() => {
    if (status === KnockStatusEnum.Normal) {
      return (
        <Button
          data-testid="join_button"
          primary
          size="small"
          onClick={handleKnock}
          loading={knockLoading}
        >
          {t(
            isEventHost
              ? 'noumena.social_hall.knock'
              : 'noumena.social_hall.join',
          )}
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

    return null;
  }, [
    t,
    knock,
    status,
    isEventHost,
    acceptKnock,
    handleKnock,
    declineKnock,
    knockLoading,
    acceptLoading,
    declineLoading,
  ]);

  const groupName = useMemo(
    () => groupInfo?.name || groupInfo?.channelName,
    [groupInfo],
  );

  return (
    <ItemWrapper data-testid="item_wrapper" isHidden={!showGroupPopup}>
      <ItemHeader>
        <NameWrapper>
          <NameSpan colorToken="--text-tablecell-header-neutral-highlighted">
            {groupName}
          </NameSpan>
          <TitleSpan
            colorToken="--text-tablecell-body-neutral-default"
            data-testid="members_count"
          >
            {t('noumena.social_hall.members', {
              memberCount: groupInfo?.users?.length,
            })}
          </TitleSpan>
        </NameWrapper>
        {!hideJoinButton() && KnockButton}
        <Button
          size="small"
          icon={
            <Icon
              color="--icon-button-neutral-default"
              name="close_m"
              size={24}
            />
          }
          onClick={onCloseGroupPopup}
        />
      </ItemHeader>
      <UsersWrapper>
        {groupInfo?.users?.map((user) => (
          <UserWrapper
            key={user?._id}
            onClick={() => UserUtil.goToUserProfile(user)}
          >
            <AvatarWrapper>
              <Avatar url={user?.profile?.profilePicture || ''} size="M" />
            </AvatarWrapper>
            <NameWrapper>
              <NameSpan colorToken="--text-tablecell-header-neutral-highlighted">
                {getFullName(user?.firstName, user?.middleName, user?.lastName)}
              </NameSpan>
              <TitleSpan colorToken="--text-tablecell-body-neutral-default">
                {user?.title}
              </TitleSpan>
            </NameWrapper>
            <Button
              size="small"
              icon={
                <Icon
                  name="chevron_small_right_m"
                  size={24}
                  color="--icon-tablecell-neutral-default"
                />
              }
            />
          </UserWrapper>
        ))}
      </UsersWrapper>
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
