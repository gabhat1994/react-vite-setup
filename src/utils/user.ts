import { get } from 'lodash';
import { t } from 'i18next';
import {
  ActionType,
  type Maybe,
  type UserOutput,
  UserStatus,
} from '@/apollo/generated/types';
import NonNMDefaultImage from '@/assets/images/non_noumena_member_profile_default.svg';
import { type UserFragment } from '@/apollo/graphql/fragments';
import { getFullName } from './fullName';

type UserWithStatus =
  | Maybe<Pick<UserFragment | UserOutput, 'userStatus'>>
  | undefined;

type UserBasic = Pick<
  UserOutput | UserFragment,
  'userStatus' | 'firstName' | 'lastName' | 'username'
>;

export type UserProfile = Maybe<UserFragment> | Maybe<UserOutput> | undefined;

export const UserUtil = {
  renderName: (user?: Maybe<UserBasic> | undefined) => {
    const username = user?.username;
    if (!user || username === undefined) {
      return '';
    }
    if (
      !username ||
      (!UserUtil.isPending(user) && UserUtil.isInactive(user)) ||
      UserUtil.isDeleted(user)
    ) {
      return t('noumena.inactive_user');
    }
    return getFullName(user.firstName, '', user.lastName);
  },
  renderFirstName: (user?: Pick<UserBasic, 'firstName'>) =>
    user?.firstName ?? '',
  renderFullName: (user?: Maybe<UserOutput> | Maybe<UserFragment>) =>
    UserUtil.isInactive(user)
      ? t('noumena.inactive_user')
      : getFullName(user?.firstName, user?.middleName, user?.lastName),
  renderGroupName: (users?: Maybe<UserOutput>[] | Maybe<UserFragment>[]) => {
    let groupName = '';
    if (!users) return t('noumena.inactive_user');
    if (users.length === 1) {
      groupName = UserUtil.renderName(users[0]);
    } else if (users.length > 1) {
      groupName = users
        .map((user) => {
          if (
            !user?.username ||
            UserUtil.isInactive(user) ||
            UserUtil.isDeleted(user)
          ) {
            return t('noumena.inactive_user');
          }
          return user?.firstName;
        })
        .join(', ');
    }
    return groupName;
  },
  renderUsername: (username?: Maybe<string>) =>
    username ? `@${username}` : null,
  getProfilePicture: (user: UserProfile) => {
    if (UserUtil.isUnregistered(user)) return NonNMDefaultImage;
    if (UserUtil.isInactive(user)) return '';
    return (
      user?.profile?.profilePictureThumbnail ||
      user?.profile?.profilePicture ||
      ''
    );
  },
  getAbbreviation: (
    firstName: Maybe<string> = '',
    lastName: Maybe<string> = '',
  ) => `${get(firstName, '0', '')}${get(lastName, '0', '')}`,
  isPending: (user: UserWithStatus) => user?.userStatus === ActionType.Pending,
  isRejected: (user: UserWithStatus) =>
    user?.userStatus === ActionType.Rejected,
  isInactive: (user: UserWithStatus) =>
    user?.userStatus !== UserStatus.Active &&
    user?.userStatus !== UserStatus.Unregistered &&
    // TODO: Replace with the correct enum value once it's available.
    // user?.userStatus !== UserStatus.Unauthenticated
    user?.userStatus !== 'UNAUTHENTICATED',
  isActive: (user: UserWithStatus) => user?.userStatus === UserStatus.Active,
  isDeleted: (user: UserWithStatus) => user?.userStatus === UserStatus.Deleted,
  isUnregistered: (user: UserWithStatus) =>
    user?.userStatus === UserStatus.Unregistered,
  isUnauthenticated: (user: UserWithStatus) =>
    // user?.userStatus === UserStatus.Unauthenticated
    // TODO: Replace with the correct enum value once it's available.
    user?.userStatus === 'UNAUTHENTICATED',
  goToUserProfile: (user: UserProfile, target = '_blank') => {
    if (
      !UserUtil.isUnregistered(user) &&
      user?.chamber?._id &&
      user?.chamber?._id !== ''
    )
      window.open(`/noum/${user.chamber._id}`, target);
  },
  isCompletedAboutMe: (user: UserProfile) =>
    !!user?.title &&
    !!user?.firstName &&
    !!user.lastName &&
    !!user.location &&
    !!user.bio &&
    !!UserUtil.getProfilePicture(user),
};
