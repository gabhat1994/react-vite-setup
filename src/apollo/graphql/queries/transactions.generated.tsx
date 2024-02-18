/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { TransactionsFragmentDoc } from '../fragments/transactions.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TransactionsQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.PaymentFilter>;
  limit: Types.Scalars['Int'];
  page: Types.Scalars['Int'];
}>;


export type TransactionsQuery = { __typename?: 'Query', payments?: { __typename?: 'PaymentCountOutput', count: number, data?: Array<{ __typename?: 'PaymentOutput', id?: string | null, amount?: number | null, charges?: number | null, netAmount?: number | null, createUserId?: string | null, updatedUserId?: string | null, transactionReason?: string | null, paymentDate?: string | null, currency?: string | null, createdAt?: string | null, paymentStatus?: string | null, paymentId?: string | null, sourceUser?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null } | null } | null, destinationUser?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null } | null } | null, sourceDetail?: { __typename?: 'TransferDetail', name?: string | null, accountType?: string | null, accountName?: string | null, maskNumber?: string | null, chamber?: { __typename?: 'ChamberByIdRef', _id: string, profileImage?: string | null, name?: string | null } | null } | null, destinationDetail?: { __typename?: 'TransferDetail', name?: string | null, accountType?: string | null, accountName?: string | null, maskNumber?: string | null, chamber?: { __typename?: 'ChamberByIdRef', _id: string, profileImage?: string | null, name?: string | null } | null } | null } | null> | null } | null };


export const TransactionsDocument = gql`
    query transactions($filter: PaymentFilter, $limit: Int!, $page: Int!) {
  payments(filter: $filter, limit: $limit, page: $page) {
    count
    data {
      ...Transactions
    }
  }
}
    ${TransactionsFragmentDoc}`;

/**
 * __useTransactionsQuery__
 *
 * To run a query within a React component, call `useTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useTransactionsQuery(baseOptions: Apollo.QueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, options);
      }
export function useTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, options);
        }
export type TransactionsQueryHookResult = ReturnType<typeof useTransactionsQuery>;
export type TransactionsLazyQueryHookResult = ReturnType<typeof useTransactionsLazyQuery>;
export type TransactionsQueryResult = Apollo.QueryResult<TransactionsQuery, TransactionsQueryVariables>;