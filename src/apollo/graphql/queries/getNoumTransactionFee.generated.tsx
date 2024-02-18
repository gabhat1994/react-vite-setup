/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumTransactionFragmentDoc } from '../fragments/noumTransactionFee.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNoumTransactionFeeDetailsQueryVariables = Types.Exact<{
  noumDetailInput: Types.NoumTransactionDetailInputType;
}>;


export type GetNoumTransactionFeeDetailsQuery = { __typename?: 'Query', getNoumTransactionFeeDetails: Array<{ __typename?: 'NoumTransactionFee', valid_till?: string | null, noum_transaction_fee_id?: number | null, is_publishable?: boolean | null, status?: Types.Status_Noum | null, subscription_id?: { __typename?: 'SubscriptionOutput', subscription_id: number, counters?: { __typename?: 'SubSettingCountersOutput', noumSetup: { __typename?: 'SubSettingCounterOptionsOutput', current: number } } | null } | null, chamber_id?: { __typename?: 'ChamberByIdRef', _id: string, type?: string | null, name?: string | null, profileImage?: string | null } | null }> };


export const GetNoumTransactionFeeDetailsDocument = gql`
    query getNoumTransactionFeeDetails($noumDetailInput: NoumTransactionDetailInputType!) {
  getNoumTransactionFeeDetails(noumDetailInput: $noumDetailInput) {
    ...NoumTransaction
  }
}
    ${NoumTransactionFragmentDoc}`;

/**
 * __useGetNoumTransactionFeeDetailsQuery__
 *
 * To run a query within a React component, call `useGetNoumTransactionFeeDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumTransactionFeeDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumTransactionFeeDetailsQuery({
 *   variables: {
 *      noumDetailInput: // value for 'noumDetailInput'
 *   },
 * });
 */
export function useGetNoumTransactionFeeDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetNoumTransactionFeeDetailsQuery, GetNoumTransactionFeeDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumTransactionFeeDetailsQuery, GetNoumTransactionFeeDetailsQueryVariables>(GetNoumTransactionFeeDetailsDocument, options);
      }
export function useGetNoumTransactionFeeDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumTransactionFeeDetailsQuery, GetNoumTransactionFeeDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumTransactionFeeDetailsQuery, GetNoumTransactionFeeDetailsQueryVariables>(GetNoumTransactionFeeDetailsDocument, options);
        }
export type GetNoumTransactionFeeDetailsQueryHookResult = ReturnType<typeof useGetNoumTransactionFeeDetailsQuery>;
export type GetNoumTransactionFeeDetailsLazyQueryHookResult = ReturnType<typeof useGetNoumTransactionFeeDetailsLazyQuery>;
export type GetNoumTransactionFeeDetailsQueryResult = Apollo.QueryResult<GetNoumTransactionFeeDetailsQuery, GetNoumTransactionFeeDetailsQueryVariables>;