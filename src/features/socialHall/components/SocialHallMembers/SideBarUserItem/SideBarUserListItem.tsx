import { useState, useCallback, useMemo } from 'react';
import { t } from 'i18next';
import { getFullName } from '@/utils/fullName';
import { Avatar } from '@/components/Avatar/Avatar';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { useToggle, useWindowDimensions } from '@/hooks';
import {
  useAttendeeManagement,
  useMediaPreviewSettings,
  useRaiseHandApi,
} from '@/features/socialHall/hooks';
import { TSpan } from '@/components/Typography';
import {
  useSocialHallCallContext,
  useSocialHallContext,
  useSocialHallEventContext,
} from '@/providers';
import { Dropdown, type DropdownTargetProps } from '@/components/Dropdown';
import { EventCancelAttendeeModal } from '@/features/events/components';
import { Stack } from '@/layout';
import { breakpoints } from '@/constants/devices';
import { UserRole } from '@/apollo/generated/types';
import { kickUserModalData } from '../../EventModals/EventModal/data';
import {
  AvatarWrapper,
  ButtonWrapper,
  ItemWrapper,
  NameSpan,
  NameWrapper,
  OfflineBadge,
  OfflineWrapper,
  StatusTag,
  ThreeDotsIconWrapper,
  TitleSpan,
} from './styles';
import { SideBarType, type SideBarUserItemProps } from '../types';

const mobileDropdownStyles = {
  backgroundColor: 'var(--bg-button-neutral-default)',
  marginBottom: '16px',
};

export const SideBarUserItem: React.FC<SideBarUserItemProps> = ({
  user,
  isInvited,
  isOffline,
  sideBarType,
  refetchAudience,
}) => {
  const { onDeclineRaiseHand, onAcceptRaiseHand } = useRaiseHandApi();
  const [declineLoading, setDeclineLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [showBlockUserPopup, toggleBlockUserPopup] = useToggle();
  const { onBlockUser } = useAttendeeManagement();
  const { eventDetails } = useSocialHallEventContext();
  const { mutedUsers } = useSocialHallCallContext();

  const { isHost, speakerInvitation } = useSocialHallContext();
  const { width } = useWindowDimensions();
  const isMobile = useMemo(() => width <= breakpoints.MOBILE_MAX, [width]);

  const fullName = useMemo(
    () => getFullName(user?.firstName, user?.middleName, user?.lastName),
    [user],
  );

  const { handleSelectOptions, selectableOptions } = useMediaPreviewSettings({
    isInvited: isInvited?.(user._id),
    isMuted: mutedUsers.includes(user._id),
    invitationStatus: user.invitationStatus,
    refetchAudience,
    toggleBlockUserPopup,
    ...user,
  });

  const handleKickUser = useCallback(() => {
    onBlockUser(user._id, eventDetails?._id!, fullName, true);
    toggleBlockUserPopup();
  }, [
    user._id,
    eventDetails?._id,
    fullName,
    onBlockUser,
    toggleBlockUserPopup,
  ]);

  const userType = useMemo(
    () => ({
      onStage: sideBarType === SideBarType.ON_STAGE,
      isRaisedHand: sideBarType === SideBarType.RAISED_HAND,
      isAudience: sideBarType === SideBarType.AUDIENCE,
    }),
    [sideBarType],
  );
  const invited = useMemo(
    () => speakerInvitation?.invitee?._id === user._id,
    [speakerInvitation?.invitee?._id, user._id],
  );

  const handleAccept = useCallback(async () => {
    setAcceptLoading(true);
    await onAcceptRaiseHand(user._id);
    setAcceptLoading(false);
  }, [onAcceptRaiseHand, user._id]);

  const handleReject = useCallback(async () => {
    setDeclineLoading(true);
    await onDeclineRaiseHand(user._id);
    setDeclineLoading(false);
  }, [onDeclineRaiseHand, user._id]);

  const usersRole = useMemo(
    () =>
      userType.onStage &&
      user.getEventUserRole?.userRole === (UserRole.Host || UserRole.Cohost),
    [user.getEventUserRole?.userRole, userType.onStage],
  );

  return (
    <ItemWrapper>
      <AvatarWrapper data-testid="avatar_wrapper">
        {isOffline && (
          <OfflineWrapper>
            <Icon imageIconName="low_connection_xs" size={24} />
          </OfflineWrapper>
        )}
        <Avatar url={user?.profile?.profilePicture || ''} />
      </AvatarWrapper>
      <NameWrapper>
        <Stack gap={5} align="center">
          {usersRole && (
            <Icon
              color="--icon-call-ui-neutral-default"
              name="star_s"
              size={12}
            />
          )}
          <NameSpan
            colorToken="--text-tablecell-header-neutral-highlighted"
            font="body-m-bold"
          >
            {fullName}
          </NameSpan>
        </Stack>
        <TitleSpan
          font="footnote"
          colorToken="--text-tablecell-body-neutral-default"
        >
          {user.title}
        </TitleSpan>
      </NameWrapper>
      {isOffline && (
        <OfflineBadge>
          <TSpan
            font="body-s-bold"
            colorToken="--text-badge-danger-secondary-default"
          >
            {t('noumena.social_hall.network.offline')}
          </TSpan>
        </OfflineBadge>
      )}
      <ButtonWrapper>
        {userType.isAudience && isHost && invited && !isOffline && (
          <StatusTag>
            <TSpan
              font="footnote-bold"
              colorToken="--text-call-ui-brand-primary-default"
            >
              {t('noumena.social_hall.invite_status.invited')}
            </TSpan>
          </StatusTag>
        )}
        {userType.onStage && !isOffline && (
          <>
            <Icon
              name={user.isMuted ? 'mic_off_m' : 'mic_on_m'}
              size={24}
              color="--icon-card-neutral-default"
            />
            <Icon
              color="--icon-card-neutral-default"
              name={user.isCameraEnable ? 'webcam_on_m' : 'webcam_off_m'}
              size={24}
            />
          </>
        )}
        {userType.isRaisedHand && !isOffline && (
          <>
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
          </>
        )}
        {(userType.onStage || userType.isAudience) && isHost && (
          <Dropdown
            containerWidth="280px"
            containerHeight="fit-content"
            hideIcons={false}
            closeOnSelect
            onSelectOption={handleSelectOptions}
            options={selectableOptions}
            usePortal
            isAnimation={false}
            observerMinHeight="0"
            renderContainerFromBottom={isMobile}
            dropdownItemStyle={isMobile ? mobileDropdownStyles : {}}
          >
            {({
              targetRef,
              targetProps,
              toggle,
            }: DropdownTargetProps<HTMLDivElement>) => (
              <ThreeDotsIconWrapper
                ref={targetRef}
                onClick={toggle}
                {...targetProps}
              >
                <Icon
                  color="--icon-card-neutral-default"
                  name="more_m"
                  size={24}
                />
              </ThreeDotsIconWrapper>
            )}
          </Dropdown>
        )}
      </ButtonWrapper>
      <EventCancelAttendeeModal
        isOpen={showBlockUserPopup}
        onClose={toggleBlockUserPopup}
        onConfirm={handleKickUser}
        {...kickUserModalData(fullName)}
      />
    </ItemWrapper>
  );
};
