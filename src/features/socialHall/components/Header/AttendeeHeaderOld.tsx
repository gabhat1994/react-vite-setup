import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { useWindowDimensions } from '@/hooks';
import { useAuth } from '@/features/auth/contexts';
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
import { useHeaderTimer } from '@/features/socialHall/hooks';
import { EventModal } from '../EventModals/EventModal/EventModal';
import {
  attendeeLeaveEventModalData,
  countDownModalData,
} from '../EventModals/EventModal/data';
import { attendeeBuzzMenuOptions, attendeeNotBuzzMenuOptions } from './data';
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

export const AttendeeHeaderOld = ({
  onViewAttendees,
  onChangeGroupName,
}: SocialHallHeaderProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { onLeaveCall, onExitSocialHallCall } = useSocialHallCallContext();
  const [isLoadingLeaveCall, setIsLoadingLeaveCall] = useState(false);
  const { showBuzzRoom, setShowBuzzRoom, setIsBlockNavigate } =
    useSocialHallContext();

  const { isMainEvent, isPostEvent, isEndedEvent, eventDetails, groupName } =
    useSocialHallEventContext();

  const { formattedTime, remainTime } = useHeaderTimer();
  const { width } = useWindowDimensions();
  const { isUnregistered } = useAuth();

  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false);
  const [showCountDownModal, setShowCountDownModal] = useState<boolean>(false);
  const isMobile = width < breakpoints.TABLET;

  const selectableOptions = useMemo(() => {
    const options =
      showBuzzRoom && !isMainEvent
        ? attendeeBuzzMenuOptions
        : attendeeNotBuzzMenuOptions;
    const updatedOptions = options.map((option) => ({
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
  }, [showBuzzRoom, isMainEvent]);

  const onLeaveQuietly = async () => {
    if (isMainEvent) {
      setShowLeaveModal(true);
    } else {
      setIsLoadingLeaveCall(true);
      onLeaveCall();
      setIsLoadingLeaveCall(false);
      setShowBuzzRoom(false);
    }
  };

  const handleSelectOptions = useCallback(
    (option) => {
      if (option.value === 'change_room_name') {
        onChangeGroupName?.();
      } else if (option.value === 'see_event_attendees') {
        onViewAttendees?.();
      }
    },
    [onChangeGroupName, onViewAttendees],
  );

  const handleLeaveEvent = useCallback(async () => {
    setShowLeaveModal(false);
    setIsBlockNavigate(false);
    await onExitSocialHallCall();
    navigate(isUnregistered ? ROUTES.GUEST_HOME : ROUTES.HOME_NOUM);
  }, [onExitSocialHallCall, isUnregistered, navigate, setIsBlockNavigate]);

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
    <Wrapper isRow={showBuzzRoom || isMainEvent} data-testid="attendee_header">
      <ToggleBuzzRoomBtn />
      {isMobile && showBuzzRoom ? (
        <MobileBuzzRoomMiddleWrapper>
          <EventTag />
          <TitleWrapper>
            <TitleSpan
              font="body-xl-bold"
              colorToken={
                showBuzzRoom && !groupName
                  ? '--text-card-neutral-default'
                  : '--text-appbar-neutral-default'
              }
            >
              {groupName || t('noumena.social_hall.add_group_name')}
            </TitleSpan>
          </TitleWrapper>
          {!isPostEvent && !isEndedEvent && (
            <CounterClockSpan
              font="systemInfo-m"
              colorToken={
                eventDetails?.status === EventsStatus.PreLive ||
                eventDetails?.status === EventsStatus.PostEventEnded
                  ? '--text-timestamp-danger-primary-default'
                  : '--text-timestamp-neutral-default'
              }
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
              colorToken={
                showBuzzRoom && !groupName
                  ? '--text-card-neutral-default'
                  : '--text-appbar-neutral-default'
              }
            >
              {showBuzzRoom && !isMainEvent
                ? groupName || t('noumena.social_hall.add_group_name')
                : eventDetails?.title}
            </TitleSpan>
          </TitleWrapper>
          {!isPostEvent && !isEndedEvent && (
            <CounterClockSpan
              font="systemInfo-m"
              colorToken={
                eventDetails?.status === EventsStatus.PreLive ||
                eventDetails?.status === EventsStatus.PostEventEnded
                  ? '--text-timestamp-danger-primary-default'
                  : '--text-timestamp-neutral-default'
              }
              data-testid="counter_clock"
            >
              {formattedTime}
            </CounterClockSpan>
          )}
        </MiddleWrapper>
      )}

      <RightWrapper isBuzzRoom={showBuzzRoom}>
        {showBuzzRoom ? (
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
        ) : (
          <Button
            size={isMobile ? 'full_small' : 'small'}
            secondary
            onClick={() => setShowLeaveModal(true)}
            data-testid="leave_event_button"
          >
            {t('noumena.social_hall.leave_the_event')}
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
        isOpen={showLeaveModal}
        onClose={() => setShowLeaveModal(false)}
        onConfirm={handleLeaveEvent}
        isConfirmButtonPrimary
        {...attendeeLeaveEventModalData}
      />
    </Wrapper>
  );
};

export default AttendeeHeaderOld;
