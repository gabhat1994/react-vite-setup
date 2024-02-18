/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllInvoicesQueryVariables = Types.Exact<{
  input: Types.InvoiceGetAllInput;
}>;


export type GetAllInvoicesQuery = { __typename?: 'Query', getAllInvoices: { __typename?: 'ListInvoice', count: number, data: Array<{ __typename?: 'InvoiceDetail', external_invoice_id?: string | null, invoice_id?: number | null, plan_name?: string | null, issue_date?: string | null, first_invoice?: boolean | null, amount_paid?: number | null, plan_type?: string | null, payment_method?: string | null, payment_method_details?: string | null, status?: string | null, total?: number | null }> } };


export const GetAllInvoicesDocument = gql`
    query getAllInvoices($input: InvoiceGetAllInput!) {
  getAllInvoices(input: $input) {
    count
    data {
      external_invoice_id
      invoice_id
      plan_name
      issue_date
      first_invoice
      amount_paid
      plan_type
      payment_method
      payment_method_details
      status
      total
    }
  }
}
    `;

/**
 * __useGetAllInvoicesQuery__
 *
 * To run a query within a React component, call `useGetAllInvoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllInvoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllInvoicesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAllInvoicesQuery(baseOptions: Apollo.QueryHookOptions<GetAllInvoicesQuery, GetAllInvoicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllInvoicesQuery, GetAllInvoicesQueryVariables>(GetAllInvoicesDocument, options);
      }
export function useGetAllInvoicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllInvoicesQuery, GetAllInvoicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllInvoicesQuery, GetAllInvoicesQueryVariables>(GetAllInvoicesDocument, options);
        }
export type GetAllInvoicesQueryHookResult = ReturnType<typeof useGetAllInvoicesQuery>;
export type GetAllInvoicesLazyQueryHookResult = ReturnType<typeof useGetAllInvoicesLazyQuery>;
export type GetAllInvoicesQueryResult = Apollo.QueryResult<GetAllInvoicesQuery, GetAllInvoicesQueryVariables>;