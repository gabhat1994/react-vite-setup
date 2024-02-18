/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ConversationOutputFragmentDoc } from './conversationOutput.generated';
export type HomeSpaceConversationOutputFragment = { __typename?: 'HomeSpaceConversationOutput', groupConversationsCount?: number | null, groupConversationsUnreadMessageCount?: number | null, groupUnreadConversationCount?: number | null, privateConversationCount?: number | null, privateUnreadMessageCount?: number | null, privateUnreadCoversationCount?: number | null, userConversationsCount?: number | null, userAllConversationUnreadMessageCount?: number | null, userAllConversationUnreadConversationCount?: number | null, groupConversations?: Array<{ __typename?: 'ConversationOutput', _id?: string | null, cid?: string | null, spaceId?: string | null, type?: string | null, createdAt?: any | null, updatedAt?: any | null, participants?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, username?: string | null, title?: string | null, userStatus?: string | null, status?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null> | null, metaData?: { __typename?: 'ConversationMeta', sid: string, totalUnreadConversationCount?: number | null } | null } | null> | null, privateConversation?: Array<{ __typename?: 'ConversationOutput', _id?: string | null, cid?: string | null, spaceId?: string | null, type?: string | null, createdAt?: any | null, updatedAt?: any | null, participants?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, username?: string | null, title?: string | null, userStatus?: string | null, status?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null> | null, metaData?: { __typename?: 'ConversationMeta', sid: string, totalUnreadConversationCount?: number | null } | null } | null> | null, userConversations?: Array<{ __typename?: 'ConversationOutput', _id?: string | null, cid?: string | null, spaceId?: string | null, type?: string | null, createdAt?: any | null, updatedAt?: any | null, participants?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, username?: string | null, title?: string | null, userStatus?: string | null, status?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null> | null, metaData?: { __typename?: 'ConversationMeta', sid: string, totalUnreadConversationCount?: number | null } | null } | null> | null };

export const HomeSpaceConversationOutputFragmentDoc = gql`
    fragment HomeSpaceConversationOutput on HomeSpaceConversationOutput {
  groupConversations {
    ...ConversationOutput
  }
  groupConversationsCount
  groupConversationsUnreadMessageCount
  groupUnreadConversationCount
  privateConversation {
    ...ConversationOutput
  }
  privateConversationCount
  privateUnreadMessageCount
  privateUnreadCoversationCount
  userConversations {
    ...ConversationOutput
  }
  userConversationsCount
  userAllConversationUnreadMessageCount
  userAllConversationUnreadConversationCount
}
    ${ConversationOutputFragmentDoc}`;