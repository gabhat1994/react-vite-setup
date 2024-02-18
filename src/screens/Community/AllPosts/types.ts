import {
  type GetEventsQueryResult,
  type PostItemFragment,
} from '@/apollo/graphql';
import { type NetworkStatus } from '@apollo/client/core/networkStatus';
import { type Dispatch, type SetStateAction } from 'react';

export type AllPostsProps = {
  totalCount: number;
  posts?: PostItemFragment[];
  fetchMore: GetEventsQueryResult['fetchMore'];
  networkStatus: NetworkStatus;
  refetch?: () => Promise<void>;
  loadingMyFeed?: boolean;
  forceRender?: boolean;
  setForceRender?: Dispatch<SetStateAction<boolean>>;
};
