/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UploadDocumentQueryVariables = Types.Exact<{
  input: Types.UploadDcoumentInput;
}>;


export type UploadDocumentQuery = { __typename?: 'Query', uploadCustomerDocuments?: { __typename?: 'uploadDocumentOutput', url?: string | null, documentName?: string | null } | null };


export const UploadDocumentDocument = gql`
    query uploadDocument($input: uploadDcoumentInput!) {
  uploadCustomerDocuments(input: $input) {
    url
    documentName
  }
}
    `;

/**
 * __useUploadDocumentQuery__
 *
 * To run a query within a React component, call `useUploadDocumentQuery` and pass it any options that fit your needs.
 * When your component renders, `useUploadDocumentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUploadDocumentQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadDocumentQuery(baseOptions: Apollo.QueryHookOptions<UploadDocumentQuery, UploadDocumentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UploadDocumentQuery, UploadDocumentQueryVariables>(UploadDocumentDocument, options);
      }
export function useUploadDocumentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UploadDocumentQuery, UploadDocumentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UploadDocumentQuery, UploadDocumentQueryVariables>(UploadDocumentDocument, options);
        }
export type UploadDocumentQueryHookResult = ReturnType<typeof useUploadDocumentQuery>;
export type UploadDocumentLazyQueryHookResult = ReturnType<typeof useUploadDocumentLazyQuery>;
export type UploadDocumentQueryResult = Apollo.QueryResult<UploadDocumentQuery, UploadDocumentQueryVariables>;