import { useNavigate } from 'react-router';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { useWindowDimensions, useError } from '@/hooks';
import { useAuth } from '@/features/auth/contexts';
import { useRefreshKnocks } from '@/features/socialHall/hooks';
import { breakpoints } from '@/constants/devices';
import { type IconProps } from '@/components/Icon/Icon';
import {
  useSocialHallCallContext,
  useSocialHallContext,
  useSocialHallEventContext,
} from '@/providers';
import { EventsStatus } from '@/apollo/generated/types';
import ROUTES from '@/constants/routes';
import { SubscriptionType } from '@/screens/SocialHall/types';
import {
  MiddleWrapper,
  MobileBuzzRoomMiddleWrapper,
  RightWrapper,
  Wrapper,
} from './styles';
import {
  type GroupNameWrapperProps,
  type SocialHallHeaderProps,
} from './types';
import {
  hostNotBuzzMenuOption,
  hostPostEventDesktopMenuOptions,
  cohostNotBuzzMenuOption,
} from './data';
import {
  EventModal,
  attendeeLeaveEventModalData,
  cancelEventModalData,
  endEventModalData,
  hostFinishInstantEventModalData,
  hostFinishMainEventModalData,
} from '../EventModals/EventModal';
import LayoutToggle from './LayoutToggle';
import { HeaderCountDownModal } from './HeaderCountDownModal';
import { HeaderDropDownMenu } from './HeaderDropDownMenu';
import HeaderBottomSheet from './HeaderBottomSheet';
import { ToggleBuzzRoomBtn } from './ToggleBuzzRoomBtn';
import { HeaderTimer } from './HeaderTimer';
import { GroupName } from './GroupName';
import { SwitchCamera } from './SwitchCamera';

const GroupNameWrapper = ({
  children,
  isBuzzRoom,
  showMobileView,
}: GroupNameWrapperProps) =>
  showMobileView ? (
    <MobileBuzzRoomMiddleWrapper>{children}</MobileBuzzRoomMiddleWrapper>
  ) : (
    <MiddleWrapper isBuzzRoom={isBuzzRoom}>{children}</MiddleWrapper>
  );

export const HostHeader = ({
  onViewAttendees,
  onInviteAttendees,
  onChangeGroupName,
}: SocialHallHeaderProps) => {
  const { isUnregistered } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const {
    showRaiseHand,
    isShareScreen,
    onExitSocialHallCall,
    isRemoteScreenSharing,
    onSendSubscriptionMessage,
  } = useSocialHallCallContext();
  const { showBuzzRoom, setIsBlockNavigate } = useSocialHallContext();

  const {
    hostJoined,
    eventDetails,
    isMainEvent,
    isPostEvent,
    isEventOwner,
    isEventHost,
    onUpdateEventStatus,
  } = useSocialHallEventContext();
  const { logError } = useError();
  const { userOwnKnocks, userActiveKnocks } = useRefreshKnocks();
  const [loading, setLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [showFinishModal, setShowFinishModal] = useState<boolean>(false);
  const [showEndModal, setShowEndModal] = useState<boolean>(false);
  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false);
  const isMobile = width < breakpoints.TABLET;

  const isScreenSharing = useMemo(
    () => isShareScreen || isRemoteScreenSharing,
    [isShareScreen, isRemoteScreenSharing],
  );

  const isShowEndMainEventBtn = useMemo(
    () =>
      showBuzzRoom && isMobile && (isMainEvent || eventDetails?.isInstantEvent),
    [showBuzzRoom, isMainEvent, isMobile, eventDetails?.isInstantEvent],
  );
  const isEndEvent = useMemo(
    () =>
      EventsStatus.PostEvent === eventDetails?.status ||
      EventsStatus.PostEventEnded === eventDetails?.status,
    [eventDetails?.status],
  );

  const initialNotifications = useMemo(
    () => [...(userOwnKnocks?.data ?? []), ...(userActiveKnocks?.data ?? [])],
    [userOwnKnocks?.data, userActiveKnocks?.data],
  );

  const selectableOptions = useMemo(() => {
    let options = hostNotBuzzMenuOption;
    if (!isEventOwner) {
      options = cohostNotBuzzMenuOption;
    }
    if (isEndEvent) {
      options = hostPostEventDesktopMenuOptions;
    }

    const updatedOptions = options?.map((option) => ({
      ...option,
      icon: (
        <Icon
          name={option.iconName as IconProps['name']}
          color={option.labelColor}
          size={24}
        />
      ),
    }));
    return updatedOptions;
  }, [isEndEvent, isEventOwner]);

  const onUpdateEvent = useCallback(
    async (status: EventsStatus) => {
      try {
        setLoading(true);
        await onUpdateEventStatus(status);
      } catch (err) {
        logError(err, '');
      } finally {
        setLoading(false);
      }
    },
    [logError, onUpdateEventStatus],
  );

  const onStartMainEvent = useCallback(async () => {
    await onUpdateEvent(EventsStatus.PreLive);
  }, [onUpdateEvent]);

  const leaveAndCancelEvent = useCallback(async () => {
    setShowEndModal(false);
    setShowCancelModal(false);
    setIsBlockNavigate(false);
    let status = eventDetails?.recurring
      ? EventsStatus.Expired
      : EventsStatus.Cancelled;
    if (isPostEvent) {
      status = EventsStatus.PostEventEnded;
    }
    await onUpdateEventStatus?.(status);
  }, [
    setIsBlockNavigate,
    isPostEvent,
    onUpdateEventStatus,
    eventDetails?.recurring,
  ]);

  const handleLeaveEvent = useCallback(async () => {
    setShowLeaveModal(false);
    await onExitSocialHallCall();
    navigate(isUnregistered ? ROUTES.GUEST_HOME : ROUTES.HOME_NOUM);
  }, [onExitSocialHallCall, navigate, isUnregistered]);

  const onFinishEvent = useCallback(async () => {
    onSendSubscriptionMessage({
      type: SubscriptionType.UPDATE_EVENT_STATUS,
      data: EventsStatus.Cancelled,
    });
    setShowFinishModal(false);
    // @TODO: for instant call event are canceled, but for Networking post event will start
    await onUpdateEvent(EventsStatus.Cancelled);
  }, [onUpdateEvent, onSendSubscriptionMessage]);

  const handleSelectOptions = useCallback(
    (option) => {
      switch (option.value) {
        case 'start_main_event':
          onStartMainEvent();
          break;
        case 'invite_users':
          onInviteAttendees?.();
          break;
        case 'leave_and_cancel_event':
          setShowCancelModal(true);
          break;
        case 'see_event_attendees':
          onViewAttendees?.();
          break;
        case 'leave_event':
          setShowLeaveModal(true);
          break;
        case 'copy_the_event_link':
          navigator.clipboard.writeText(`${window.location}` ?? '');
          break;
      }
    },
    [onStartMainEvent, onInviteAttendees, onViewAttendees],
  );

  const hostEndEventModalProps = useMemo(
    () =>
      isMainEvent
        ? hostFinishMainEventModalData
        : hostFinishInstantEventModalData,
    [isMainEvent],
  );

  const showMobileView = useMemo(
    () =>
      isMobile &&
      showBuzzRoom &&
      !(initialNotifications.length > 0 || hostJoined) &&
      !(isMainEvent && isEventHost && showRaiseHand),
    [
      isMobile,
      showBuzzRoom,
      initialNotifications.length,
      hostJoined,
      isMainEvent,
      isEventHost,
      showRaiseHand,
    ],
  );

  return (
    <Wrapper isRow={showBuzzRoom || isMainEvent} data-testid="host_header">
      <ToggleBuzzRoomBtn />
      <GroupNameWrapper
        showMobileView={showMobileView}
        isBuzzRoom={showBuzzRoom}
      >
        <GroupName
          onChangeGroupName={onChangeGroupName}
          showMobileView={showMobileView}
        />
        <HeaderTimer />
      </GroupNameWrapper>

      <RightWrapper isBuzzRoom={showBuzzRoom}>
        {eventDetails?.status === EventsStatus.PreEvent && !showBuzzRoom && (
          <Button
            size={isMobile ? 'full_small' : 'small'}
            primary
            loading={loading}
            onClick={() => onStartMainEvent()}
            leftIcon={
              <Icon
                color="--icon-button-neutral-alt-default"
                name="wave_left_m"
                size={24}
              />
            }
            rightIcon={
              <Icon
                color="--icon-button-neutral-alt-default"
                name="wave_right_m"
                size={24}
              />
            }
            data-testid="start_event_button"
          >
            {t('noumena.social_hall.start_main_event')}
          </Button>
        )}

        <SwitchCamera />

        {showBuzzRoom && (
          <>
            {!isMobile && <LayoutToggle isScreenSharing={isScreenSharing} />}
            <HeaderBottomSheet
              onChangeGroupName={onChangeGroupName}
              isScreenSharing={isScreenSharing}
            />
          </>
        )}

        {isShowEndMainEventBtn && (
          <Button
            size="small"
            intent="negative"
            loading={loading}
            onClick={() => setShowFinishModal(true)}
            data-testid="finish_main_event"
          >
            {isMobile
              ? t('noumena.socialhall.end_the_event')
              : t('noumena.social_hall.finish_main_event')}
          </Button>
        )}

        {isEndEvent && !showBuzzRoom && (
          <Button
            size="full_small"
            secondary
            intent="negative"
            loading={loading}
            onClick={() => setShowEndModal(true)}
            data-testid="end_event"
          >
            {t('noumena.social_hall.end_event')}
          </Button>
        )}

        {!showBuzzRoom && (
          <HeaderDropDownMenu
            options={selectableOptions}
            onSelectOption={handleSelectOptions}
          />
        )}
      </RightWrapper>
      {!eventDetails?.isInstantEvent && <HeaderCountDownModal />}
      <EventModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={leaveAndCancelEvent}
        {...cancelEventModalData}
      />
      <EventModal
        isOpen={showFinishModal}
        onClose={() => setShowFinishModal(false)}
        onConfirm={onFinishEvent}
        {...hostEndEventModalProps}
      />
      <EventModal
        isOpen={showEndModal}
        onClose={() => setShowEndModal(false)}
        onConfirm={leaveAndCancelEvent}
        {...endEventModalData}
      />
      <EventModal
        isOpen={showLeaveModal}
        onClose={() => setShowLeaveModal(false)}
        onConfirm={handleLeaveEvent}
        isConfirmButtonPrimary
        {...attendeeLeaveEventModalData}
      />
    </Wrapper>
  );
};
