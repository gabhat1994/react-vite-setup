import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Button } from '@/components/Button';
import { useWindowDimensions } from '@/hooks';
import { useAuth } from '@/features/auth/contexts';
import { breakpoints } from '@/constants/devices';
import {
  useSocialHallCallContext,
  useSocialHallContext,
  useSocialHallEventContext,
} from '@/providers';
import ROUTES from '@/constants/routes';
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
import LayoutToggle from './LayoutToggle';
import { EventModal } from '../EventModals/EventModal/EventModal';
import { attendeeLeaveEventModalData } from '../EventModals/EventModal/data';
import { HeaderCountDownModal } from './HeaderCountDownModal';
import HeaderBottomSheet from './HeaderBottomSheet';
import { ToggleBuzzRoomBtn } from './ToggleBuzzRoomBtn';
import { GroupName } from './GroupName';
import { HeaderTimer } from './HeaderTimer';
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

export const AttendeeHeader = ({
  onChangeGroupName,
}: SocialHallHeaderProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    onLeaveCall,
    isShareScreen,
    isRemoteScreenSharing,
    onExitSocialHallCall,
  } = useSocialHallCallContext();
  const [isLoadingLeaveCall, setIsLoadingLeaveCall] = useState(false);
  const { showBuzzRoom, setShowBuzzRoom, setIsBlockNavigate } =
    useSocialHallContext();

  const { isMainEvent, eventDetails } = useSocialHallEventContext();

  const { width } = useWindowDimensions();
  const { isUnregistered } = useAuth();

  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false);
  const isMobile = width < breakpoints.TABLET;

  const onLeaveQuietly = async () => {
    if (isMainEvent || eventDetails?.isInstantEvent) {
      setShowLeaveModal(true);
    } else {
      setIsLoadingLeaveCall(true);
      onLeaveCall();
      setIsLoadingLeaveCall(false);
      setShowBuzzRoom(false);
    }
  };

  const isScreenSharing = useMemo(
    () => isShareScreen || isRemoteScreenSharing,
    [isShareScreen, isRemoteScreenSharing],
  );

  const handleLeaveEvent = useCallback(async () => {
    setShowLeaveModal(false);
    setIsBlockNavigate(false);
    await onExitSocialHallCall();
    navigate(isUnregistered ? ROUTES.GUEST_HOME : ROUTES.HOME_NOUM);
  }, [isUnregistered, navigate, setIsBlockNavigate, onExitSocialHallCall]);

  const showMobileView = useMemo(
    () => isMobile && showBuzzRoom,
    [isMobile, showBuzzRoom],
  );

  return (
    <Wrapper isRow={showBuzzRoom || isMainEvent} data-testid="attendee_header">
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
        {showBuzzRoom && isMobile && (
          <>
            <Button
              size="small"
              intent="negative"
              loading={isLoadingLeaveCall}
              onClick={() => onLeaveQuietly()}
              data-testid="leave_quietly_button"
            >
              {t('noumena.social_hall.leave')}
            </Button>
          </>
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

        {!showBuzzRoom && (
          <Button
            size={isMobile ? 'full_small' : 'small'}
            intent="negative"
            onClick={() => setShowLeaveModal(true)}
            data-testid="leave_event_button"
          >
            {t('noumena.social_hall.leave_the_event')}
          </Button>
        )}
      </RightWrapper>
      <HeaderCountDownModal />
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
