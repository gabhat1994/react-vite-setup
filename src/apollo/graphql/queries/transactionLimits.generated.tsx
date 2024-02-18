/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TransactionLimitsQueryVariables = Types.Exact<{
  sourceAccountId: Types.Scalars['ID'];
  destinationAccountId: Types.Scalars['ID'];
  invoicePayment?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type TransactionLimitsQuery = { __typename?: 'Query', getCustomerLimitsV2?: { __typename?: 'CustomerLimitOutput', transactionLimit: number, weeklyLimit: number, availableWeeklyLimit: number } | null };


export const TransactionLimitsDocument = gql`
    query transactionLimits($sourceAccountId: ID!, $destinationAccountId: ID!, $invoicePayment: Boolean) {
  getCustomerLimitsV2(
    sourceAccountId: $sourceAccountId
    destinationAccountId: $destinationAccountId
    invoicePayment: $invoicePayment
  ) {
    transactionLimit
    weeklyLimit
    availableWeeklyLimit
  }
}
    `;

/**
 * __useTransactionLimitsQuery__
 *
 * To run a query within a React component, call `useTransactionLimitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionLimitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionLimitsQuery({
 *   variables: {
 *      sourceAccountId: // value for 'sourceAccountId'
 *      destinationAccountId: // value for 'destinationAccountId'
 *      invoicePayment: // value for 'invoicePayment'
 *   },
 * });
 */
export function useTransactionLimitsQuery(baseOptions: Apollo.QueryHookOptions<TransactionLimitsQuery, TransactionLimitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionLimitsQuery, TransactionLimitsQueryVariables>(TransactionLimitsDocument, options);
      }
export function useTransactionLimitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionLimitsQuery, TransactionLimitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionLimitsQuery, TransactionLimitsQueryVariables>(TransactionLimitsDocument, options);
        }
export type TransactionLimitsQueryHookResult = ReturnType<typeof useTransactionLimitsQuery>;
export type TransactionLimitsLazyQueryHookResult = ReturnType<typeof useTransactionLimitsLazyQuery>;
export type TransactionLimitsQueryResult = Apollo.QueryResult<TransactionLimitsQuery, TransactionLimitsQueryVariables>;