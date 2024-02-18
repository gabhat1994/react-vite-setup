/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type AttendeesFragment = { __typename?: 'Attendees', userRole?: Types.UserRole | null, invitationId?: string | null, invitationStatus?: Types.InvitationStatus | null, userId?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, email?: string | null, title?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null };

export const AttendeesFragmentDoc = gql`
    fragment Attendees on Attendees {
  userId {
    _id
    firstName
    middleName
    lastName
    email
    title
    profile {
      profilePicture
      profilePictureThumbnail
    }
    userStatus
    chamber {
      userId
      _id
    }
  }
  userRole
  invitationId
  invitationStatus
}
    `;