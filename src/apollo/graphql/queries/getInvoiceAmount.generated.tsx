/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetInvoiceAmountQueryVariables = Types.Exact<{
  invoiceId: Types.Scalars['ID'];
  id?: Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type GetInvoiceAmountQuery = { __typename?: 'Query', getInvoiceAmount?: { __typename?: 'InvoiceAmountOutput', amount?: number | null, paidAmount?: number | null, remainingAmount?: number | null } | null };


export const GetInvoiceAmountDocument = gql`
    query getInvoiceAmount($invoiceId: ID!, $id: ID) {
  getInvoiceAmount(invoiceId: $invoiceId, id: $id) {
    amount
    paidAmount
    remainingAmount
  }
}
    `;

/**
 * __useGetInvoiceAmountQuery__
 *
 * To run a query within a React component, call `useGetInvoiceAmountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoiceAmountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoiceAmountQuery({
 *   variables: {
 *      invoiceId: // value for 'invoiceId'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetInvoiceAmountQuery(baseOptions: Apollo.QueryHookOptions<GetInvoiceAmountQuery, GetInvoiceAmountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInvoiceAmountQuery, GetInvoiceAmountQueryVariables>(GetInvoiceAmountDocument, options);
      }
export function useGetInvoiceAmountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvoiceAmountQuery, GetInvoiceAmountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInvoiceAmountQuery, GetInvoiceAmountQueryVariables>(GetInvoiceAmountDocument, options);
        }
export type GetInvoiceAmountQueryHookResult = ReturnType<typeof useGetInvoiceAmountQuery>;
export type GetInvoiceAmountLazyQueryHookResult = ReturnType<typeof useGetInvoiceAmountLazyQuery>;
export type GetInvoiceAmountQueryResult = Apollo.QueryResult<GetInvoiceAmountQuery, GetInvoiceAmountQueryVariables>;