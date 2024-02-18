/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ConversationOutputFragmentDoc } from '../fragments/conversationOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetConversationsQueryVariables = Types.Exact<{
  type?: Types.InputMaybe<Types.GetConversationsFilterType>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetConversationsQuery = { __typename?: 'Query', getConversations?: { __typename?: 'ConversationOutputAll', count?: number | null, unreadCount?: number | null, data?: Array<{ __typename?: 'BasicConversationItem', unread?: number | null, conversation?: { __typename?: 'ConversationOutput', _id?: string | null, cid?: string | null, spaceId?: string | null, type?: string | null, createdAt?: any | null, updatedAt?: any | null, participants?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, username?: string | null, title?: string | null, userStatus?: string | null, status?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null> | null, metaData?: { __typename?: 'ConversationMeta', sid: string, totalUnreadConversationCount?: number | null } | null } | null } | { __typename?: 'NoumGroupConversationItem', conversationsCount?: number | null, unreadConversation?: number | null, conversations?: Array<{ __typename?: 'BasicConversationItem', unread?: number | null, conversation?: { __typename?: 'ConversationOutput', _id?: string | null, cid?: string | null, spaceId?: string | null, type?: string | null, createdAt?: any | null, updatedAt?: any | null, participants?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, username?: string | null, title?: string | null, userStatus?: string | null, status?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null> | null, metaData?: { __typename?: 'ConversationMeta', sid: string, totalUnreadConversationCount?: number | null } | null } | null } | null> | null, noum?: { __typename?: 'ChamberByIdRef', _id: string, name?: string | null, profileImage?: string | null, uid?: { __typename?: 'UserOutput', _id: string } | null } | null } | null> | null } | null };


export const GetConversationsDocument = gql`
    query getConversations($type: GetConversationsFilterType, $limit: Int, $offset: Int) {
  getConversations(filter: {type: $type}, limit: $limit, offset: $offset) {
    count
    unreadCount
    data {
      ... on BasicConversationItem {
        unread
        conversation {
          ...ConversationOutput
        }
      }
      ... on NoumGroupConversationItem {
        conversationsCount
        unreadConversation
        conversations {
          unread
          conversation {
            ...ConversationOutput
          }
        }
        noum {
          _id
          name
          profileImage
          uid {
            _id
          }
        }
      }
    }
  }
}
    ${ConversationOutputFragmentDoc}`;

/**
 * __useGetConversationsQuery__
 *
 * To run a query within a React component, call `useGetConversationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationsQuery({
 *   variables: {
 *      type: // value for 'type'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetConversationsQuery(baseOptions?: Apollo.QueryHookOptions<GetConversationsQuery, GetConversationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConversationsQuery, GetConversationsQueryVariables>(GetConversationsDocument, options);
      }
export function useGetConversationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConversationsQuery, GetConversationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConversationsQuery, GetConversationsQueryVariables>(GetConversationsDocument, options);
        }
export type GetConversationsQueryHookResult = ReturnType<typeof useGetConversationsQuery>;
export type GetConversationsLazyQueryHookResult = ReturnType<typeof useGetConversationsLazyQuery>;
export type GetConversationsQueryResult = Apollo.QueryResult<GetConversationsQuery, GetConversationsQueryVariables>;