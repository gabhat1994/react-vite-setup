/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumSetupCounterFragmentDoc } from '../fragments/noumTransactionFee.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PayAsYouGoSetupCountersQueryVariables = Types.Exact<{
  noumDetailInput: Types.NoumTransactionDetailInputType;
}>;


export type PayAsYouGoSetupCountersQuery = { __typename?: 'Query', getNoumTransactionFeeDetails: Array<{ __typename?: 'NoumTransactionFee', subscription_id?: { __typename?: 'SubscriptionOutput', subscription_id: number, counters?: { __typename?: 'SubSettingCountersOutput', noumSetup: { __typename?: 'SubSettingCounterOptionsOutput', current: number } } | null } | null }> };


export const PayAsYouGoSetupCountersDocument = gql`
    query payAsYouGoSetupCounters($noumDetailInput: NoumTransactionDetailInputType!) {
  getNoumTransactionFeeDetails(noumDetailInput: $noumDetailInput) {
    subscription_id {
      ...NoumSetupCounter
    }
  }
}
    ${NoumSetupCounterFragmentDoc}`;

/**
 * __usePayAsYouGoSetupCountersQuery__
 *
 * To run a query within a React component, call `usePayAsYouGoSetupCountersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePayAsYouGoSetupCountersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePayAsYouGoSetupCountersQuery({
 *   variables: {
 *      noumDetailInput: // value for 'noumDetailInput'
 *   },
 * });
 */
export function usePayAsYouGoSetupCountersQuery(baseOptions: Apollo.QueryHookOptions<PayAsYouGoSetupCountersQuery, PayAsYouGoSetupCountersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PayAsYouGoSetupCountersQuery, PayAsYouGoSetupCountersQueryVariables>(PayAsYouGoSetupCountersDocument, options);
      }
export function usePayAsYouGoSetupCountersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PayAsYouGoSetupCountersQuery, PayAsYouGoSetupCountersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PayAsYouGoSetupCountersQuery, PayAsYouGoSetupCountersQueryVariables>(PayAsYouGoSetupCountersDocument, options);
        }
export type PayAsYouGoSetupCountersQueryHookResult = ReturnType<typeof usePayAsYouGoSetupCountersQuery>;
export type PayAsYouGoSetupCountersLazyQueryHookResult = ReturnType<typeof usePayAsYouGoSetupCountersLazyQuery>;
export type PayAsYouGoSetupCountersQueryResult = Apollo.QueryResult<PayAsYouGoSetupCountersQuery, PayAsYouGoSetupCountersQueryVariables>;