import {
  EventsStatus,
  InvitationStatus,
  type Maybe,
  UserRole,
} from '@/apollo/generated/types';
import { PRE_EVENT_THRESHOLD } from '@/features/events/constants';

export type EventCardButtonType =
  | 'FINISHED'
  | 'GO_LIVE'
  | 'JOIN_EVENT'
  | 'EDIT_EVENT'
  | 'ATTEND_EVENT'
  | 'ATTENDING'
  | 'NOT_ATTENDING'
  | 'INVITED'
  | 'ALREADY_JOINED';

interface EventCardButtonTypeInput {
  status?: Maybe<EventsStatus>;
  userRole: UserRole;
  invitationStatus?: Maybe<InvitationStatus>;
  isUserJoined?: boolean | null;
  eventDate?: string;
  diffSeconds: number;
  isInstantEvent: boolean;
}

export const getEventCardButtonType = ({
  status,
  userRole,
  invitationStatus,
  isUserJoined,
  eventDate,
  diffSeconds,
  isInstantEvent,
}: EventCardButtonTypeInput): EventCardButtonType | null => {
  let result: EventCardButtonType | null = null;
  if (!status) return result;
  if (
    status === EventsStatus.Expired ||
    status === EventsStatus.PostEventEnded ||
    status === EventsStatus.Cancelled
  ) {
    result = 'FINISHED';
  } else if (
    userRole === UserRole.Host ||
    (userRole === UserRole.Cohost &&
      invitationStatus === InvitationStatus.Accepted)
  ) {
    // If scheduled event remaining time < PRE_EVENT_THRESHOLD
    if (
      status === EventsStatus.GoLive ||
      (diffSeconds < PRE_EVENT_THRESHOLD && !isInstantEvent)
    ) {
      result = 'GO_LIVE';
    } else if (status === EventsStatus.Upcoming) result = 'EDIT_EVENT';
    else if (isUserJoined) {
      result = 'ALREADY_JOINED';
    } else result = 'JOIN_EVENT';
  } else if (invitationStatus === InvitationStatus.Pending) {
    result = 'INVITED';
  } else if (invitationStatus === InvitationStatus.Accepted) {
    if (isUserJoined) {
      result = 'ALREADY_JOINED';
    } else if (
      [
        EventsStatus.PreEvent,
        EventsStatus.PreLive,
        EventsStatus.Live,
        EventsStatus.PostEvent,
      ].includes(status) ||
      (eventDate && diffSeconds <= 0)
    ) {
      result = 'JOIN_EVENT';
    } else {
      result = 'ATTENDING';
    }
  } else if (invitationStatus === InvitationStatus.Rejected) {
    result = 'NOT_ATTENDING';
  } else {
    result = 'ATTEND_EVENT';
  }
  return result;
};
