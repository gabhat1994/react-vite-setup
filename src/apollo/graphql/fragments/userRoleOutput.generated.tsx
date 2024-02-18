/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type UserRoleOutputFragment = { __typename?: 'UserRoleOutput', _id: string, roleType?: string | null, permissions?: Array<string | null> | null };

export const UserRoleOutputFragmentDoc = gql`
    fragment UserRoleOutput on UserRoleOutput {
  _id
  roleType
  permissions
}
    `;