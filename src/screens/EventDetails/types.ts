import { type EventFragment } from '@/apollo/graphql';
import { type Maybe, type Attendees } from '@/apollo/generated/types';

export type EventNavProps = {
  event: EventFragment;
  masterId: string;
  refetch: () => void;
};

export type EventDetialsProps = {
  attendees: Attendees[];
  eventData: EventFragment;
  isEventDetailPage: boolean;
};

export type EventAttendeesProps = {
  isHost: boolean;
  isExpired: boolean;
  attendees: Attendees[];
  onRemove: (attendee: Attendees) => void;
  setFullName: (fullName: string) => void;
};

export type EventInvitationProps = {
  event: EventFragment;
};
export type AttendeesStatusProps = {
  isHost: boolean;
  eventId: string;
  activeTab: string;
  isCoHost: boolean;
  isExpired: boolean;
  isLoading: boolean;
  isAttending: boolean;
  pendingUsers: Attendees[];
  acceptedUsers: Attendees[];
  onCancel: (
    attendee: Maybe<Attendees> | undefined,
    callback: () => void,
  ) => void;
};

export type GenerateHostedByLabel = {
  isHost: boolean;
  noumName: string;
  isCoHost: boolean;
  isProjectNoum: boolean;
  attendees: Attendees[];
  currentUserName: string;
};

export type HostingKey = '0' | '1' | 'default';
