/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetContractPdfQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetContractPdfQuery = { __typename?: 'Query', getSingleContract?: { __typename?: 'Contract', _id: string, contractPDF: { __typename?: 'PdfPreview', base64: string } } | null };

export type GetContractPdfWithSignatureQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  contactId: Types.Scalars['ID'];
}>;


export type GetContractPdfWithSignatureQuery = { __typename?: 'Query', previewWithSign?: { __typename?: 'PdfPreview', base64: string } | null };


export const GetContractPdfDocument = gql`
    query GetContractPdf($id: ID!) {
  getSingleContract(_id: $id) {
    _id
    contractPDF {
      base64
    }
  }
}
    `;

/**
 * __useGetContractPdfQuery__
 *
 * To run a query within a React component, call `useGetContractPdfQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContractPdfQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContractPdfQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetContractPdfQuery(baseOptions: Apollo.QueryHookOptions<GetContractPdfQuery, GetContractPdfQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContractPdfQuery, GetContractPdfQueryVariables>(GetContractPdfDocument, options);
      }
export function useGetContractPdfLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContractPdfQuery, GetContractPdfQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContractPdfQuery, GetContractPdfQueryVariables>(GetContractPdfDocument, options);
        }
export type GetContractPdfQueryHookResult = ReturnType<typeof useGetContractPdfQuery>;
export type GetContractPdfLazyQueryHookResult = ReturnType<typeof useGetContractPdfLazyQuery>;
export type GetContractPdfQueryResult = Apollo.QueryResult<GetContractPdfQuery, GetContractPdfQueryVariables>;
export const GetContractPdfWithSignatureDocument = gql`
    query GetContractPdfWithSignature($id: ID!, $contactId: ID!) {
  previewWithSign(entity: CONTRACT, _id: $id, contactId: $contactId) {
    base64
  }
}
    `;

/**
 * __useGetContractPdfWithSignatureQuery__
 *
 * To run a query within a React component, call `useGetContractPdfWithSignatureQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContractPdfWithSignatureQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContractPdfWithSignatureQuery({
 *   variables: {
 *      id: // value for 'id'
 *      contactId: // value for 'contactId'
 *   },
 * });
 */
export function useGetContractPdfWithSignatureQuery(baseOptions: Apollo.QueryHookOptions<GetContractPdfWithSignatureQuery, GetContractPdfWithSignatureQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContractPdfWithSignatureQuery, GetContractPdfWithSignatureQueryVariables>(GetContractPdfWithSignatureDocument, options);
      }
export function useGetContractPdfWithSignatureLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContractPdfWithSignatureQuery, GetContractPdfWithSignatureQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContractPdfWithSignatureQuery, GetContractPdfWithSignatureQueryVariables>(GetContractPdfWithSignatureDocument, options);
        }
export type GetContractPdfWithSignatureQueryHookResult = ReturnType<typeof useGetContractPdfWithSignatureQuery>;
export type GetContractPdfWithSignatureLazyQueryHookResult = ReturnType<typeof useGetContractPdfWithSignatureLazyQuery>;
export type GetContractPdfWithSignatureQueryResult = Apollo.QueryResult<GetContractPdfWithSignatureQuery, GetContractPdfWithSignatureQueryVariables>;