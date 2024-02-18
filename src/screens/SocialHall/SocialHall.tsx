import { useCallback, useEffect, useMemo, useRef, memo, useState } from 'react';
import { t } from 'i18next';
import { type Transition } from 'history';
import { useNavigate } from 'react-router';
import { useElementDimensions, useWindowDimensions } from '@/hooks';
import { useAuth } from '@/features/auth/contexts';
import {
  useRefreshKnocks,
  useKnockSubscription,
  useSocialHallUsersAndGroupsData,
  useAgoraSubscriptionHandler,
} from '@/features/socialHall/hooks';
import {
  useSocialHallCallContext,
  useSocialHallContext,
  useSocialHallEventContext,
} from '@/providers';
import { SocialHallUtils } from '@/utils/socialHall';
import SocialHallLayout from '@/layout/SocialHallLayout';
import {
  EventModal,
  EventRoom,
  SocialHallViz,
  UserInitialization,
  MiniPlayerAndNotification,
  WaitingForHost,
} from '@/features/socialHall/components';
import {
  hostEndedModalData,
  attendeeEndedModalData,
  attendeeCanceledModalData,
  kickedFromEventModalData,
  kickedFromPersonalEventModalData,
} from '@/features/socialHall/components/EventModals/EventModal';
import { breakpoints } from '@/constants/devices';
import { TSpan } from '@/components/Typography';
import useBlocker from '@/hooks/useBlocker';
import ROUTES from '@/constants/routes';
import { Container, NotifyOnlyYou, NotifyOnlyYouWrapper } from './styles';

const SocialHall = memo(() => {
  const {
    showBuzzRoom,
    socialHallAttendee,
    activeSocialHallGroup,
    isBlockNavigate,
    isWaitingForHost,
    setIsBlockNavigate,
    isPersonalSocialHall,
  } = useSocialHallContext();
  const { startCall, closeAgoraConnection, agoraChannelUsers } =
    useSocialHallCallContext();

  const {
    isKicked,
    isPreEvent,
    isMainEvent,
    isEventHost,
    isEndedEvent,
    isCancelledEvent,
    onCancelledEvent,
    setIsEndedEvent,
    onUserBlockedSuccess,
  } = useSocialHallEventContext();

  useAgoraSubscriptionHandler();

  const refContainer = useRef<HTMLDivElement>(null);
  const tx = useRef<Transition>();
  const { user } = useAuth();
  const { users, groups } = useSocialHallUsersAndGroupsData();
  const { size } = useElementDimensions(refContainer);
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const isTablet = useMemo(() => width < breakpoints.LAPTOP, [width]);

  const { userOwnKnocks, userActiveKnocks } = useRefreshKnocks();
  const { declinedKnocks } = useKnockSubscription();
  const [openUserProfile, setOpenUserProfile] = useState<boolean>(false);
  const [selectedAttendeeId, setSelectedAttendeeId] = useState<string>();
  const [openGroupProfile, setOpenGroupProfile] = useState<boolean>(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string>();

  const handleBlockNavigation = (transition: Transition) => {
    tx.current = transition;
    if (transition.location.pathname === ROUTES.LOGIN) {
      transition.retry();
    } else {
      window.open(transition.location.pathname, '_blank');
    }
  };

  useBlocker(handleBlockNavigation, isBlockNavigate);

  const isOnlyYou = useMemo(
    () => !groups.length && users.length === 1,
    [groups.length, users.length],
  );

  const initialNotifications = useMemo(() => {
    let knocks = [
      ...(userOwnKnocks?.data ?? []),
      ...(userActiveKnocks?.data ?? []),
    ];

    if (declinedKnocks.length) {
      knocks = SocialHallUtils.getUniqueDeclinedKnocks(knocks, declinedKnocks);
    }
    return knocks;
  }, [userOwnKnocks?.data, userActiveKnocks?.data, declinedKnocks]);

  const hasJoined = agoraChannelUsers?.includes(user?._id ?? '');

  const showMiniPlayerNotification =
    !!initialNotifications.length || !!activeSocialHallGroup?._id;

  const onMemberPressed = useCallback(
    (children, parent) => {
      if (!isTablet) return;
      if (parent?.children?.length > 1) {
        setSelectedGroupId(parent.id);
        setOpenGroupProfile(true);
      } else {
        setSelectedAttendeeId(children.id);
        setOpenUserProfile(true);
      }
    },
    [isTablet],
  );

  const handleEndEvent = useCallback(() => {
    setIsEndedEvent?.(false);
    setIsBlockNavigate(false);
    setTimeout(() => {
      navigate(ROUTES.HOME_NOUM);
    }, 500);
  }, [navigate, setIsBlockNavigate, setIsEndedEvent]);

  const handleCanceledEvent = useCallback(() => {
    setIsBlockNavigate(false);
    setTimeout(() => {
      onCancelledEvent();
    }, 500);
  }, [onCancelledEvent, setIsBlockNavigate]);

  const startSocialHallCall = useCallback(async () => {
    if (activeSocialHallGroup?._id && socialHallAttendee?._id) {
      await closeAgoraConnection();
      await startCall();
    }
  }, [
    closeAgoraConnection,
    socialHallAttendee,
    startCall,
    activeSocialHallGroup,
  ]);

  useEffect(() => {
    startSocialHallCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSocialHallGroup?._id, socialHallAttendee?._id]);

  const isShowBuzzRoom = useMemo(
    () => showBuzzRoom || isMainEvent,
    [showBuzzRoom, isMainEvent],
  );

  const isShowMiniPlayer = useMemo(
    () => showMiniPlayerNotification || openUserProfile || openGroupProfile,
    [showMiniPlayerNotification, openUserProfile, openGroupProfile],
  );

  return (
    <SocialHallLayout data-testid="social_hall_layout">
      {isWaitingForHost ? (
        <WaitingForHost />
      ) : !hasJoined && !isKicked ? (
        <UserInitialization />
      ) : (
        <>
          <>
            {isShowBuzzRoom && (
              <EventRoom initialNotifications={initialNotifications} />
            )}
            {refContainer.current && !isShowBuzzRoom && (
              <Container
                ref={refContainer}
                showBuzzRoom={showBuzzRoom}
                data-testid="main_container"
              >
                <SocialHallViz
                  data={[...users, ...groups]}
                  minHeight={size.height}
                  minWidth={size.width}
                  topPadding={50}
                  bottomPadding={50}
                  onMemberPressed={onMemberPressed}
                />
                {isOnlyYou && (
                  <NotifyOnlyYouWrapper>
                    <NotifyOnlyYou>
                      <TSpan
                        font="body-l"
                        colorToken="--text-tablecell-header-neutral-highlighted"
                      >
                        {t('noumena.social_hall.attendees_only_one', {
                          eventType: isPreEvent
                            ? t('noumena.social_hall.pre_event')
                            : t('noumena.social_hall.post_event'),
                        })}
                      </TSpan>
                    </NotifyOnlyYou>
                  </NotifyOnlyYouWrapper>
                )}
              </Container>
            )}
            {isShowMiniPlayer && (
              <MiniPlayerAndNotification
                showMiniPlayerNotification={showMiniPlayerNotification}
                initialNotifications={initialNotifications}
                showUserPopup={openUserProfile}
                showGroupPopup={openGroupProfile}
                attendeeId={selectedAttendeeId}
                groupId={selectedGroupId}
                onCloseGroupPopup={() => setOpenGroupProfile(false)}
                onCloseUserPopup={() => setOpenUserProfile(false)}
              />
            )}
          </>
          {isEventHost ? (
            <EventModal
              isOpen={isEndedEvent}
              onClose={handleEndEvent}
              {...hostEndedModalData}
            />
          ) : (
            <>
              <EventModal
                isOpen={isCancelledEvent}
                onClose={handleCanceledEvent}
                {...attendeeCanceledModalData}
              />
              <EventModal
                isOpen={isEndedEvent}
                onClose={handleEndEvent}
                {...attendeeEndedModalData}
              />
              <EventModal
                isOpen={isKicked}
                onClose={onUserBlockedSuccess}
                {...(isPersonalSocialHall
                  ? kickedFromPersonalEventModalData
                  : kickedFromEventModalData)}
              />
            </>
          )}
        </>
      )}
    </SocialHallLayout>
  );
});

export default SocialHall;
