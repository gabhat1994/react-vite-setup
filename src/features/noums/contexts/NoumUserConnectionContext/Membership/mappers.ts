import {
  ConnectionPermissionTypeEnum,
  ConnectionRequestTypeEnum,
  NoumMemberStatus,
} from '@/apollo/generated/types';
import {
  type UserBasicOutputFragment,
  type NoumMembershipStatusFragment,
} from '@/apollo/graphql/fragments';
import { type Maybe } from '@/common/types';
import { type UserNoumConnection } from '../types';

function mapNoumMemberStatusToConnectionRequestTypeEnum(
  memberStatus: Maybe<NoumMemberStatus>,
): ConnectionRequestTypeEnum {
  switch (memberStatus) {
    case NoumMemberStatus.Connected:
      return ConnectionRequestTypeEnum.Approved;
    case NoumMemberStatus.Requested:
      return ConnectionRequestTypeEnum.Requested;
    case NoumMemberStatus.Invited:
      return ConnectionRequestTypeEnum.Invited;
    case NoumMemberStatus.Cancelled:
      return ConnectionRequestTypeEnum.Cancelled;
    default:
      return ConnectionRequestTypeEnum.Removed;
  }
}

export function mapConnectionStatusToConnectionPermissionTypeEnum(
  connectionStatus: Maybe<string>,
): ConnectionPermissionTypeEnum | null {
  switch (connectionStatus) {
    case 'DISCONNECT':
      return ConnectionPermissionTypeEnum.Disconnect;
    case 'FAVOURITE':
      return ConnectionPermissionTypeEnum.Favorite;
    case 'GUEST':
      return ConnectionPermissionTypeEnum.Guest;
    default:
      return null;
  }
}

export function mapMembershipStatusToUserNoumConnection(
  membershipStatus: Maybe<NoumMembershipStatusFragment>,
  user: Maybe<UserBasicOutputFragment>,
): UserNoumConnection | null {
  if (!membershipStatus || !membershipStatus._id || !membershipStatus.status) {
    return null;
  }

  return {
    _id: membershipStatus._id,
    status: mapNoumMemberStatusToConnectionRequestTypeEnum(
      membershipStatus.status,
    ),
    requestFrom: membershipStatus.invitationSentFrom ?? user ?? null,
  };
}
