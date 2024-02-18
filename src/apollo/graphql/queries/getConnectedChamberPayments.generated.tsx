/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { TransactionsFragmentDoc } from '../fragments/transactions.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetConnectedChamberPaymentsQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.PaymentFilter>;
  limit: Types.Scalars['Int'];
  page: Types.Scalars['Int'];
}>;


export type GetConnectedChamberPaymentsQuery = { __typename?: 'Query', getConnectedChamberPayments?: { __typename?: 'PaymentCountOutput', count: number, data?: Array<{ __typename?: 'PaymentOutput', id?: string | null, amount?: number | null, charges?: number | null, netAmount?: number | null, createUserId?: string | null, updatedUserId?: string | null, transactionReason?: string | null, paymentDate?: string | null, currency?: string | null, createdAt?: string | null, paymentStatus?: string | null, paymentId?: string | null, sourceUser?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null } | null } | null, destinationUser?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null } | null } | null, sourceDetail?: { __typename?: 'TransferDetail', name?: string | null, accountType?: string | null, accountName?: string | null, maskNumber?: string | null, chamber?: { __typename?: 'ChamberByIdRef', _id: string, profileImage?: string | null, name?: string | null } | null } | null, destinationDetail?: { __typename?: 'TransferDetail', name?: string | null, accountType?: string | null, accountName?: string | null, maskNumber?: string | null, chamber?: { __typename?: 'ChamberByIdRef', _id: string, profileImage?: string | null, name?: string | null } | null } | null } | null> | null } | null };


export const GetConnectedChamberPaymentsDocument = gql`
    query getConnectedChamberPayments($filter: PaymentFilter, $limit: Int!, $page: Int!) {
  getConnectedChamberPayments(filter: $filter, limit: $limit, page: $page) {
    count
    data {
      ...Transactions
    }
  }
}
    ${TransactionsFragmentDoc}`;

/**
 * __useGetConnectedChamberPaymentsQuery__
 *
 * To run a query within a React component, call `useGetConnectedChamberPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConnectedChamberPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConnectedChamberPaymentsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetConnectedChamberPaymentsQuery(baseOptions: Apollo.QueryHookOptions<GetConnectedChamberPaymentsQuery, GetConnectedChamberPaymentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConnectedChamberPaymentsQuery, GetConnectedChamberPaymentsQueryVariables>(GetConnectedChamberPaymentsDocument, options);
      }
export function useGetConnectedChamberPaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConnectedChamberPaymentsQuery, GetConnectedChamberPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConnectedChamberPaymentsQuery, GetConnectedChamberPaymentsQueryVariables>(GetConnectedChamberPaymentsDocument, options);
        }
export type GetConnectedChamberPaymentsQueryHookResult = ReturnType<typeof useGetConnectedChamberPaymentsQuery>;
export type GetConnectedChamberPaymentsLazyQueryHookResult = ReturnType<typeof useGetConnectedChamberPaymentsLazyQuery>;
export type GetConnectedChamberPaymentsQueryResult = Apollo.QueryResult<GetConnectedChamberPaymentsQuery, GetConnectedChamberPaymentsQueryVariables>;