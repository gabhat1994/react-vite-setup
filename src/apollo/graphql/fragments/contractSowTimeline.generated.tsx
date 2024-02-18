/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type ContractSowTimelineFragment = { __typename?: 'ContractSowTimeLine', timestamp: any, userId?: string | null, fromStatus?: string | null, toStatus: string };

export const ContractSowTimelineFragmentDoc = gql`
    fragment ContractSowTimeline on ContractSowTimeLine {
  timestamp
  userId
  fromStatus
  toStatus
}
    `;