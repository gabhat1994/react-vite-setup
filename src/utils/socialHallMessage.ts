import { type UserOutput } from '@/apollo/generated/types';
import { type GroupUserHashMap } from '@/features/socialHall/types';
import { UserUtil } from './user';

export const SocialHallMessageUtils = {
  getUserHashMap: (users: UserOutput[]): GroupUserHashMap => {
    let hashMap: GroupUserHashMap = {};
    users?.forEach((user) => {
      hashMap = {
        ...hashMap,
        [user?._id!]: {
          _id: user?._id!,
          profileUrl: UserUtil.getProfilePicture(user),
        },
      };
    });

    return hashMap;
  },
};
