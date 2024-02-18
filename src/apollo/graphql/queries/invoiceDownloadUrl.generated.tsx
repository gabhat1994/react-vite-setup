/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InvoiceDownloadUrlQueryVariables = Types.Exact<{
  invoice_id: Types.Scalars['String'];
}>;


export type InvoiceDownloadUrlQuery = { __typename?: 'Query', getInvoiceDownloadURL: string };


export const InvoiceDownloadUrlDocument = gql`
    query invoiceDownloadUrl($invoice_id: String!) {
  getInvoiceDownloadURL(invoice_id: $invoice_id)
}
    `;

/**
 * __useInvoiceDownloadUrlQuery__
 *
 * To run a query within a React component, call `useInvoiceDownloadUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvoiceDownloadUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvoiceDownloadUrlQuery({
 *   variables: {
 *      invoice_id: // value for 'invoice_id'
 *   },
 * });
 */
export function useInvoiceDownloadUrlQuery(baseOptions: Apollo.QueryHookOptions<InvoiceDownloadUrlQuery, InvoiceDownloadUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvoiceDownloadUrlQuery, InvoiceDownloadUrlQueryVariables>(InvoiceDownloadUrlDocument, options);
      }
export function useInvoiceDownloadUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvoiceDownloadUrlQuery, InvoiceDownloadUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvoiceDownloadUrlQuery, InvoiceDownloadUrlQueryVariables>(InvoiceDownloadUrlDocument, options);
        }
export type InvoiceDownloadUrlQueryHookResult = ReturnType<typeof useInvoiceDownloadUrlQuery>;
export type InvoiceDownloadUrlLazyQueryHookResult = ReturnType<typeof useInvoiceDownloadUrlLazyQuery>;
export type InvoiceDownloadUrlQueryResult = Apollo.QueryResult<InvoiceDownloadUrlQuery, InvoiceDownloadUrlQueryVariables>;