/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetStatementOfWorkPdfQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetStatementOfWorkPdfQuery = { __typename?: 'Query', getSingleSOW?: { __typename?: 'SOW', _id: string, sowPDF?: { __typename?: 'PdfPreview', base64: string } | null } | null };

export type GetStatementOfWorkPdfWithSignatureQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  contactId: Types.Scalars['ID'];
}>;


export type GetStatementOfWorkPdfWithSignatureQuery = { __typename?: 'Query', previewWithSign?: { __typename?: 'PdfPreview', base64: string } | null };


export const GetStatementOfWorkPdfDocument = gql`
    query GetStatementOfWorkPdf($id: ID!) {
  getSingleSOW(_id: $id) {
    _id
    sowPDF {
      base64
    }
  }
}
    `;

/**
 * __useGetStatementOfWorkPdfQuery__
 *
 * To run a query within a React component, call `useGetStatementOfWorkPdfQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatementOfWorkPdfQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatementOfWorkPdfQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetStatementOfWorkPdfQuery(baseOptions: Apollo.QueryHookOptions<GetStatementOfWorkPdfQuery, GetStatementOfWorkPdfQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStatementOfWorkPdfQuery, GetStatementOfWorkPdfQueryVariables>(GetStatementOfWorkPdfDocument, options);
      }
export function useGetStatementOfWorkPdfLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatementOfWorkPdfQuery, GetStatementOfWorkPdfQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStatementOfWorkPdfQuery, GetStatementOfWorkPdfQueryVariables>(GetStatementOfWorkPdfDocument, options);
        }
export type GetStatementOfWorkPdfQueryHookResult = ReturnType<typeof useGetStatementOfWorkPdfQuery>;
export type GetStatementOfWorkPdfLazyQueryHookResult = ReturnType<typeof useGetStatementOfWorkPdfLazyQuery>;
export type GetStatementOfWorkPdfQueryResult = Apollo.QueryResult<GetStatementOfWorkPdfQuery, GetStatementOfWorkPdfQueryVariables>;
export const GetStatementOfWorkPdfWithSignatureDocument = gql`
    query GetStatementOfWorkPdfWithSignature($id: ID!, $contactId: ID!) {
  previewWithSign(entity: SOW, _id: $id, contactId: $contactId) {
    base64
  }
}
    `;

/**
 * __useGetStatementOfWorkPdfWithSignatureQuery__
 *
 * To run a query within a React component, call `useGetStatementOfWorkPdfWithSignatureQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatementOfWorkPdfWithSignatureQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatementOfWorkPdfWithSignatureQuery({
 *   variables: {
 *      id: // value for 'id'
 *      contactId: // value for 'contactId'
 *   },
 * });
 */
export function useGetStatementOfWorkPdfWithSignatureQuery(baseOptions: Apollo.QueryHookOptions<GetStatementOfWorkPdfWithSignatureQuery, GetStatementOfWorkPdfWithSignatureQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStatementOfWorkPdfWithSignatureQuery, GetStatementOfWorkPdfWithSignatureQueryVariables>(GetStatementOfWorkPdfWithSignatureDocument, options);
      }
export function useGetStatementOfWorkPdfWithSignatureLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatementOfWorkPdfWithSignatureQuery, GetStatementOfWorkPdfWithSignatureQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStatementOfWorkPdfWithSignatureQuery, GetStatementOfWorkPdfWithSignatureQueryVariables>(GetStatementOfWorkPdfWithSignatureDocument, options);
        }
export type GetStatementOfWorkPdfWithSignatureQueryHookResult = ReturnType<typeof useGetStatementOfWorkPdfWithSignatureQuery>;
export type GetStatementOfWorkPdfWithSignatureLazyQueryHookResult = ReturnType<typeof useGetStatementOfWorkPdfWithSignatureLazyQuery>;
export type GetStatementOfWorkPdfWithSignatureQueryResult = Apollo.QueryResult<GetStatementOfWorkPdfWithSignatureQuery, GetStatementOfWorkPdfWithSignatureQueryVariables>;