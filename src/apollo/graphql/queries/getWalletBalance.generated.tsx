/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { WalletFragmentDoc } from '../fragments/wallet.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetWalletQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetWalletQuery = { __typename?: 'Query', getWalletBalance?: { __typename?: 'FundingSourceBalanceOutput', status: string, providerStatus?: string | null, noumenaStatus?: string | null, docStatus?: string | null, customerType?: string | null, balance?: { __typename?: 'CurrencyData', value?: number | null, currency?: Types.CurrencyEnum | null } | null, total?: { __typename?: 'CurrencyData', value?: number | null, currency?: Types.CurrencyEnum | null } | null } | null };


export const GetWalletDocument = gql`
    query getWallet {
  getWalletBalance {
    ...Wallet
  }
}
    ${WalletFragmentDoc}`;

/**
 * __useGetWalletQuery__
 *
 * To run a query within a React component, call `useGetWalletQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWalletQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWalletQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWalletQuery(baseOptions?: Apollo.QueryHookOptions<GetWalletQuery, GetWalletQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWalletQuery, GetWalletQueryVariables>(GetWalletDocument, options);
      }
export function useGetWalletLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWalletQuery, GetWalletQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWalletQuery, GetWalletQueryVariables>(GetWalletDocument, options);
        }
export type GetWalletQueryHookResult = ReturnType<typeof useGetWalletQuery>;
export type GetWalletLazyQueryHookResult = ReturnType<typeof useGetWalletLazyQuery>;
export type GetWalletQueryResult = Apollo.QueryResult<GetWalletQuery, GetWalletQueryVariables>;