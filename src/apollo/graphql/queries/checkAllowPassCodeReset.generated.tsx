/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AllowPassCodeResetQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllowPassCodeResetQuery = { __typename?: 'Query', allowPassCodeReset?: { __typename?: 'PassCodeResetOutput', allowReset?: boolean | null } | null };


export const AllowPassCodeResetDocument = gql`
    query allowPassCodeReset {
  allowPassCodeReset {
    allowReset
  }
}
    `;

/**
 * __useAllowPassCodeResetQuery__
 *
 * To run a query within a React component, call `useAllowPassCodeResetQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllowPassCodeResetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllowPassCodeResetQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllowPassCodeResetQuery(baseOptions?: Apollo.QueryHookOptions<AllowPassCodeResetQuery, AllowPassCodeResetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllowPassCodeResetQuery, AllowPassCodeResetQueryVariables>(AllowPassCodeResetDocument, options);
      }
export function useAllowPassCodeResetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllowPassCodeResetQuery, AllowPassCodeResetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllowPassCodeResetQuery, AllowPassCodeResetQueryVariables>(AllowPassCodeResetDocument, options);
        }
export type AllowPassCodeResetQueryHookResult = ReturnType<typeof useAllowPassCodeResetQuery>;
export type AllowPassCodeResetLazyQueryHookResult = ReturnType<typeof useAllowPassCodeResetLazyQuery>;
export type AllowPassCodeResetQueryResult = Apollo.QueryResult<AllowPassCodeResetQuery, AllowPassCodeResetQueryVariables>;