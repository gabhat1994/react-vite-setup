/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CheckWalletExistsQueryVariables = Types.Exact<{
  targetUserId: Types.Scalars['ID'];
}>;


export type CheckWalletExistsQuery = { __typename?: 'Query', checkWalletExists?: { __typename?: 'WalletExistType', source: boolean, success: boolean, target: boolean, sourceId?: string | null, targetId?: string | null } | null };


export const CheckWalletExistsDocument = gql`
    query checkWalletExists($targetUserId: ID!) {
  checkWalletExists(targetUserId: $targetUserId) {
    source
    success
    target
    sourceId
    targetId
  }
}
    `;

/**
 * __useCheckWalletExistsQuery__
 *
 * To run a query within a React component, call `useCheckWalletExistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckWalletExistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckWalletExistsQuery({
 *   variables: {
 *      targetUserId: // value for 'targetUserId'
 *   },
 * });
 */
export function useCheckWalletExistsQuery(baseOptions: Apollo.QueryHookOptions<CheckWalletExistsQuery, CheckWalletExistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckWalletExistsQuery, CheckWalletExistsQueryVariables>(CheckWalletExistsDocument, options);
      }
export function useCheckWalletExistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckWalletExistsQuery, CheckWalletExistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckWalletExistsQuery, CheckWalletExistsQueryVariables>(CheckWalletExistsDocument, options);
        }
export type CheckWalletExistsQueryHookResult = ReturnType<typeof useCheckWalletExistsQuery>;
export type CheckWalletExistsLazyQueryHookResult = ReturnType<typeof useCheckWalletExistsLazyQuery>;
export type CheckWalletExistsQueryResult = Apollo.QueryResult<CheckWalletExistsQuery, CheckWalletExistsQueryVariables>;