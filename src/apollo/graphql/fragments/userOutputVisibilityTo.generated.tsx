/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type UserOutputVisibilityToFragment = { __typename?: 'UserOutputVisibilityTo', userid?: string | null };

export const UserOutputVisibilityToFragmentDoc = gql`
    fragment UserOutputVisibilityTo on UserOutputVisibilityTo {
  userid
}
    `;