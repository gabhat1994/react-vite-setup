import { ConnectionRequestTypeEnum } from '@/apollo/generated/types';
import { type SpaceOutputFragment } from '@/apollo/graphql';
import { type Maybe } from '@/common/types';
import { UserActionMode } from '@/screens/Chamber/components/RightPanel/elements/NoumActions/types';
import { SpaceUtils } from '@/utils/space';
import { type UserNoumConnection } from '../types';

export function getUserActionMode(
  space: SpaceOutputFragment,
  connection: Maybe<UserNoumConnection>,
  userHomeNoumId: string,
) {
  if (!connection) {
    return getDefaultActionModeForType(space);
  }

  switch (connection.status) {
    case ConnectionRequestTypeEnum.Invited:
      return UserActionMode.handleInvitation;

    case ConnectionRequestTypeEnum.Requested: {
      if (SpaceUtils.isMasterNoum(space)) {
        return connection.requestFrom?.chamber?._id === userHomeNoumId
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
