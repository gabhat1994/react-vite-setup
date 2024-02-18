/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type GlobalSearchNoumEntityFragment = { __typename?: 'GlobalSearchNoumEntity', name: string, type: string, thumbnailUrl?: string | null, isConnected: boolean, isFollowing: boolean, status?: Types.NoumStatus | null };

export const GlobalSearchNoumEntityFragmentDoc = gql`
    fragment GlobalSearchNoumEntity on GlobalSearchNoumEntity {
  name
  type
  thumbnailUrl
  isConnected
  isFollowing
  status
}
    `;