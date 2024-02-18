import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getFullName } from '@/utils/fullName';
import {
  type Knock,
  type Maybe,
  type UserOutput,
} from '@/apollo/generated/types';
import { Button } from '@/components/Button';
import { Avatar } from '@/components/Avatar/Avatar';
import { Icon } from '@/components/Icon';
import { SocialHallUtils } from '@/utils/socialHall';
import {
  useSocialHallCallContext,
  useSocialHallContext,
  useSocialHallEventContext,
} from '@/providers';
import { useKnockUser, useRefreshKnocks } from '@/features/socialHall/hooks';
import { UserUtil } from '@/utils/user';
import {
  KnockMessageModalTypeEnum,
  KnockMessageSelectModal,
} from '../../EventModals/KnockMessageSelectModal/KnockMessageSelectModal';
import {
  confirmKnockModalData,
  EventModal,
} from '../../EventModals/EventModal';
import {
  ItemHeader,
  NameSpan,
  NameWrapper,
  ItemWrapper,
  TitleSpan,
  UsersWrapper,
  UserWrapper,
  AvatarWrapper,
  IconButton,
} from './styles';
import { KnockStatusEnum, type SideBarGroupListItemProps } from '../types';

export const SideBarGroupListItem = ({
  groupInfo,
  isUserOnCall,
}: SideBarGroupListItemProps) => {
  const { t } = useTranslation();
  const {
    knockUser,
    declineKnock,
    acceptKnock,
    joinGroupAsHost,
    knockLoading,
    declineLoading,
    acceptLoading,
    joiningGroupAsHost,
  } = useKnockUser();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openConfirmKnock, setOpenConfirmKnock] = useState<boolean>(false);
  const { isEventHost } = useSocialHallEventContext();
  const { socialHallAttendee } = useSocialHallContext();
  const { onLeaveCall } = useSocialHallCallContext();
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

  const handleKeepConversation = useCallback(() => {
    setOpenConfirmKnock(false);
  }, []);

  const handleLeaveConversation = useCallback(async () => {
    await onLeaveCall;
    setOpenConfirmKnock(false);
    setOpenModal(true);
  }, [onLeaveCall]);

  const hideJoinButton = useCallback(
    () =>
      SocialHallUtils.isUserInGroupCall(
        socialHallAttendee?.attendeeId?._id ?? '',
        (groupInfo.users ?? []) as UserOutput[],
      ),
    [socialHallAttendee, groupInfo],
  );

  const onKnockWithMessage = useCallback(
    (message) => {
      if (message !== null) {
        knockUser(null, groupInfo._id, message);
      }
      setOpenModal(false);
    },
    [groupInfo._id, knockUser],
  );

  const handleKnockJoin = useCallback(async () => {
    if (isUserOnCall) {
      setOpenConfirmKnock(true);
    } else if (isEventHost) {
      await onLeaveCall();
      await joinGroupAsHost(groupInfo._id);
    } else {
      setOpenModal(true);
    }
  }, [groupInfo._id, isEventHost, joinGroupAsHost, onLeaveCall, isUserOnCall]);

  const KnockButton = useMemo(() => {
    if (status === KnockStatusEnum.Normal) {
      return (
        <Button
          data-testid="join_button"
          onClick={handleKnockJoin}
          primary
          size="small"
          loading={knockLoading || joiningGroupAsHost}
        >
          {t(
            isEventHost
              ? 'noumena.social_hall.join'
              : 'noumena.social_hall.knock',
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
    status,
    handleKnockJoin,
    knockLoading,
    joiningGroupAsHost,
    t,
    isEventHost,
    declineLoading,
    acceptLoading,
    declineKnock,
    knock?._id,
    acceptKnock,
  ]);

  const groupName = useMemo(
    () => groupInfo.name || groupInfo.channelName,
    [groupInfo],
  );

  return (
    <ItemWrapper data-testid="item_wrapper">
      <ItemHeader>
        <NameWrapper>
          <NameSpan
            colorToken="--text-tablecell-header-neutral-highlighted"
            isGroup
          >
            {groupName}
          </NameSpan>
          <TitleSpan
            colorToken="--text-tablecell-body-neutral-default"
            data-testid="members_count"
          >
            {t('noumena.social_hall.members', {
              memberCount: groupInfo.users?.length,
            })}
          </TitleSpan>
        </NameWrapper>
        {!hideJoinButton() && KnockButton}
      </ItemHeader>
      <UsersWrapper>
        {groupInfo.users?.map((user) => (
          <UserWrapper
            key={user?._id}
            onClick={() => UserUtil.goToUserProfile(user)}
          >
            <AvatarWrapper>
              <Avatar url={user?.profile?.profilePicture || ''} size="M" />
            </AvatarWrapper>
            <NameWrapper>
              <NameSpan colorToken="--text-tablecell-header-neutral-highlighted">
                {groupInfo.hosts?.includes(user?._id!) && (
                  <Icon
                    color="--icon-call-ui-neutral-default"
                    name="star_s"
                    size={12}
                  />
                )}
                {getFullName(user?.firstName, user?.middleName, user?.lastName)}
              </NameSpan>
              <TitleSpan colorToken="--text-tablecell-body-neutral-default">
                {user?.title}
              </TitleSpan>
            </NameWrapper>
            <IconButton>
              <Icon
                name="chevron_small_right_m"
                size={24}
                color="--icon-tablecell-neutral-default"
              />
            </IconButton>
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
