/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { UserPreferencesFragmentDoc } from '../fragments/userPreferences.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserPreferencesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserPreferencesQuery = { __typename?: 'Query', getUserPreferences?: { __typename?: 'UserPreferences', timezone?: string | null, userId: string, emailSubscriptions: { __typename?: 'SubscriptionTypes', messagesAndConnections?: boolean | null, marketing?: boolean | null, paymentsAndOTPs?: boolean | null, events?: boolean | null, postAndCommentMentions?: boolean | null } } | null };


export const GetUserPreferencesDocument = gql`
    query getUserPreferences {
  getUserPreferences {
    ...UserPreferences
  }
}
    ${UserPreferencesFragmentDoc}`;

/**
 * __useGetUserPreferencesQuery__
 *
 * To run a query within a React component, call `useGetUserPreferencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPreferencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPreferencesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserPreferencesQuery(baseOptions?: Apollo.QueryHookOptions<GetUserPreferencesQuery, GetUserPreferencesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserPreferencesQuery, GetUserPreferencesQueryVariables>(GetUserPreferencesDocument, options);
      }
export function useGetUserPreferencesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserPreferencesQuery, GetUserPreferencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserPreferencesQuery, GetUserPreferencesQueryVariables>(GetUserPreferencesDocument, options);
        }
export type GetUserPreferencesQueryHookResult = ReturnType<typeof useGetUserPreferencesQuery>;
export type GetUserPreferencesLazyQueryHookResult = ReturnType<typeof useGetUserPreferencesLazyQuery>;
export type GetUserPreferencesQueryResult = Apollo.QueryResult<GetUserPreferencesQuery, GetUserPreferencesQueryVariables>;