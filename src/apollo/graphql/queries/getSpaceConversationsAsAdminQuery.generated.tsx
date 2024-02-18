/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ConversationOutputFragmentDoc } from '../fragments/conversationOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSpaceConversationsAsAdminQueryQueryVariables = Types.Exact<{
  spaceId: Types.Scalars['ID'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  filter?: Types.InputMaybe<Types.SearchChamberAdminFilter>;
}>;


export type GetSpaceConversationsAsAdminQueryQuery = { __typename?: 'Query', getSpaceConversationsAsAdminQuery?: { __typename?: 'ConversationsOutput', count?: number | null, unreadMessageCount?: number | null, data?: Array<{ __typename?: 'ConversationOutput', _id?: string | null, cid?: string | null, spaceId?: string | null, type?: string | null, createdAt?: any | null, updatedAt?: any | null, participants?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, username?: string | null, title?: string | null, userStatus?: string | null, status?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null> | null, metaData?: { __typename?: 'ConversationMeta', sid: string, totalUnreadConversationCount?: number | null } | null } | null> | null } | null };


export const GetSpaceConversationsAsAdminQueryDocument = gql`
    query getSpaceConversationsAsAdminQuery($spaceId: ID!, $limit: Int, $offset: Int, $filter: SearchChamberAdminFilter) {
  getSpaceConversationsAsAdminQuery(
    spaceId: $spaceId
    limit: $limit
    offset: $offset
    filter: $filter
  ) {
    count
    unreadMessageCount
    data {
      ...ConversationOutput
    }
  }
}
    ${ConversationOutputFragmentDoc}`;

/**
 * __useGetSpaceConversationsAsAdminQueryQuery__
 *
 * To run a query within a React component, call `useGetSpaceConversationsAsAdminQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpaceConversationsAsAdminQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpaceConversationsAsAdminQueryQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetSpaceConversationsAsAdminQueryQuery(baseOptions: Apollo.QueryHookOptions<GetSpaceConversationsAsAdminQueryQuery, GetSpaceConversationsAsAdminQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSpaceConversationsAsAdminQueryQuery, GetSpaceConversationsAsAdminQueryQueryVariables>(GetSpaceConversationsAsAdminQueryDocument, options);
      }
export function useGetSpaceConversationsAsAdminQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSpaceConversationsAsAdminQueryQuery, GetSpaceConversationsAsAdminQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSpaceConversationsAsAdminQueryQuery, GetSpaceConversationsAsAdminQueryQueryVariables>(GetSpaceConversationsAsAdminQueryDocument, options);
        }
export type GetSpaceConversationsAsAdminQueryQueryHookResult = ReturnType<typeof useGetSpaceConversationsAsAdminQueryQuery>;
export type GetSpaceConversationsAsAdminQueryLazyQueryHookResult = ReturnType<typeof useGetSpaceConversationsAsAdminQueryLazyQuery>;
export type GetSpaceConversationsAsAdminQueryQueryResult = Apollo.QueryResult<GetSpaceConversationsAsAdminQueryQuery, GetSpaceConversationsAsAdminQueryQueryVariables>;