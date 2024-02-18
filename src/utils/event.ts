import {
  type Cohost,
  type Event,
  EventsStatus,
  InvitationStatus,
  type Invitees,
  type Maybe,
  UserRole,
} from '@/apollo/generated/types';
import { type EventFragment } from '@/apollo/graphql';
import { getLocalTime } from './date';
import { UserUtil } from './user';

function getEventAttendees(
  event: Maybe<EventFragment> | undefined,
): Array<Cohost | Invitees> {
  return [...(event?.cohosts ?? []), ...(event?.invitations ?? [])];
}

/**
 * A participated event is when user is either hosting/attending the event.
 */
function isParticipatedEvent(evnt: EventFragment) {
  return (
    // evnt.currentUser?.invitation?.status === InvitationStatus.Accepted
    evnt.currentUser?.userRole === UserRole.Host
  );
}

/**
 * Method checks if its an upcoming and either user is an host or
 * accepted the invitation, then it returns that event
 */
function getEventInNext60Minutes(hostedAndInvitedEvents: EventFragment[]) {
  return hostedAndInvitedEvents.filter((evnt) => {
    if (isUpcomingEvent(evnt?.status!) && isParticipatedEvent(evnt)) {
      const localDateTime = getLocalTime({
        dateTime: new Date(evnt?.eventDate),
      });

      const startTimestamp = localDateTime?.getTime() || 0;
      const currTimestamp = Date.now();

      const diffSeconds = Math.round((startTimestamp - currTimestamp) / 1000);
      return diffSeconds / 60 <= 60;
    }
    return false;
  })[0];
}

function getEventAttendeesAvatars(
  event: Maybe<EventFragment> | undefined,
): Array<string> {
  return [
    UserUtil.getProfilePicture(event?.userId),
    ...getEventAttendees(event)
      .filter((item) => item.status === InvitationStatus.Accepted)
      .map((item) => UserUtil.getProfilePicture(item.userId)),
  ];
}

function isUpcomingEvent(eventStatus: EventsStatus): boolean {
  if (!eventStatus) {
    return false;
  }
  const upcomingStatus = [EventsStatus.Upcoming, EventsStatus.GoLive];
  return upcomingStatus.includes(eventStatus);
}

function isEventLive(eventStatus: EventsStatus): boolean {
  if (!eventStatus) {
    return false;
  }

  const liveStatus = [
    EventsStatus.Live,
    EventsStatus.PostEvent,
    EventsStatus.PreEvent,
    EventsStatus.PreLive,
  ];
  return liveStatus.includes(eventStatus);
}

/**
 *
 */
function getParticipatedLiveEvents(
  hostedAndInvitedEvents: EventFragment[],
): EventFragment {
  return hostedAndInvitedEvents.find((evnt) => {
    if (isParticipatedEvent(evnt)) {
      return EventUtils.isEventLive(evnt.status!);
    }

    return false;
  }) as Event;
}

const isHost = (userRole: UserRole) =>
  userRole === UserRole.Host || userRole === UserRole.Cohost;

const isParticipant = (userRole: UserRole) => userRole === UserRole.Participant;

export const EventUtils = {
  isEventLive,
  getEventAttendees,
  getEventInNext60Minutes,
  getEventAttendeesAvatars,
  getParticipatedLiveEvents,
  isHost,
  isParticipant,
};
