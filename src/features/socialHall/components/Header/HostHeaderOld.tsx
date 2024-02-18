import { useNavigate } from 'react-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { useWindowDimensions, useError } from '@/hooks';
import { useAuth } from '@/features/auth/contexts';
import { useHeaderTimer, useRefreshKnocks } from '@/features/socialHall/hooks';
import { breakpoints } from '@/constants/devices';
import { Dropdown, type DropdownTargetProps } from '@/components/Dropdown';
import { type IconProps } from '@/components/Icon/Icon';
import {
  useSocialHallCallContext,
  useSocialHallContext,
  useSocialHallEventContext,
} from '@/providers';
import { EventsStatus } from '@/apollo/generated/types';
import ROUTES from '@/constants/routes';
import {
  EventModal,
  attendeeLeaveEventModalData,
  cancelEventModalData,
  countDownModalData,
  endEventModalData,
  hostFinishMainEventModalData,
} from '../EventModals/EventModal';
import {
  hostNotBuzzMenuOption,
  hostBuzzMobileMenuOptions,
  hostBuzzDesktopMenuOptions,
  hostPostEventDesktopMenuOptions,
  cohostNotBuzzMenuOption,
} from './data';
import { type SocialHallHeaderProps } from './types';
import {
  CounterClockSpan,
  IconButton,
  MiddleWrapper,
  MobileBuzzRoomMiddleWrapper,
  RightWrapper,
  TitleSpan,
  TitleWrapper,
  Wrapper,
  DropdownWrapper,
} from './styles';
import { EventTag } from './EventTag';
import { ToggleBuzzRoomBtn } from './ToggleBuzzRoomBtn';

export const HostHeaderOld = ({
  onViewAttendees,
  onInviteAttendees,
  onChangeGroupName,
}: SocialHallHeaderProps) => {
  const { isUnregistered } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const { onLeaveCall, showRaiseHand, onExitSocialHallCall } =
    useSocialHallCallContext();
  const { showBuzzRoom, setShowBuzzRoom, setIsBlockNavigate } =
    useSocialHallContext();

  const {
    groupName,
    hostJoined,
    onUpdateEventStatus,
    eventDetails,
    isMainEvent,
    isPostEvent,
    isEndedEvent,
    isEventOwner,
    isEventHost,
    isPreEvent,
  } = useSocialHallEventContext();
  const { logError } = useError();
  const { formattedTime, remainTime } = useHeaderTimer();
  const { userOwnKnocks, userActiveKnocks } = useRefreshKnocks();
  const [loading, setLoading] = useState(false);
  const [isLoadingLeaveCall, setIsLoadingLeaveCall] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [showFinishModal, setShowFinishModal] = useState<boolean>(false);
  const [showEndModal, setShowEndModal] = useState<boolean>(false);
  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false);
  const [showCountDownModal, setShowCountDownModal] = useState<boolean>(false);
  const isDesktop = width >= breakpoints.LAPTOP_L;
  const isMobile = width < breakpoints.TABLET;

  const onLeaveQuietly = useCallback(async () => {
    try {
      setIsLoadingLeaveCall(true);
      setShowBuzzRoom(false);
      await onLeaveCall();
      setIsLoadingLeaveCall(false);
    } catch (err) {
      logError(err, '', false);
    }
  }, [logError, onLeaveCall, setShowBuzzRoom]);

  const isEndMainEvent = useMemo(
    () => showBuzzRoom && isMainEvent,
    [showBuzzRoom, isMainEvent],
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
    } else if (showBuzzRoom && !isMainEvent) {
      options = isMobile
        ? hostBuzzMobileMenuOptions
        : hostBuzzDesktopMenuOptions;
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
  }, [showBuzzRoom, isMobile, isMainEvent, isEndEvent, isEventOwner]);

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

  const onStartPostEvent = useCallback(async () => {
    await onUpdateEvent(EventsStatus.PostEvent);
    onLeaveQuietly();
  }, [onUpdateEvent, onLeaveQuietly]);

  const leaveAndCancelEvent = useCallback(async () => {
    setShowEndModal(false);
    setShowCancelModal(false);
    setIsBlockNavigate(false);
    let status = EventsStatus.Cancelled;
    if (isPostEvent) {
      status = EventsStatus.PostEventEnded;
    }
    await onUpdateEventStatus?.(status);
  }, [setIsBlockNavigate, isPostEvent, onUpdateEventStatus]);

  const handleLeaveEvent = useCallback(async () => {
    setShowLeaveModal(false);
    await onExitSocialHallCall();
    navigate(isUnregistered ? ROUTES.GUEST_HOME : ROUTES.HOME_NOUM);
  }, [onExitSocialHallCall, navigate, isUnregistered]);

  const finishEvent = useCallback(async () => {
    setShowFinishModal(false);
    await onStartPostEvent();
  }, [onStartPostEvent]);

  const handleSelectOptions = useCallback(
    (option) => {
      switch (option.value) {
        case 'start_main_event':
          onStartMainEvent();
          break;
        case 'change_room_name':
          onChangeGroupName?.();
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
    [onStartMainEvent, onChangeGroupName, onInviteAttendees, onViewAttendees],
  );

  useEffect(() => {
    if (
      eventDetails?.status === EventsStatus.PreLive &&
      remainTime / 1000 < 4 &&
      remainTime / 1000 > 3
    ) {
      setShowCountDownModal(true);
    }
  }, [eventDetails?.status, remainTime]);

  return (
    <Wrapper isRow={showBuzzRoom || isMainEvent} data-testid="host_header">
      <ToggleBuzzRoomBtn />
      {isMobile &&
      showBuzzRoom &&
      !(initialNotifications.length > 0 || hostJoined) &&
      !(isMainEvent && isEventHost && showRaiseHand) ? (
        <MobileBuzzRoomMiddleWrapper>
          <EventTag />
          <TitleWrapper>
            <TitleSpan
              font="body-xl-bold"
              isGray={showBuzzRoom && !groupName && !isMainEvent}
            >
              {showBuzzRoom && !isMainEvent
                ? groupName || t('noumena.social_hall.add_group_name')
                : eventDetails?.title}
            </TitleSpan>
          </TitleWrapper>
          {!isPostEvent && !isEndedEvent && (
            <CounterClockSpan
              font="systemInfo-m"
              isCountDown={
                eventDetails?.status === EventsStatus.PreLive ||
                eventDetails?.status === EventsStatus.PostEventEnded
              }
              data-testid="counter_clock"
            >
              {formattedTime}
            </CounterClockSpan>
          )}
        </MobileBuzzRoomMiddleWrapper>
      ) : (
        <MiddleWrapper isBuzzRoom={showBuzzRoom}>
          <TitleWrapper>
            <EventTag />
            <TitleSpan
              font="body-xl-bold"
              isGray={showBuzzRoom && !groupName && !isMainEvent}
            >
              {showBuzzRoom && !isMainEvent
                ? groupName || t('noumena.social_hall.add_group_name')
                : eventDetails?.title}
            </TitleSpan>
          </TitleWrapper>
          {!isPostEvent && !isEndedEvent && (
            <CounterClockSpan
              font="systemInfo-m"
              isCountDown={
                eventDetails?.status === EventsStatus.PreLive ||
                eventDetails?.status === EventsStatus.PostEventEnded
              }
              data-testid="counter_clock"
            >
              {formattedTime}
            </CounterClockSpan>
          )}
        </MiddleWrapper>
      )}

      <RightWrapper isBuzzRoom={showBuzzRoom}>
        {eventDetails?.status === EventsStatus.PreEvent &&
          (!showBuzzRoom || (showBuzzRoom && isDesktop)) && (
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

        {(isPreEvent || isPostEvent) && showBuzzRoom && (
          <Button
            size="small"
            secondary
            loading={isLoadingLeaveCall}
            onClick={() => onLeaveQuietly()}
            leftIcon={<Icon imageIconName="leave_quietly" size={24} />}
            data-testid="leave_quietly_button"
          >
            {t('noumena.social_hall.leave_quietly')}
          </Button>
        )}

        {isEndMainEvent && (
          <Button
            size="small"
            secondary
            loading={loading}
            onClick={() => setShowFinishModal(true)}
            data-testid="finish_main_event"
          >
            {t('noumena.social_hall.finish_main_event')}
          </Button>
        )}

        {isEndEvent && (
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

        <DropdownWrapper data-testid="dropdown_wrapper">
          <Dropdown
            hideIcons={false}
            closeOnSelect
            placement="bottom-end"
            onSelectOption={(option) => handleSelectOptions(option)}
            options={selectableOptions}
            containerWidth="280px"
            usePortal={false}
            calRefTop={false}
            isAnimation={false}
            usePopStyle={true}
          >
            {({
              targetRef,
              targetProps,
              toggle,
            }: DropdownTargetProps<HTMLDivElement>) => (
              <IconButton
                ref={targetRef}
                onClick={toggle}
                {...targetProps}
                data-testid="three_dot_button"
              >
                <Icon
                  color="--icon-button-neutral-default"
                  name="more_m"
                  size={24}
                />
              </IconButton>
            )}
          </Dropdown>
        </DropdownWrapper>
      </RightWrapper>
      <EventModal
        isOpen={showCountDownModal}
        onClose={() => setShowCountDownModal(false)}
        countDown={true}
        remainTime={remainTime}
        {...countDownModalData}
      />
      <EventModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={leaveAndCancelEvent}
        {...cancelEventModalData}
      />
      <EventModal
        isOpen={showFinishModal}
        onClose={() => setShowFinishModal(false)}
        onConfirm={finishEvent}
        {...hostFinishMainEventModalData}
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

export default HostHeaderOld;
