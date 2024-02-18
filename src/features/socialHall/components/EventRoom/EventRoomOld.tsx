import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLaunchDarkly } from '@/hooks/launchDarkly';
import { useAuth } from '@/features/auth/contexts';
import { useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import {
  useSocialHallCallContext,
  useSocialHallContext,
  useSocialHallEventContext,
} from '@/providers';
import {
  type UserOutput,
  type Maybe,
  type Knock,
} from '@/apollo/generated/types';
import { Icon } from '@/components/Icon';
import { useCheckIfEventHasSocialHallAttendees } from '@/features/socialHall/hooks';
import { SocialHallChat } from '../SocialHallChat/SocialHallChat';
import { ControllerGroup } from '../ControllerGroup/ControllerGroup';

import { AttendeeInCall } from '../AttendeeInCall';
import {
  Wrapper,
  StageHeader,
  AttendeeHeader,
  MainViewWrapper,
  StageUserWrapper,
  BuzzRoomUsersContainer,
  BuzzRoomUsersWrapper,
  MainEventUserWrapper,
  ScreenSharingElement,
  ScreenShareWrapper,
  ScreenShareTitleSpan,
  ScreenShareNameSpan,
  CloseIconButton,
  FullScreenWrapper,
  KnockNotificationWrapper,
  ScrollViewWrapper,
  ControllerWrapper,
  TempChatContainer,
} from './stylesOld';

import { RaiseHandsSideBar } from '../RaiseHandsSideBar/RaiseHandsSideBar';
import { ControlGroupMainEventNotification } from '../ControllerGroup/ControlGroupMainEventNotification';
import { KnockNotification } from '../MiniPlayerAndNotification/KnockNotification/KnockNotification';

interface HTMLElement {
  webkitRequestFullScreen?: () => Promise<void>;
  requestFullscreen?: () => Promise<void>;
}

interface Document {
  webkitFullscreenElement?: Element;
  exitFullscreen?: () => Promise<void>;
  webkitExitFullscreen?: () => Promise<void>;
}

type EventRoomProps = {
  initialNotifications: Maybe<Knock>[];
};

export const EventRoomOld = ({ initialNotifications }: EventRoomProps) => {
  const { flags } = useLaunchDarkly();
  const { t } = useTranslation();
  const {
    stageAttendees,
    audienceAttendees,
    activeSocialHallGroup,
    socialHallAttendeesAndGroups,
  } = useSocialHallContext();

  const {
    messages,
    mutedUsers,
    showRaiseHand,
    agoraConnectionState,
    screenSharingLocalUserFeed,
    screenSharingRemoteUserFeed,
  } = useSocialHallCallContext();

  const isReconnecting = useMemo(
    () => agoraConnectionState === 'RECONNECTING',
    [agoraConnectionState],
  );

  const { hostJoined, isMainEvent, isEventHost } = useSocialHallEventContext();
  const { user } = useAuth();
  const { width } = useWindowDimensions();
  const isTablet = width < breakpoints.LAPTOP;
  const [isNewMessage, setIsNewMessage] = useState(false);
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [screenShareUserName, setScreenShareUserName] = useState<string>();

  const screenSharingRemoteFeedPlayer = useMemo(
    () => `screen-sharing-feed_${user?._id}`,
    [user?._id],
  );

  const isInvited = useCallback(
    (attendeeId) =>
      activeSocialHallGroup?.invitedAsSpeakers?.findIndex(
        (speaker) => speaker?.invitee?._id === attendeeId,
      ) !== -1,
    [activeSocialHallGroup],
  );

  const onClickShareScreen = useCallback(() => {
    const el = document.getElementById('screenShareWrapper') as HTMLElement;
    // Disable fullscreen mode for user who is sharing screen
    if (screenSharingLocalUserFeed) {
      return;
    }
    if (el?.requestFullscreen) {
      el.requestFullscreen();
    } else if (el?.webkitRequestFullScreen) {
      el.webkitRequestFullScreen();
    }
  }, [screenSharingLocalUserFeed]);

  const onCloseShareScreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as Document)?.webkitExitFullscreen) {
      (document as Document)?.webkitExitFullscreen?.();
    }
  }, []);

  const isFullScreen =
    !!document.fullscreenElement ||
    !!(document as Document).webkitFullscreenElement;

  const attendees = useMemo(
    () => activeSocialHallGroup?.users,
    [activeSocialHallGroup?.users],
  );

  const hasSocialHallAttendees = useCheckIfEventHasSocialHallAttendees(
    socialHallAttendeesAndGroups,
    activeSocialHallGroup,
  );

  const onSetShowChatPanelHandler = useCallback((show: boolean) => {
    setShowChatPanel(show);
    setIsNewMessage(false);
  }, []);

  useEffect(() => {
    if (
      !!messages?.length &&
      messages[(messages?.length ?? 0) - 1]?.uid !== user?._id
    ) {
      setIsNewMessage(true);
    }
  }, [messages, user?._id]);

  useEffect(() => {
    if (screenSharingLocalUserFeed) {
      screenSharingLocalUserFeed.play(screenSharingRemoteFeedPlayer);
      setScreenShareUserName(user?.firstName!);
    }
    if (screenSharingRemoteUserFeed?.hasVideo) {
      screenSharingRemoteUserFeed.videoTrack?.play(
        screenSharingRemoteFeedPlayer,
      );
      setScreenShareUserName(
        activeSocialHallGroup?.users?.filter(
          (userFeed) => userFeed?._id === screenSharingRemoteUserFeed.uid,
        )[0]?.firstName || '',
      );
    }
  }, [
    user?.firstName,
    activeSocialHallGroup,
    screenSharingLocalUserFeed,
    screenSharingRemoteUserFeed,
    screenSharingRemoteFeedPlayer,
  ]);

  return (
    <>
      <Wrapper data-testid="buzzroom_wrapper" showRaiseHand={showRaiseHand}>
        {isMainEvent &&
        isEventHost &&
        (!isTablet || (isTablet && showRaiseHand)) ? (
          <RaiseHandsSideBar onClose={() => {}} />
        ) : isTablet ? null : (
          <TempChatContainer />
        )}
        <MainViewWrapper data-testid="main_wrapper" isMainEvent={isMainEvent}>
          <ScrollViewWrapper>
            <ScreenShareWrapper
              visible={
                !!screenSharingRemoteUserFeed?.hasVideo ||
                !!screenSharingLocalUserFeed
              }
              id="screenShareWrapper"
            >
              {isFullScreen ? (
                <FullScreenWrapper>
                  <CloseIconButton onClick={onCloseShareScreen}>
                    <Icon
                      color="--icon-button-neutral-default"
                      name="close_m"
                      size={24}
                    />
                  </CloseIconButton>
                  <ControllerGroup
                    isNewMessage={isNewMessage}
                    onShowChat={() => {
                      setIsNewMessage(false);
                    }}
                    onShowRaiseHands={() => {}}
                  />
                </FullScreenWrapper>
              ) : (
                <ScreenShareTitleSpan
                  font="body-m"
                  colorToken="--text-tablecell-body-neutral-default"
                >
                  <ScreenShareNameSpan
                    font="body-m-bold"
                    colorToken="--text-tablecell-body-neutral-default"
                  >
                    {screenShareUserName}
                  </ScreenShareNameSpan>
                  {t('noumena.social_hall.is_sharing_screen')}
                </ScreenShareTitleSpan>
              )}

              <ScreenSharingElement
                isFullScreen={isFullScreen}
                id={screenSharingRemoteFeedPlayer}
                onClick={onClickShareScreen}
              />
            </ScreenShareWrapper>
            {isMainEvent ? (
              <MainEventUserWrapper>
                <StageHeader
                  font="body-m"
                  colorToken="--text-tablecell-body-neutral-default"
                  screenSharing={!!screenSharingRemoteUserFeed?.hasVideo}
                >
                  {t('noumena.social_hall.stage')}
                </StageHeader>
                <StageUserWrapper>
                  {stageAttendees?.map((attendee) => {
                    if (!attendee?._id) {
                      return null;
                    }
                    return (
                      <AttendeeInCall
                        key={attendee?._id}
                        isMuted={mutedUsers.includes(attendee?._id!)}
                        {...attendee}
                      />
                    );
                  })}
                </StageUserWrapper>
                <AttendeeHeader
                  font="body-m-bold"
                  colorToken="--text-tablecell-body-neutral-default"
                >
                  {t('noumena.social_hall.audience')}
                </AttendeeHeader>
                <StageUserWrapper>
                  {audienceAttendees?.map((attendee) => {
                    if (!attendee?._id) {
                      return null;
                    }
                    return (
                      <AttendeeInCall
                        isAudience={true}
                        key={attendee?._id}
                        isInvited={isInvited(attendee?._id)}
                        isMuted={false}
                        {...attendee}
                      />
                    );
                  })}
                </StageUserWrapper>
              </MainEventUserWrapper>
            ) : (
              <BuzzRoomUsersContainer>
                <BuzzRoomUsersWrapper>
                  {attendees?.map((attendee) => {
                    if (!attendee?._id) {
                      return null;
                    }
                    return (
                      <AttendeeInCall
                        key={attendee?._id}
                        isMuted={mutedUsers.includes(attendee?._id!)}
                        {...(attendee as UserOutput)}
                      />
                    );
                  })}
                </BuzzRoomUsersWrapper>
              </BuzzRoomUsersContainer>
            )}
          </ScrollViewWrapper>
          <ControllerWrapper />
          <ControllerGroup
            isNewMessage={isNewMessage}
            onShowChat={() => {
              onSetShowChatPanelHandler(true);
            }}
            onShowRaiseHands={() => {
              onSetShowChatPanelHandler(false);
            }}
          />
          <KnockNotificationWrapper>
            {initialNotifications.map((notification) => (
              <KnockNotification
                key={notification?._id}
                notification={notification!}
                isSingle={initialNotifications.length === 1}
              />
            ))}
            {hostJoined && (
              <KnockNotification
                key={new Date().getTime()}
                isSingle={initialNotifications.length === 1}
                isHostJoined
              />
            )}
          </KnockNotificationWrapper>
        </MainViewWrapper>
        {(!isTablet || (isTablet && showChatPanel)) &&
        flags.socialHallMessaging &&
        !hasSocialHallAttendees ? (
          <SocialHallChat
            show={true}
            disabled={isReconnecting}
            onClose={() => onSetShowChatPanelHandler(false)}
          />
        ) : isTablet ? null : (
          <TempChatContainer />
        )}
      </Wrapper>
      {isMainEvent && <ControlGroupMainEventNotification />}
    </>
  );
};
