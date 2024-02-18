/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CheckPassCodeExistsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CheckPassCodeExistsQuery = { __typename?: 'Query', checkPassCodeExists: boolean };


export const CheckPassCodeExistsDocument = gql`
    query checkPassCodeExists {
  checkPassCodeExists
}
    `;

/**
 * __useCheckPassCodeExistsQuery__
 *
 * To run a query within a React component, call `useCheckPassCodeExistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckPassCodeExistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckPassCodeExistsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCheckPassCodeExistsQuery(baseOptions?: Apollo.QueryHookOptions<CheckPassCodeExistsQuery, CheckPassCodeExistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckPassCodeExistsQuery, CheckPassCodeExistsQueryVariables>(CheckPassCodeExistsDocument, options);
      }
export function useCheckPassCodeExistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckPassCodeExistsQuery, CheckPassCodeExistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckPassCodeExistsQuery, CheckPassCodeExistsQueryVariables>(CheckPassCodeExistsDocument, options);
        }
export type CheckPassCodeExistsQueryHookResult = ReturnType<typeof useCheckPassCodeExistsQuery>;
export type CheckPassCodeExistsLazyQueryHookResult = ReturnType<typeof useCheckPassCodeExistsLazyQuery>;
export type CheckPassCodeExistsQueryResult = Apollo.QueryResult<CheckPassCodeExistsQuery, CheckPassCodeExistsQueryVariables>;