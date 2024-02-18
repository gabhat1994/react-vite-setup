/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SubscriptionInvoicesFragmentDoc } from '../fragments/subscription.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetInvoicesFromSubscriptionIdQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.InvoiceFetchInput>;
}>;


export type GetInvoicesFromSubscriptionIdQuery = { __typename?: 'Query', getInvoices: Array<{ __typename?: 'InvoiceDetail', external_invoice_id?: string | null, invoice_id?: number | null, plan_name?: string | null, issue_date?: string | null, first_invoice?: boolean | null, amount_paid?: number | null, plan_type?: string | null, payment_method?: string | null, payment_method_details?: string | null, status?: string | null, total?: number | null }> };


export const GetInvoicesFromSubscriptionIdDocument = gql`
    query getInvoicesFromSubscriptionId($input: InvoiceFetchInput) {
  getInvoices(input: $input) {
    ...SubscriptionInvoices
  }
}
    ${SubscriptionInvoicesFragmentDoc}`;

/**
 * __useGetInvoicesFromSubscriptionIdQuery__
 *
 * To run a query within a React component, call `useGetInvoicesFromSubscriptionIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoicesFromSubscriptionIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoicesFromSubscriptionIdQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetInvoicesFromSubscriptionIdQuery(baseOptions?: Apollo.QueryHookOptions<GetInvoicesFromSubscriptionIdQuery, GetInvoicesFromSubscriptionIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInvoicesFromSubscriptionIdQuery, GetInvoicesFromSubscriptionIdQueryVariables>(GetInvoicesFromSubscriptionIdDocument, options);
      }
export function useGetInvoicesFromSubscriptionIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvoicesFromSubscriptionIdQuery, GetInvoicesFromSubscriptionIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInvoicesFromSubscriptionIdQuery, GetInvoicesFromSubscriptionIdQueryVariables>(GetInvoicesFromSubscriptionIdDocument, options);
        }
export type GetInvoicesFromSubscriptionIdQueryHookResult = ReturnType<typeof useGetInvoicesFromSubscriptionIdQuery>;
export type GetInvoicesFromSubscriptionIdLazyQueryHookResult = ReturnType<typeof useGetInvoicesFromSubscriptionIdLazyQuery>;
export type GetInvoicesFromSubscriptionIdQueryResult = Apollo.QueryResult<GetInvoicesFromSubscriptionIdQuery, GetInvoicesFromSubscriptionIdQueryVariables>;