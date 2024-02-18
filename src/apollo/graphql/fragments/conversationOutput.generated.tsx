/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type ConversationUserOutputFragment = { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, username?: string | null, title?: string | null, userStatus?: string | null, status?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null };

export type ConversationOutputFragment = { __typename?: 'ConversationOutput', _id?: string | null, cid?: string | null, spaceId?: string | null, type?: string | null, createdAt?: any | null, updatedAt?: any | null, participants?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, username?: string | null, title?: string | null, userStatus?: string | null, status?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null> | null, metaData?: { __typename?: 'ConversationMeta', sid: string, totalUnreadConversationCount?: number | null } | null };

export const ConversationUserOutputFragmentDoc = gql`
    fragment ConversationUserOutput on UserOutput {
  _id
  firstName
  lastName
  username
  profile {
    _id
    profilePicture
    profilePictureThumbnail
  }
  title
  userStatus
  status
  chamber {
    _id
    userId
  }
}
    `;
export const ConversationOutputFragmentDoc = gql`
    fragment ConversationOutput on ConversationOutput {
  _id
  cid
  spaceId
  type
  participants {
    ...ConversationUserOutput
  }
  metaData {
    sid
    totalUnreadConversationCount
  }
  createdAt
  updatedAt
}
    ${ConversationUserOutputFragmentDoc}`;