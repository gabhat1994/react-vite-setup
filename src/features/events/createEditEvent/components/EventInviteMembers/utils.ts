import {
  type Attendees,
  type UserRole,
  Privacy,
} from '@/apollo/generated/types';
import type { IUser } from '@/features/events/types/context';
import { generateEventUser } from '@/features/events/utils/generateEventUser';
import { uniqBy } from 'lodash';

export const getEventUser = (
  attendees: Attendees[],
  participantRole: UserRole,
  isConnected?: boolean,
): IUser[] => {
  const users: IUser[] = [];
  attendees.forEach(({ userId, userRole, invitationStatus }) => {
    const generated = generateEventUser(
      userRole === participantRole ? userId : null,
      true,
      !!isConnected,
    );
    if (generated)
      users.push({
        ...generated,
        invitationStatus,
        userRole,
      });
  });
  return users;
};

export const getMembersBasedOnPrivacySetting = (
  privacy: Privacy,
  members: IUser[],
  connectedMembers: IUser[],
  otherMembers: IUser[],
) => {
  if (privacy === Privacy.Connected) {
    return members.filter((member) => !!member.isConnected);
  }
  return uniqBy([...members, ...connectedMembers, ...otherMembers], '_id');
};
