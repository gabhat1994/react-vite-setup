/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type WalletStatusForCampaignPaymentQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type WalletStatusForCampaignPaymentQuery = { __typename?: 'Query', getWalletBalance?: { __typename?: 'FundingSourceBalanceOutput', status: string } | null };


export const WalletStatusForCampaignPaymentDocument = gql`
    query walletStatusForCampaignPayment {
  getWalletBalance {
    status
  }
}
    `;

/**
 * __useWalletStatusForCampaignPaymentQuery__
 *
 * To run a query within a React component, call `useWalletStatusForCampaignPaymentQuery` and pass it any options that fit your needs.
 * When your component renders, `useWalletStatusForCampaignPaymentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWalletStatusForCampaignPaymentQuery({
 *   variables: {
 *   },
 * });
 */
export function useWalletStatusForCampaignPaymentQuery(baseOptions?: Apollo.QueryHookOptions<WalletStatusForCampaignPaymentQuery, WalletStatusForCampaignPaymentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WalletStatusForCampaignPaymentQuery, WalletStatusForCampaignPaymentQueryVariables>(WalletStatusForCampaignPaymentDocument, options);
      }
export function useWalletStatusForCampaignPaymentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WalletStatusForCampaignPaymentQuery, WalletStatusForCampaignPaymentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WalletStatusForCampaignPaymentQuery, WalletStatusForCampaignPaymentQueryVariables>(WalletStatusForCampaignPaymentDocument, options);
        }
export type WalletStatusForCampaignPaymentQueryHookResult = ReturnType<typeof useWalletStatusForCampaignPaymentQuery>;
export type WalletStatusForCampaignPaymentLazyQueryHookResult = ReturnType<typeof useWalletStatusForCampaignPaymentLazyQuery>;
export type WalletStatusForCampaignPaymentQueryResult = Apollo.QueryResult<WalletStatusForCampaignPaymentQuery, WalletStatusForCampaignPaymentQueryVariables>;