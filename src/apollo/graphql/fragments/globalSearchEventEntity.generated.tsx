/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type GlobalSearchEventEntityFragment = { __typename?: 'GlobalSearchEventEntity', noumId?: string | null, name: string, status?: Types.EventStatus | null, createdAt: any };

export const GlobalSearchEventEntityFragmentDoc = gql`
    fragment GlobalSearchEventEntity on GlobalSearchEventEntity {
  noumId
  name
  status
  createdAt
}
    `;