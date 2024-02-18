import { type UserOutput } from '@/apollo/generated/types';

import { type Maybe } from '@/common/types';
import { UserUtil } from '@/utils/user';
import { type UserFragment } from '@/apollo/graphql/fragments';
import { type IUser } from '../types/context';

export const generateEventUser = (
  user: Maybe<Partial<UserOutput>>,
  isSaved?: boolean,
  isConnected?: boolean,
): IUser | null => {
  if (!user) return null;

  return {
    _id: user._id,
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    title: user.title,
    email: user.email,
    profilePictureThumbnail:
      UserUtil.getProfilePicture(user as UserFragment) ?? '',
    isHost: false,
    isConnected: Boolean(isConnected),
    isSaved: Boolean(isSaved),
    chamberId: user.chamber?._id ?? '',
  };
};
