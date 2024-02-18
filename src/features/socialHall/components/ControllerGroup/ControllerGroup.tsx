import { useCallback } from 'react';
import { t } from 'i18next';
import { breakpoints } from '@/constants/devices';
import { useAuth } from '@/features/auth/contexts';
import { useLaunchDarkly, useToggle, useWindowDimensions } from '@/hooks';
import { Icon } from '@/components/Icon';
import {
  useSocialHallCallContext,
  useSocialHallContext,
  useSocialHallEventContext,
} from '@/providers';
import {
  useCheckIfEventHasSocialHallAttendees,
  useRaiseHandApi,
} from '@/features/socialHall/hooks';
import {
  BadgeContainer,
  ChatNotification,
  ChatNotificationContainer,
  ControlIconWrapper,
  ControlWrapper,
  RaiseHandsBadge,
  RaiseHandWrapper,
} from './styles';
import { type ControllerGroupProps } from './types';
import { HandsUpModal } from '../EventModals/HandsUpModal';

export const ControllerGroup = ({
  onShowChat,
  isNewMessage,
  onShowRaiseHands,
}: ControllerGroupProps): JSX.Element => {
  const { flags } = useLaunchDarkly();
  const { isMuted, toggleMuteCall } = useSocialHallCallContext();
  const {
    askHandsUpOnce,
    setAskHandsUpOnce,
    activeSocialHallGroup,
    socialHallAttendeesAndGroups,
  } = useSocialHallContext();

  const {
    showRaiseHand,
    isShareScreen,
    raisedHandUsers,
    onToggleScreenSharing,
    screenSharingRemoteUserFeed,
  } = useSocialHallCallContext();

  const hasSocialHallAttendees = useCheckIfEventHasSocialHallAttendees(
    socialHallAttendeesAndGroups,
    activeSocialHallGroup,
  );

  const { isPreEvent, isPostEvent, isMainEvent, isEventHost, isEventSpeaker } =
    useSocialHallEventContext();

  const { toggleRaisedHand } = useRaiseHandApi();
  const { user } = useAuth();
  const [isOpen, toggle] = useToggle(false);
  const { width } = useWindowDimensions();
  const isTablet = width < breakpoints.LAPTOP;

  const handleHandsUp = useCallback(() => {
    if (!askHandsUpOnce) setAskHandsUpOnce(true);
    toggle();
    toggleRaisedHand(!showRaiseHand, user?._id!);
  }, [
    askHandsUpOnce,
    showRaiseHand,
    setAskHandsUpOnce,
    toggle,
    toggleRaisedHand,
    user?._id,
  ]);

  return (
    <ControlWrapper data-testid="control_wrapper">
      {isMainEvent && !isEventHost && !isEventSpeaker ? (
        <>
          {isTablet && (
            <ControlIconWrapper cursorAllowed onClick={onShowChat}>
              <Icon
                name="message_m"
                size={24}
                color="--icon-button-neutral-default"
              />
            </ControlIconWrapper>
          )}
          <RaiseHandWrapper
            onClick={() => toggleRaisedHand(!showRaiseHand, user?._id!)}
            isRaiseHand={showRaiseHand}
            font="button-m"
            colorToken="--text-button-neutral-default"
          >
            <Icon imageIconName="raise_hand_m" size={24} />
            {t(
              showRaiseHand
                ? 'noumena.social_hall.hands_up.hand_raised'
                : 'noumena.social_hall.hands_up.raise_hand',
            )}
          </RaiseHandWrapper>
        </>
      ) : (
        <>
          {isTablet && flags.socialHallMessaging && !hasSocialHallAttendees && (
            <ControlIconWrapper cursorAllowed onClick={onShowChat}>
              {isNewMessage && (
                <ChatNotificationContainer>
                  <ChatNotification />
                </ChatNotificationContainer>
              )}
              <Icon
                name="message_m"
                size={24}
                color="--icon-button-neutral-default"
              />
            </ControlIconWrapper>
          )}
          <ControlIconWrapper cursorAllowed onClick={() => toggleMuteCall()}>
            <Icon
              name={isMuted ? 'mic_off_m' : 'mic_on_m'}
              size={24}
              color={
                isMuted
                  ? '--icon-button-danger-secondary-default'
                  : '--icon-button-neutral-default'
              }
            />
          </ControlIconWrapper>
          {((isMainEvent && (isEventHost || isEventSpeaker)) ||
            isPreEvent ||
            isPostEvent) && (
            <ControlIconWrapper
              cursorAllowed
              onClick={() => onToggleScreenSharing()}
            >
              <Icon
                name={
                  isShareScreen || screenSharingRemoteUserFeed?.uid
                    ? 'share_content_off_m'
                    : 'share_content_m'
                }
                size={24}
                color="--icon-button-neutral-default"
              />
            </ControlIconWrapper>
          )}
          {!isMainEvent && (
            <ControlIconWrapper
              cursorAllowed
              onClick={
                askHandsUpOnce
                  ? () => toggleRaisedHand(!showRaiseHand, user?._id!)
                  : toggle
              }
              backgroundColor={
                showRaiseHand
                  ? 'var(--bg-button-brand-primary-default)'
                  : 'var(--bg-button-neutral-alt-default)'
              }
            >
              <Icon imageIconName="raise_hand_m" size={24} />
            </ControlIconWrapper>
          )}
          {isTablet && isEventHost && isMainEvent && (
            <ControlIconWrapper cursorAllowed onClick={onShowRaiseHands}>
              <Icon
                name="raise_hand_2_outline_m"
                size={24}
                color="--icon-button-neutral-default"
              />
              {raisedHandUsers.length > 0 && (
                <BadgeContainer>
                  <RaiseHandsBadge text={`${raisedHandUsers.length}`} />
                </BadgeContainer>
              )}
            </ControlIconWrapper>
          )}
          <HandsUpModal
            isOpen={isOpen}
            onClose={toggle}
            onConfirm={handleHandsUp}
          />
        </>
      )}
    </ControlWrapper>
  );
};
