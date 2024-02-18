/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCurrentUserStatusQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCurrentUserStatusQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', userStatus?: string | null } | null };


export const GetCurrentUserStatusDocument = gql`
    query getCurrentUserStatus {
  currentUser {
    userStatus
  }
}
    `;

/**
 * __useGetCurrentUserStatusQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserStatusQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserStatusQuery, GetCurrentUserStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserStatusQuery, GetCurrentUserStatusQueryVariables>(GetCurrentUserStatusDocument, options);
      }
export function useGetCurrentUserStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserStatusQuery, GetCurrentUserStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserStatusQuery, GetCurrentUserStatusQueryVariables>(GetCurrentUserStatusDocument, options);
        }
export type GetCurrentUserStatusQueryHookResult = ReturnType<typeof useGetCurrentUserStatusQuery>;
export type GetCurrentUserStatusLazyQueryHookResult = ReturnType<typeof useGetCurrentUserStatusLazyQuery>;
export type GetCurrentUserStatusQueryResult = Apollo.QueryResult<GetCurrentUserStatusQuery, GetCurrentUserStatusQueryVariables>;