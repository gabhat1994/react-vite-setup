/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type GlobalSearchEntityUserFragment = { __typename?: 'GlobalSearchEntityUser', id?: string | null, name?: string | null, title?: string | null, thumbnailUrl?: string | null, status?: Types.GlobalSearchUserEntityStatus | null, isNoumenaEmployee: boolean, firstName?: string | null, lastName?: string | null };

export const GlobalSearchEntityUserFragmentDoc = gql`
    fragment GlobalSearchEntityUser on GlobalSearchEntityUser {
  id
  name
  title
  thumbnailUrl
  status
  isNoumenaEmployee
  firstName
  lastName
}
    `;