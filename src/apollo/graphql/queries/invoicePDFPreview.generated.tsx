/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InvoicePdfPreviewQueryVariables = Types.Exact<{
  data?: Types.InputMaybe<Types.InvoicePdfInput>;
}>;


export type InvoicePdfPreviewQuery = { __typename?: 'Query', invoicePDFPreview: { __typename?: 'InvoicePDF', base64?: string | null } };


export const InvoicePdfPreviewDocument = gql`
    query invoicePDFPreview($data: InvoicePDFInput) {
  invoicePDFPreview(data: $data) {
    base64
  }
}
    `;

/**
 * __useInvoicePdfPreviewQuery__
 *
 * To run a query within a React component, call `useInvoicePdfPreviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvoicePdfPreviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvoicePdfPreviewQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInvoicePdfPreviewQuery(baseOptions?: Apollo.QueryHookOptions<InvoicePdfPreviewQuery, InvoicePdfPreviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvoicePdfPreviewQuery, InvoicePdfPreviewQueryVariables>(InvoicePdfPreviewDocument, options);
      }
export function useInvoicePdfPreviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvoicePdfPreviewQuery, InvoicePdfPreviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvoicePdfPreviewQuery, InvoicePdfPreviewQueryVariables>(InvoicePdfPreviewDocument, options);
        }
export type InvoicePdfPreviewQueryHookResult = ReturnType<typeof useInvoicePdfPreviewQuery>;
export type InvoicePdfPreviewLazyQueryHookResult = ReturnType<typeof useInvoicePdfPreviewLazyQuery>;
export type InvoicePdfPreviewQueryResult = Apollo.QueryResult<InvoicePdfPreviewQuery, InvoicePdfPreviewQueryVariables>;