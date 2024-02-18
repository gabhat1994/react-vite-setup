/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type UserOutputVisibilityFragment = { __typename?: 'UserOutputVisibility', email?: string | null, phone?: string | null, location?: string | null };

export const UserOutputVisibilityFragmentDoc = gql`
    fragment UserOutputVisibility on UserOutputVisibility {
  email
  phone
  location
}
    `;