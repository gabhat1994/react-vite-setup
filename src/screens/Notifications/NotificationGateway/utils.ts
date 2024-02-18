import { t } from 'i18next';
import {
  type ChamberByIdRef,
  type ConnectionByIdRef,
  type EventNotificationDetails,
  EventsStatus,
  InvitationStatus,
  type Maybe,
  type UserOutput,
} from '@/apollo/generated/types';
import { formatListOfStrings } from '@/utils/strings';
import { UserUtil } from '@/utils/user';
import ChamberDefaultAvatar from '@/assets/images/chamber_default.png';
import { type NotificationSourceUserNoumFragment } from '@/apollo/graphql';
import { type UserFragment } from '@/apollo/graphql/fragments';
import { NotificationConnectionStatus } from '../types';

export const formatMultipleUserNames = (
  users: Array<UserOutput | UserFragment>,
) => {
  if (users.length === 0) return '';
  if (users.length === 1) return UserUtil.renderFullName(users[0]);

  let formatted = '';

  const activeUsers = users.filter((user) => !UserUtil.isInactive(user));
  if (activeUsers.length !== users.length) {
    const numInactiveUsers = users.length - activeUsers.length;

    if (!activeUsers.length) {
      formatted = `${numInactiveUsers} ${t('noumena.inactive_users')}`;
    } else if (activeUsers.length < 3) {
      formatted = formatListOfStrings([
        ...activeUsers.map(UserUtil.renderFirstName),
        t(
          numInactiveUsers === 1
            ? 'noumena.inactive_user'
            : 'noumena.inactive_users',
        ),
      ]);
    } else {
      formatted = formatListOfStrings([
        ...activeUsers.slice(0, 2).map(UserUtil.renderFirstName),
        t('noumena.count_others', { count: users.length - 2 }),
      ]);
    }
  } else if (users.length < 4) {
    formatted = formatListOfStrings(users.map(UserUtil.renderFirstName));
  } else {
    formatted = formatListOfStrings([
      ...users.slice(0, 2).map(UserUtil.renderFirstName),
      t('noumena.count_others', { count: users.length - 2 }),
    ]);
  }
  return formatted;
};

export const isStaleEvent = (
  event: Maybe<EventNotificationDetails> | undefined,
) =>
  !event?.id?.status ||
  [EventsStatus.Expired, EventsStatus.Cancelled].includes(event.id.status);

const getInvitationStatus = (
  event: Maybe<EventNotificationDetails> | undefined,
) => event?.id?.currentUser?.invitation?.status;

export const isInvitationPending = (
  event: Maybe<EventNotificationDetails> | undefined,
) => getInvitationStatus(event) === InvitationStatus.Pending;

export const getUserAvatar = (
  user: Maybe<UserOutput | UserFragment> | undefined,
) => UserUtil.getProfilePicture(user);

export const getNoumAvatar = (
  noum: Maybe<ChamberByIdRef | NotificationSourceUserNoumFragment> | undefined,
) => noum?.profileImage ?? ChamberDefaultAvatar;

export const getUserWithNoumAvatars = (
  noum: Maybe<ChamberByIdRef | NotificationSourceUserNoumFragment> | undefined,
  user: Maybe<UserOutput> | undefined,
) => [getNoumAvatar(noum), getUserAvatar(user)];

export const getConnectionStatus = (
  connection: Maybe<ConnectionByIdRef> | undefined,
) => {
  switch (connection?.status) {
    case 'APPROVED':
      return NotificationConnectionStatus.APPROVED;
    case 'ARCHIVED':
      return NotificationConnectionStatus.ARCHIVED;
    case 'CANCELLED':
      return NotificationConnectionStatus.CANCELLED;
    case 'DECLINED':
      return NotificationConnectionStatus.DECLINED;
    case 'INVITED':
      return NotificationConnectionStatus.INVITED;
    case 'REMOVED':
      return NotificationConnectionStatus.REMOVED;
    case 'REQUESTED':
      return NotificationConnectionStatus.REQUESTED;
    default:
      return NotificationConnectionStatus.REMOVED;
  }
};
