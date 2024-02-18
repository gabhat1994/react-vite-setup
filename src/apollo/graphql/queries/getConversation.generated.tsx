/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetConversationQueryVariables = Types.Exact<{
  userIds?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['ID']>> | Types.InputMaybe<Types.Scalars['ID']>>;
  spaceId?: Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type GetConversationQuery = { __typename?: 'Query', getConversation?: { __typename?: 'ConversationIdOutput', cid: string } | null };


export const GetConversationDocument = gql`
    query getConversation($userIds: [ID], $spaceId: ID) {
  getConversation(userIds: $userIds, spaceId: $spaceId) {
    cid
  }
}
    `;

/**
 * __useGetConversationQuery__
 *
 * To run a query within a React component, call `useGetConversationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationQuery({
 *   variables: {
 *      userIds: // value for 'userIds'
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useGetConversationQuery(baseOptions?: Apollo.QueryHookOptions<GetConversationQuery, GetConversationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConversationQuery, GetConversationQueryVariables>(GetConversationDocument, options);
      }
export function useGetConversationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConversationQuery, GetConversationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConversationQuery, GetConversationQueryVariables>(GetConversationDocument, options);
        }
export type GetConversationQueryHookResult = ReturnType<typeof useGetConversationQuery>;
export type GetConversationLazyQueryHookResult = ReturnType<typeof useGetConversationLazyQuery>;
export type GetConversationQueryResult = Apollo.QueryResult<GetConversationQuery, GetConversationQueryVariables>;