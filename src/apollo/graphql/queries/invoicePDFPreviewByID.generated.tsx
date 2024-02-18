/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InvoicePdfPreviewByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type InvoicePdfPreviewByIdQuery = { __typename?: 'Query', invoicePDFPreviewByID: { __typename?: 'InvoicePDF', base64?: string | null } };


export const InvoicePdfPreviewByIdDocument = gql`
    query invoicePDFPreviewByID($id: ID!) {
  invoicePDFPreviewByID(id: $id) {
    base64
  }
}
    `;

/**
 * __useInvoicePdfPreviewByIdQuery__
 *
 * To run a query within a React component, call `useInvoicePdfPreviewByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvoicePdfPreviewByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvoicePdfPreviewByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInvoicePdfPreviewByIdQuery(baseOptions: Apollo.QueryHookOptions<InvoicePdfPreviewByIdQuery, InvoicePdfPreviewByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvoicePdfPreviewByIdQuery, InvoicePdfPreviewByIdQueryVariables>(InvoicePdfPreviewByIdDocument, options);
      }
export function useInvoicePdfPreviewByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvoicePdfPreviewByIdQuery, InvoicePdfPreviewByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvoicePdfPreviewByIdQuery, InvoicePdfPreviewByIdQueryVariables>(InvoicePdfPreviewByIdDocument, options);
        }
export type InvoicePdfPreviewByIdQueryHookResult = ReturnType<typeof useInvoicePdfPreviewByIdQuery>;
export type InvoicePdfPreviewByIdLazyQueryHookResult = ReturnType<typeof useInvoicePdfPreviewByIdLazyQuery>;
export type InvoicePdfPreviewByIdQueryResult = Apollo.QueryResult<InvoicePdfPreviewByIdQuery, InvoicePdfPreviewByIdQueryVariables>;