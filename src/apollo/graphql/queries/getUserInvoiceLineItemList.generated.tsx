/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserInvoiceLineItemListQueryVariables = Types.Exact<{
  filter: Types.InvoiceSearchInput;
}>;


export type GetUserInvoiceLineItemListQuery = { __typename?: 'Query', getUserInvoiceLineItemList: { __typename?: 'UserInvoiceLineItemOutput', count: number, data?: Array<{ __typename?: 'InvoiceLineItem', id: string, description: string, quantity: number, unitPrice: number, taxRate?: number | null, taxLabel?: string | null, currency: Types.AllCurrencyEnum, amount: number } | null> | null } };


export const GetUserInvoiceLineItemListDocument = gql`
    query getUserInvoiceLineItemList($filter: InvoiceSearchInput!) {
  getUserInvoiceLineItemList(filter: $filter) {
    data {
      id
      description
      quantity
      unitPrice
      taxRate
      taxLabel
      currency
      amount
    }
    count
  }
}
    `;

/**
 * __useGetUserInvoiceLineItemListQuery__
 *
 * To run a query within a React component, call `useGetUserInvoiceLineItemListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserInvoiceLineItemListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserInvoiceLineItemListQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetUserInvoiceLineItemListQuery(baseOptions: Apollo.QueryHookOptions<GetUserInvoiceLineItemListQuery, GetUserInvoiceLineItemListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserInvoiceLineItemListQuery, GetUserInvoiceLineItemListQueryVariables>(GetUserInvoiceLineItemListDocument, options);
      }
export function useGetUserInvoiceLineItemListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserInvoiceLineItemListQuery, GetUserInvoiceLineItemListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserInvoiceLineItemListQuery, GetUserInvoiceLineItemListQueryVariables>(GetUserInvoiceLineItemListDocument, options);
        }
export type GetUserInvoiceLineItemListQueryHookResult = ReturnType<typeof useGetUserInvoiceLineItemListQuery>;
export type GetUserInvoiceLineItemListLazyQueryHookResult = ReturnType<typeof useGetUserInvoiceLineItemListLazyQuery>;
export type GetUserInvoiceLineItemListQueryResult = Apollo.QueryResult<GetUserInvoiceLineItemListQuery, GetUserInvoiceLineItemListQueryVariables>;