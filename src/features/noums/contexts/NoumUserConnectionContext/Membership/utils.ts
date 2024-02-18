import { ConnectionRequestTypeEnum } from '@/apollo/generated/types';
import {
  type SpaceOutputFragment,
  type SpaceConnectionBasicFragment,
} from '@/apollo/graphql';
import { type Maybe } from '@/common/types';
import { UserActionMode } from '@/screens/Chamber/components/RightPanel/elements/NoumActions/types';
import { SpaceUtils } from '@/utils/space';

type Connection = Pick<
  SpaceConnectionBasicFragment,
  '_id' | 'status' | 'requestFrom' | 'requestTo'
>;

export function getUserActionMode(
  space: SpaceOutputFragment,
  connection: Maybe<Connection>,
  userId: string,
) {
  if (!connection) {
    return getDefaultActionModeForType(space);
  }

  switch (connection.status) {
    case ConnectionRequestTypeEnum.Invited:
      return UserActionMode.handleInvitation;

    case ConnectionRequestTypeEnum.Requested: {
      if (SpaceUtils.isMasterNoum(space)) {
        return connection.requestFrom?._id === userId
          ? UserActionMode.handleRequest
          : UserActionMode.handleInvitation;
      }
      return getDefaultActionModeForType(space);
    }

    case ConnectionRequestTypeEnum.Approved:
      return UserActionMode.handleConnection;

    case ConnectionRequestTypeEnum.Removed:
    case ConnectionRequestTypeEnum.Declined:
    case ConnectionRequestTypeEnum.Cancelled:
      return getDefaultActionModeForType(space);
  }

  return null;
}

function getDefaultActionModeForType(
  space: SpaceOutputFragment,
): UserActionMode | null {
  if (SpaceUtils.isMasterNoum(space)) {
    return UserActionMode.handleRequest;
  }
  if (SpaceUtils.isPublicNoum(space)) {
    return UserActionMode.handleConnection;
  }
  if (SpaceUtils.isPrivateNoum(space)) {
    return UserActionMode.handleRequest;
  }
  if (SpaceUtils.isSecretNoum(space)) {
    return UserActionMode.handleWaitInvitation;
  }

  return null;
}
