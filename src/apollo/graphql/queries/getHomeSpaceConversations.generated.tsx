/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { HomeSpaceConversationOutputFragmentDoc } from '../fragments/homeSpaceConversationOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetHomeSpaceConversationsQueryVariables = Types.Exact<{
  uid?: Types.InputMaybe<Types.Scalars['ID']>;
  spaceId?: Types.InputMaybe<Types.Scalars['ID']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetHomeSpaceConversationsQuery = { __typename?: 'Query', getHomeSpaceConversations?: { __typename?: 'HomeSpaceConversationOutput', groupConversationsCount?: number | null, groupConversationsUnreadMessageCount?: number | null, groupUnreadConversationCount?: number | null, privateConversationCount?: number | null, privateUnreadMessageCount?: number | null, privateUnreadCoversationCount?: number | null, userConversationsCount?: number | null, userAllConversationUnreadMessageCount?: number | null, userAllConversationUnreadConversationCount?: number | null, groupConversations?: Array<{ __typename?: 'ConversationOutput', _id?: string | null, cid?: string | null, spaceId?: string | null, type?: string | null, createdAt?: any | null, updatedAt?: any | null, participants?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, username?: string | null, title?: string | null, userStatus?: string | null, status?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null> | null, metaData?: { __typename?: 'ConversationMeta', sid: string, totalUnreadConversationCount?: number | null } | null } | null> | null, privateConversation?: Array<{ __typename?: 'ConversationOutput', _id?: string | null, cid?: string | null, spaceId?: string | null, type?: string | null, createdAt?: any | null, updatedAt?: any | null, participants?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, username?: string | null, title?: string | null, userStatus?: string | null, status?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null> | null, metaData?: { __typename?: 'ConversationMeta', sid: string, totalUnreadConversationCount?: number | null } | null } | null> | null, userConversations?: Array<{ __typename?: 'ConversationOutput', _id?: string | null, cid?: string | null, spaceId?: string | null, type?: string | null, createdAt?: any | null, updatedAt?: any | null, participants?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, username?: string | null, title?: string | null, userStatus?: string | null, status?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null> | null, metaData?: { __typename?: 'ConversationMeta', sid: string, totalUnreadConversationCount?: number | null } | null } | null> | null } | null };


export const GetHomeSpaceConversationsDocument = gql`
    query GetHomeSpaceConversations($uid: ID, $spaceId: ID, $limit: Int, $offset: Int) {
  getHomeSpaceConversations(
    uid: $uid
    spaceId: $spaceId
    limit: $limit
    offset: $offset
  ) {
    ...HomeSpaceConversationOutput
  }
}
    ${HomeSpaceConversationOutputFragmentDoc}`;

/**
 * __useGetHomeSpaceConversationsQuery__
 *
 * To run a query within a React component, call `useGetHomeSpaceConversationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHomeSpaceConversationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHomeSpaceConversationsQuery({
 *   variables: {
 *      uid: // value for 'uid'
 *      spaceId: // value for 'spaceId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetHomeSpaceConversationsQuery(baseOptions?: Apollo.QueryHookOptions<GetHomeSpaceConversationsQuery, GetHomeSpaceConversationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHomeSpaceConversationsQuery, GetHomeSpaceConversationsQueryVariables>(GetHomeSpaceConversationsDocument, options);
      }
export function useGetHomeSpaceConversationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHomeSpaceConversationsQuery, GetHomeSpaceConversationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHomeSpaceConversationsQuery, GetHomeSpaceConversationsQueryVariables>(GetHomeSpaceConversationsDocument, options);
        }
export type GetHomeSpaceConversationsQueryHookResult = ReturnType<typeof useGetHomeSpaceConversationsQuery>;
export type GetHomeSpaceConversationsLazyQueryHookResult = ReturnType<typeof useGetHomeSpaceConversationsLazyQuery>;
export type GetHomeSpaceConversationsQueryResult = Apollo.QueryResult<GetHomeSpaceConversationsQuery, GetHomeSpaceConversationsQueryVariables>;