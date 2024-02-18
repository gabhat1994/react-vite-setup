/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumFileFragmentDoc } from '../fragments/noumFile.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type NoumFilesQueryVariables = Types.Exact<{
  input: Types.GetNoumFilesInput;
}>;


export type NoumFilesQuery = { __typename?: 'Query', noumFiles: { __typename?: 'PaginatedNoumFiles', count: number, data: Array<{ __typename?: 'NoumFile', _id: string, name: string, description?: string | null, extension?: string | null, fileUrl?: string | null, downloadsCount: number, viewsCount: number, uploadedAt: any, updatedAt?: any | null, visibilityRoles: Array<string>, status: Types.NoumFileStatus, fileSize: number, owner?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, userStatus?: string | null } | null }> } };


export const NoumFilesDocument = gql`
    query noumFiles($input: GetNoumFilesInput!) {
  noumFiles(input: $input) {
    data {
      ...NoumFile
    }
    count
  }
}
    ${NoumFileFragmentDoc}`;

/**
 * __useNoumFilesQuery__
 *
 * To run a query within a React component, call `useNoumFilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNoumFilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNoumFilesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNoumFilesQuery(baseOptions: Apollo.QueryHookOptions<NoumFilesQuery, NoumFilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NoumFilesQuery, NoumFilesQueryVariables>(NoumFilesDocument, options);
      }
export function useNoumFilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NoumFilesQuery, NoumFilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NoumFilesQuery, NoumFilesQueryVariables>(NoumFilesDocument, options);
        }
export type NoumFilesQueryHookResult = ReturnType<typeof useNoumFilesQuery>;
export type NoumFilesLazyQueryHookResult = ReturnType<typeof useNoumFilesLazyQuery>;
export type NoumFilesQueryResult = Apollo.QueryResult<NoumFilesQuery, NoumFilesQueryVariables>;