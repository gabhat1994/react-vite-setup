import { get } from 'lodash';
import { ActionType, PostVisibility } from '@/apollo/generated/types';

type Post = {
  feature: 'POST';
  visibility: PostVisibility;
  isConnected: boolean;
  isFollowing: boolean;
  isUnregistered?: boolean;
};

type Comments = {
  feature: 'COMMENT';
  canReply: boolean;
  isOwner: boolean;
  isUnregistered?: boolean;
};

type PermissionFeatureType = 'CHAMBER' | 'POST' | 'COMMENT';
type PermissionActionType =
  | 'READ'
  | 'CREATE'
  | 'EDIT'
  | 'ADMIN_EDIT'
  | 'DELETE'
  | 'REPORT'
  | 'COMMENT'
  | 'LIKE'
  | 'PIN'
  | 'UNPIN';
export type UserType =
  | ActionType.Pending
  | 'GUEST'
  | 'OWNER'
  | 'ADMIN'
  | 'ADMINOWNER'
  | 'FOLLOWER'
  | 'FAVOURITE'
  | 'UNREGISTERED'
  | 'UNREGISTEREDOWNER'
  | undefined;
type PermissionFeature = Post | Comments;

const permssions = {
  POST: {
    READ: {
      OWNER: true,
      FAVOURITE: true,
      GUEST: true,
      FOLLOWER: true,
      UNREGISTERED: true,
      UNREGISTEREDOWNER: true,
    },
    CREATE: {
      OWNER: true,
      FAVOURITE: true,
      GUEST: true,
      FOLLOWER: false,
      UNREGISTERED: true,
      UNREGISTEREDOWNER: true,
    },
    EDIT: {
      OWNER: true,
      FAVOURITE: false,
      GUEST: false,
      FOLLOWER: false,
      ADMINOWNER: true,
      UNREGISTERED: false,
      UNREGISTEREDOWNER: false,
    },
    ADMIN_EDIT: {
      ADMIN: true,
      OWNER: true,
      FAVOURITE: false,
      GUEST: false,
      FOLLOWER: false,
      ADMINOWNER: true,
      UNREGISTERED: false,
      UNREGISTEREDOWNER: false,
    },
    DELETE: {
      ADMIN: true,
      OWNER: true,
      FAVOURITE: false,
      GUEST: false,
      FOLLOWER: false,
      ADMINOWNER: true,
      UNREGISTERED: false,
      UNREGISTEREDOWNER: true,
    },
    REPORT: {
      [ActionType.Pending]: true,
      OWNER: false,
      FAVOURITE: true,
      GUEST: true,
      FOLLOWER: true,
      ADMIN: true,
      UNREGISTERED: false,
      UNREGISTEREDOWNER: false,
    },
    LIKE: {
      [ActionType.Pending]: true,
      ADMIN: true,
      ADMINOWNER: true,
      OWNER: true,
      FAVOURITE: true,
      GUEST: true,
      FOLLOWER: true,
      UNREGISTERED: true,
      UNREGISTEREDOWNER: true,
    },
    COMMENT: {
      [ActionType.Pending]: true,
      ADMIN: true,
      ADMINOWNER: true,
      OWNER: true,
      FAVOURITE: true,
      GUEST: true,
      FOLLOWER: true,
      UNREGISTERED: true,
      UNREGISTEREDOWNER: true,
    },
    PIN: {
      [ActionType.Pending]: false,
      ADMIN: true,
      OWNER: false,
      FAVOURITE: false,
      GUEST: false,
      FOLLOWER: false,
      ADMINOWNER: true,
      UNREGISTERED: false,
      UNREGISTEREDOWNER: false,
    },
    UNPIN: {
      [ActionType.Pending]: false,
      ADMIN: true,
      OWNER: false,
      FAVOURITE: false,
      GUEST: false,
      FOLLOWER: false,
      ADMINOWNER: true,
      UNREGISTERED: false,
      UNREGISTEREDOWNER: false,
    },
  },
  COMMENT: {
    DELETE: {
      [ActionType.Pending]: false,
      ADMIN: true,
      OWNER: true,
      FAVOURITE: false,
      GUEST: false,
      FOLLOWER: false,
      ADMINOWNER: true,
      UNREGISTERED: false,
      UNREGISTEREDOWNER: true,
    },
  },
};

export const useGetUserType =
  () =>
  (value: PermissionFeature): UserType => {
    let userType: UserType;
    switch (value.feature) {
      case 'POST':
        if (value.isUnregistered) userType = 'UNREGISTERED';
        else if (value.isConnected) userType = 'FAVOURITE';
        else if (value.isFollowing) userType = 'FOLLOWER';
        else if (value.visibility === PostVisibility.All) userType = 'GUEST';
        break;
      default:
        break;
    }
    return userType;
  };

// Get userType hook
export const usePermissions =
  () =>
  (
    feature: PermissionFeatureType,
    action: PermissionActionType,
    userType: UserType,
  ) => {
    const p = get(permssions, `${feature}.${action}.${userType}`);
    return p ?? false;
  };

export default usePermissions;
