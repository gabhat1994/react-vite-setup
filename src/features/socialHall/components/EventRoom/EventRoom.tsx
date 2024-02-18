import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import { useLaunchDarkly } from '@/hooks/launchDarkly';
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
import {
  type ICameraVideoTrack,
  type IRemoteVideoTrack,
  type UID,
} from '@/facade/agora';
import { useToggle, useBreakpoints } from '@/hooks';
import { useAuth } from '@/features/auth/contexts';
import {
  useActiveSpeaker,
  useCheckIfEventHasSocialHallAttendees,
  useUserOffline,
} from '@/features/socialHall/hooks';
import { SocialHallChat } from '../SocialHallChat/SocialHallChat';
import {
  Wrapper,
  MainViewWrapper,
  MainEventUserWrapper,
  KnockNotificationWrapper,
  ScrollViewWrapper,
} from './styles';
import { ControlGroupMainEventNotification } from '../ControllerGroup/ControlGroupMainEventNotification';
import { KnockNotification } from '../MiniPlayerAndNotification/KnockNotification/KnockNotification';
import { MediaPreview } from '../MediaPreview';
import {
  type VideoGalleryItem,
  VideoMasonryCarousel,
} from '../VideoMasonryCarousel';
import { SpeakerView } from '../SpeakerView';
import { SocialHallMembers } from '../SocialHallMembers';
import { ScreenShare } from '../ScreenShare';
import { AttendeeHeader, HostHeader } from '../Header';
import { ChangeGroupNameModal } from '../ChangeGroupName';
import { BrowserSupport } from '../BrowserSupport';
import { ControlPanel } from '../ControlPanel';
import { InviteAndShareModal } from '../../inviteAndShareModal';

interface Document {
  webkitFullscreenElement?: Element;
}

export type EventRoomProps = {
  initialNotifications: Maybe<Knock>[];
};

export const EventRoom = ({ initialNotifications }: EventRoomProps) => {
  const { flags } = useLaunchDarkly();
  const {
    isPersonalSocialHall,
    activeSocialHallGroup,
    socialHallAttendeesAndGroups,
    isGridLayout,
    showBuzzRoom,
    showBrowserSupportBanner,
  } = useSocialHallContext();

  const {
    messages,
    showRaiseHand,
    isCameraEnable,
    localVideoTrack,
    remoteUserVideoFeeds,
    agoraConnectionState,
    screenSharingLocalUserFeed,
    screenSharingRemoteUserFeed,
  } = useSocialHallCallContext();

  const [connectionLostUsers] = useUserOffline();

  const { user } = useAuth();
  const [isNewMessage, setIsNewMessage] = useState(false);
  const { activeSpeaker } = useActiveSpeaker();
  const mediaPreviewRef = useRef<HTMLDivElement>(null);
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [showMembersPanel, setMembersPanel] = useState(false);
  const { hostJoined, isMainEvent, isEventHost, eventDetails, isEventOwner } =
    useSocialHallEventContext();
  const [showChangeGroupName, setShowChangeGroupName] = useToggle(false);
  const [updatedActiveSpeaker, setUpdatedActiveSpeaker] = useState<UID>();
  const [maxVideoPerPage, setMaxVideoPerPage] = useState<number>(9);
  const { isTablet, isLaptop, isDesktop } = useBreakpoints();

  const onSetMaxVideoPerPage = useCallback(() => {
    setMaxVideoPerPage(isLaptop || isDesktop ? 12 : isTablet ? 6 : 3);
  }, [isLaptop, isTablet, isDesktop]);

  const isReconnecting = useMemo(
    () => agoraConnectionState === 'RECONNECTING',
    [agoraConnectionState],
  );

  const getVideoFeed = useCallback(
    (userId: string): IRemoteVideoTrack | ICameraVideoTrack | null => {
      if (user?._id === userId) {
        return isCameraEnable ? localVideoTrack! : null;
      }

      return remoteUserVideoFeeds?.[userId]!;
    },
    [localVideoTrack, remoteUserVideoFeeds, user?._id, isCameraEnable],
  );

  const screenSharingRemoteFeedPlayer = useMemo(
    () => `screen-sharing-feed_${user?._id}_${user?._id}`,
    [user?._id],
  );

  const isInvited = useCallback(
    (attendeeId) =>
      activeSocialHallGroup?.invitedAsSpeakers?.findIndex(
        (speaker) => speaker?.invitee?._id === attendeeId,
      ) !== -1,
    [activeSocialHallGroup],
  );

  const isFullScreen =
    !!document.fullscreenElement ||
    !!(document as Document).webkitFullscreenElement;

  const attendees = useMemo(() => {
    const activeUsers = (
      (activeSocialHallGroup?.users as UserOutput[]) || []
    ).filter((activeUser) => !connectionLostUsers.includes(activeUser._id));
    if (isMainEvent) {
      return activeUsers?.filter((attendee) =>
        activeSocialHallGroup?.speakers?.includes(attendee?._id!),
      );
    }
    return activeUsers;
  }, [
    isMainEvent,
    connectionLostUsers,
    activeSocialHallGroup?.users,
    activeSocialHallGroup?.speakers,
  ]);

  const hasSocialHallAttendees = useCheckIfEventHasSocialHallAttendees(
    socialHallAttendeesAndGroups,
    activeSocialHallGroup,
  );

  const onSetShowChatPanelHandler = useCallback((show: boolean) => {
    setShowChatPanel(show);
    setIsNewMessage(false);
    setMembersPanel(false);
  }, []);

  const onSetShowMembersPanelHandler = useCallback((show: boolean) => {
    setMembersPanel(show);
    setShowChatPanel(false);
  }, []);

  const isShowChatPanel = useMemo(
    () => showChatPanel && !hasSocialHallAttendees,
    [showChatPanel, hasSocialHallAttendees],
  );

  const isScreenShareFeed = useMemo(
    () =>
      !!screenSharingLocalUserFeed || !!screenSharingRemoteUserFeed?.hasVideo,
    [screenSharingLocalUserFeed, screenSharingRemoteUserFeed],
  );

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
    }
    if (screenSharingRemoteUserFeed?.hasVideo) {
      screenSharingRemoteUserFeed.videoTrack?.play(
        screenSharingRemoteFeedPlayer,
      );
    }
  }, [
    screenSharingLocalUserFeed,
    screenSharingRemoteUserFeed,
    screenSharingRemoteFeedPlayer,
  ]);

  const attendeeVideos = useMemo(() => {
    const galleryItem: VideoGalleryItem[] = [];
    attendees?.forEach((attendee) => {
      galleryItem.push({
        id: attendee._id,
        element: (
          <MediaPreview
            key={attendee._id}
            isFullScreen={isFullScreen}
            isReconnecting={isReconnecting}
            isMinimalView={isShowChatPanel}
            speakerCarouselPortal={false}
            {...(attendee as UserOutput)}
          />
        ),
      });
    });
    return galleryItem;
  }, [attendees, isShowChatPanel, isReconnecting, isFullScreen]);

  useEffect(() => {
    if (isMainEvent && showChangeGroupName) setShowChangeGroupName();
  }, [isMainEvent, setShowChangeGroupName, showChangeGroupName]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUpdatedActiveSpeaker(activeSpeaker);
    }, 100);
    return () => clearTimeout(timer);
  }, [activeSpeaker]);

  useEffect(() => {
    onSetMaxVideoPerPage();
  }, [onSetMaxVideoPerPage]);

  return (
    <>
      <BrowserSupport />
      <Wrapper
        isBannerVisible={!!showBrowserSupportBanner}
        data-testid="buzzroom_wrapper"
        showRaiseHand={showRaiseHand}
      >
        <MainViewWrapper data-testid="main_wrapper" isMainEvent={isMainEvent}>
          {isEventHost && eventDetails?._id && showBuzzRoom && (
            <HostHeader onChangeGroupName={setShowChangeGroupName} />
          )}
          {!isEventHost && eventDetails?._id && showBuzzRoom && (
            <AttendeeHeader onChangeGroupName={setShowChangeGroupName} />
          )}
          <ScrollViewWrapper id="fullScreenElement" isFullScreen={isFullScreen}>
            <MainEventUserWrapper
              isSpeakerView={isFullScreen || !isGridLayout || isScreenShareFeed}
              ref={mediaPreviewRef}
              isFullScreen={isFullScreen}
            >
              {isScreenShareFeed && (
                <ScreenShare
                  userFeeds={attendees}
                  isFullScreen={isFullScreen}
                  fullScreenElemId="fullScreenElement"
                  screenShareElemId={screenSharingRemoteFeedPlayer}
                  clientWidth={mediaPreviewRef.current?.clientWidth ?? 0}
                  clientHeight={mediaPreviewRef.current?.clientHeight ?? 0}
                  showChatPanel={showChatPanel}
                  showMembersPanel={showMembersPanel}
                />
              )}
              {isGridLayout && !isScreenShareFeed && (
                <VideoMasonryCarousel
                  gutterSpace={8}
                  videos={attendeeVideos}
                  maxVideoPerPage={maxVideoPerPage}
                  clientWidth={mediaPreviewRef.current?.clientWidth ?? 0}
                  clientHeight={mediaPreviewRef.current?.clientHeight ?? 0}
                  showChatPanel={showChatPanel}
                  showMembersPanel={showMembersPanel}
                />
              )}
              {(!isGridLayout || isScreenShareFeed) && (
                <SpeakerView
                  speakerFeed={
                    attendees?.find((attendee) =>
                      updatedActiveSpeaker
                        ? attendee._id === updatedActiveSpeaker
                        : attendee._id === attendees[0]._id,
                    )!
                  }
                  activeSpeaker={activeSpeaker}
                  userFeeds={attendees as UserOutput[]}
                  isMinimalView={isShowChatPanel}
                  isInvited={isInvited}
                  videoFeed={getVideoFeed}
                  clientWidth={mediaPreviewRef.current?.clientWidth ?? 0}
                  clientHeight={mediaPreviewRef.current?.clientHeight ?? 0}
                  showChatPanel={showChatPanel}
                  showMembersPanel={showMembersPanel}
                  isFullScreen={isFullScreen}
                />
              )}
            </MainEventUserWrapper>
            {isPersonalSocialHall && isEventOwner && <InviteAndShareModal />}
          </ScrollViewWrapper>
          {showBuzzRoom && (
            <ControlPanel
              isReconnecting={isReconnecting}
              showMembersPanel={showMembersPanel}
              isNewMessage={isNewMessage}
              showChatPanel={showChatPanel}
              onToggleChat={() => {
                onSetShowChatPanelHandler(!showChatPanel);
                setIsNewMessage(false);
              }}
              onToggleMember={() => {
                onSetShowMembersPanelHandler(!showMembersPanel);
              }}
            />
          )}
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
                isSingle={initialNotifications.length === 1}
                isHostJoined
              />
            )}
          </KnockNotificationWrapper>
        </MainViewWrapper>
        {flags.socialHallMessaging && (
          <SocialHallChat
            show={isShowChatPanel}
            disabled={isReconnecting}
            onClose={() => onSetShowChatPanelHandler(!showChatPanel)}
          />
        )}
        <SocialHallMembers
          isInvited={isInvited}
          show={showMembersPanel}
          onlineAttendees={attendees}
          onClose={() => onSetShowMembersPanelHandler(!showMembersPanel)}
        />
      </Wrapper>
      <ChangeGroupNameModal
        isOpen={showChangeGroupName && !isMainEvent}
        onClose={setShowChangeGroupName}
      />
      {isMainEvent && <ControlGroupMainEventNotification />}
    </>
  );
};
