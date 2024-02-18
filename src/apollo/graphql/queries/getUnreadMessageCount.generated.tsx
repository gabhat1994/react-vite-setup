/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUnreadMessageCountQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUnreadMessageCountQuery = { __typename?: 'Query', getUnreadMessageCount?: number | null };


export const GetUnreadMessageCountDocument = gql`
    query getUnreadMessageCount {
  getUnreadMessageCount
}
    `;

/**
 * __useGetUnreadMessageCountQuery__
 *
 * To run a query within a React component, call `useGetUnreadMessageCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnreadMessageCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnreadMessageCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUnreadMessageCountQuery(baseOptions?: Apollo.QueryHookOptions<GetUnreadMessageCountQuery, GetUnreadMessageCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnreadMessageCountQuery, GetUnreadMessageCountQueryVariables>(GetUnreadMessageCountDocument, options);
      }
export function useGetUnreadMessageCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnreadMessageCountQuery, GetUnreadMessageCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnreadMessageCountQuery, GetUnreadMessageCountQueryVariables>(GetUnreadMessageCountDocument, options);
        }
export type GetUnreadMessageCountQueryHookResult = ReturnType<typeof useGetUnreadMessageCountQuery>;
export type GetUnreadMessageCountLazyQueryHookResult = ReturnType<typeof useGetUnreadMessageCountLazyQuery>;
export type GetUnreadMessageCountQueryResult = Apollo.QueryResult<GetUnreadMessageCountQuery, GetUnreadMessageCountQueryVariables>;