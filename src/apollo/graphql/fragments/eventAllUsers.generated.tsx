/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { EventUserOutputFragmentDoc } from './event.generated';
export type EventAllUsersFragment = { __typename?: 'UserOutputAllUsers', count?: number | null, data?: Array<{ __typename?: 'UserOutput', _id: string, email?: string | null, firstName?: string | null, lastName?: string | null, middleName?: string | null, title?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null, profilePicture?: string | null } | null } | null> | null };

export const EventAllUsersFragmentDoc = gql`
    fragment EventAllUsers on UserOutputAllUsers {
  count
  data {
    ...EventUserOutput
  }
}
    ${EventUserOutputFragmentDoc}`;