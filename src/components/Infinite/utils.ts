import { NetworkStatus } from '@apollo/client';
import { type BottomStatus } from './types';

interface GetBottomStatusOptions {
  networkStatus: NetworkStatus;
  totalCount: number;
  currentCount: number;
  withForce?: boolean;
}

export function getBottomStatusFromQuery({
  networkStatus,
  currentCount,
  totalCount,
  withForce = false,
}: GetBottomStatusOptions): BottomStatus {
  if ([NetworkStatus.loading, NetworkStatus.refetch].includes(networkStatus)) {
    return 'loading';
  }

  if (totalCount > currentCount) {
    return 'hasNextPage';
  }

  return withForce ? 'end-with-force' : 'end';
}
