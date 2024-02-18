import { type SpaceConnectionBasicFragment } from '@/apollo/graphql';
import { type Maybe } from '@/common/types';
import { type UserNoumConnection } from './types';

export function mapSpaceConnectionToUserNoumConnection(
  spaceConnection: Maybe<SpaceConnectionBasicFragment>,
): UserNoumConnection | null {
  if (!spaceConnection || !spaceConnection._id || !spaceConnection.status) {
    return null;
  }

  return {
    _id: spaceConnection._id,
    status: spaceConnection.status,
    requestFrom: spaceConnection.requestFrom?.uid ?? null,
  };
}
