/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UploadDocumentStatusQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UploadDocumentStatusQuery = { __typename?: 'Query', getWalletBalance?: { __typename?: 'FundingSourceBalanceOutput', docStatus?: string | null } | null };


export const UploadDocumentStatusDocument = gql`
    query uploadDocumentStatus {
  getWalletBalance {
    docStatus
  }
}
    `;

/**
 * __useUploadDocumentStatusQuery__
 *
 * To run a query within a React component, call `useUploadDocumentStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useUploadDocumentStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUploadDocumentStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useUploadDocumentStatusQuery(baseOptions?: Apollo.QueryHookOptions<UploadDocumentStatusQuery, UploadDocumentStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UploadDocumentStatusQuery, UploadDocumentStatusQueryVariables>(UploadDocumentStatusDocument, options);
      }
export function useUploadDocumentStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UploadDocumentStatusQuery, UploadDocumentStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UploadDocumentStatusQuery, UploadDocumentStatusQueryVariables>(UploadDocumentStatusDocument, options);
        }
export type UploadDocumentStatusQueryHookResult = ReturnType<typeof useUploadDocumentStatusQuery>;
export type UploadDocumentStatusLazyQueryHookResult = ReturnType<typeof useUploadDocumentStatusLazyQuery>;
export type UploadDocumentStatusQueryResult = Apollo.QueryResult<UploadDocumentStatusQuery, UploadDocumentStatusQueryVariables>;