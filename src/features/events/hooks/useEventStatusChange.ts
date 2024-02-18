import { matchPath, useLocation, useNavigate } from 'react-router';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { type ApolloQueryResult } from '@apollo/client';
import { SocialHallUtils } from '@/utils/socialHall';
import {
  EventsStatus,
  type Event,
  type SocialHallAttendee,
} from '@/apollo/generated/types';
import { useAudio } from '@/hooks/audioPlay';
import { type SocialHallAttendeesAndGroupsQuery } from '@/apollo/graphql';
import { useAuth, useSessionContext } from '@/features/auth/contexts';
import ROUTES from '@/constants/routes';
import { setLocalStorage } from '@/utils/localStorage';
import accessLocalStorage from '@/constants/accessLocalStorage';
import MainEventStartAudio from '@/assets/media/main-event-notification.wav';
import EventEndAudio from '@/assets/media/event-end-notification.wav';
import { useSocialHallContext } from '@/providers/SocialHallProvider';

type EventStatusChange = {
  eventDetails: Event;
  socialHallAttendee: SocialHallAttendee;
  socialHallAttendeeGroupRefetch: () => Promise<
    ApolloQueryResult<SocialHallAttendeesAndGroupsQuery>
  >;
};

export const useEventStatusChange = ({
  eventDetails,
  socialHallAttendee,
  socialHallAttendeeGroupRefetch,
}: EventStatusChange) => {
  const { activeSocialHallGroup, setShowBuzzRoom, userActiveGroupData } =
    useSocialHallContext();
  const [playEventEndAudio] = useAudio(EventEndAudio);
  const [playEventStartAudio] = useAudio(MainEventStartAudio);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setIsIdleStateAllowed } = useSessionContext();
  const eventStatus = useRef<EventsStatus | null>();
  const [isCancelledEvent, setIsCancelledEvent] = useState<boolean>(false);
  const [isEndedEvent, setIsEndedEvent] = useState<boolean>(false);
  const { pathname } = useLocation();

  const isEventDetailPage = matchPath(
    { path: ROUTES.SOCIAL_HALL_DETAILS },
    pathname,
  );

  const checkEventRole = useCallback(
    (status: EventsStatus) => eventDetails?.status === status,
    [eventDetails?.status],
  );

  const onCancelledEvent = useCallback(() => {
    setIsCancelledEvent(false);
    navigate(ROUTES.HOME_NOUM);
  }, [navigate]);

  const isEventSpeaker = useMemo(
    () => activeSocialHallGroup?.speakers?.includes(user?._id ?? ''),
    [user?._id, activeSocialHallGroup?.speakers],
  );

  const currentUserRole = useMemo(
    () => socialHallAttendee?.eventRole?.userRole,
    [socialHallAttendee?.eventRole?.userRole],
  );

  const isEventHost = !!socialHallAttendee?.isHost;

  const onPostEvent = async () => {
    setShowBuzzRoom(false);
    await userActiveGroupData?.refetch();
  };

  const onEventLive = async () => {
    setShowBuzzRoom(true);
    if (!isMainEvent && !eventDetails.isInstantEvent) {
      await socialHallAttendeeGroupRefetch();
    }
  };

  const onRedirectToEventFinished = useCallback(async () => {
    setLocalStorage(accessLocalStorage.GUEST_REDIRECT_TO_URI, 'event/finished');
    navigate(ROUTES.EVENT_FINISHED);
  }, [navigate]);

  const onEventEnded = () => {
    if (isEventHost) {
      setIsEndedEvent(true);
    } else {
      onRedirectToEventFinished();
    }
  };

  useEffect(() => {
    if (eventDetails?.status && eventDetails?.status !== eventStatus.current) {
      eventStatus.current = eventDetails?.status;
      if (eventDetails?.status === EventsStatus.PostEventEnded) {
        playEventEndAudio();
      }
      if (eventDetails?.status === EventsStatus.PreLive) {
        playEventStartAudio();
      }
      if (checkEventRole(EventsStatus.Cancelled)) {
        if (!isEventDetailPage) {
          onRedirectToEventFinished();
        }
      }
      if (checkEventRole(EventsStatus.Live)) {
        onEventLive();
      }
      if (checkEventRole(EventsStatus.PostEvent)) {
        onPostEvent();
      }
      if (checkEventRole(EventsStatus.Expired)) {
        onEventEnded();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventDetails?.status]);

  // const isMainEvent = useMemo(
  //   () => eventDetails?.status === EventsStatus.Live,
  //   [eventDetails?.status],
  // );

  const isMainEvent = false;

  const isPostEvent = useMemo(
    () => eventDetails?.status === EventsStatus.PostEvent,
    [eventDetails?.status],
  );

  // const isPreEvent = useMemo(
  //   () =>
  //     [EventsStatus.PreEvent, EventsStatus.PreLive].includes(
  //       eventDetails?.status!,
  //     ),
  //   [eventDetails?.status],
  // );

  const isPreEvent = true;

  const isIdleStateAllowed = useMemo(
    () => isPreEvent || isPostEvent || isMainEvent,
    [isMainEvent, isPostEvent, isPreEvent],
  );

  const remainTimeForEvent = useMemo(() => {
    let eventTimeDiff: number = 0;
    if (isPreEvent && !eventDetails.isInstantEvent) {
      eventTimeDiff = SocialHallUtils.getEventTimeDifference(
        eventDetails?.eventDate,
      );
    } else if (checkEventRole(EventsStatus.PreLive)) {
      eventTimeDiff = SocialHallUtils.getRemainingTimeForMainEventOrEndEvent(
        eventDetails?.eventStatusUpdatedAt,
      );
    } else if (checkEventRole(EventsStatus.Live)) {
      eventTimeDiff = SocialHallUtils.getEventTimeDifference(
        new Date(),
        eventDetails?.eventStatusUpdatedAt,
      );
    } else if (checkEventRole(EventsStatus.PostEventEnded)) {
      eventTimeDiff = SocialHallUtils.getRemainingTimeForMainEventOrEndEvent(
        eventDetails?.eventStatusUpdatedAt,
      );
    }
    return eventTimeDiff;
  }, [
    isPreEvent,
    checkEventRole,
    eventDetails?.eventDate,
    eventDetails.isInstantEvent,
    eventDetails?.eventStatusUpdatedAt,
  ]);

  useEffect(
    () => () => {
      setIsIdleStateAllowed(false);
    },
    [setIsIdleStateAllowed],
  );

  useEffect(() => {
    setIsIdleStateAllowed(isIdleStateAllowed);
  }, [isIdleStateAllowed, setIsIdleStateAllowed]);

  return {
    isPreEvent,
    isEventHost,
    isMainEvent,
    isPostEvent,
    isEndedEvent,
    currentUserRole,
    onCancelledEvent,
    setIsEndedEvent,
    isCancelledEvent,
    remainTimeForEvent,
    onRedirectToEventFinished,
    isEventSpeaker: !!isEventSpeaker,
  };
};

export default useEventStatusChange;
