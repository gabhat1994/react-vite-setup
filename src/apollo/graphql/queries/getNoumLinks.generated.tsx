/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumLinkFragmentDoc } from '../fragments/noumLink.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNoumLinksQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  sorting?: Types.InputMaybe<Types.NoumLinkSorting>;
}>;


export type GetNoumLinksQuery = { __typename?: 'Query', getNoumLinks?: { __typename: 'NoumLinkResponse', count?: number | null, data?: Array<{ __typename?: 'NoumLink', _id: string, linkedNoumsCount: number, status: Types.NoumLinkStatus, followersCount: number, projectType: Types.ProjectChamberType, linkedAt: any, connectionsCount: number, linkedNoums: Array<{ __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, title?: string | null, profileImage?: string | null, type?: string | null, permission?: string | null, followersCount?: number | null, connectionId?: string | null, projectType?: string | null, connectionsCount?: number | null, createdAt?: any | null, link?: { __typename?: 'NoumLink', _id: string, status: Types.NoumLinkStatus, linkedNoumsCount: number } | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null, members?: { __typename?: 'PaginatedNoumMembers', count: number } | null } | null> } | null> | null } | null };


export const GetNoumLinksDocument = gql`
    query getNoumLinks($limit: Int, $offset: Int, $sorting: NoumLinkSorting) {
  getNoumLinks(limit: $limit, offset: $offset, sorting: $sorting) {
    data {
      ...NoumLink
    }
    count
    __typename
  }
}
    ${NoumLinkFragmentDoc}`;

/**
 * __useGetNoumLinksQuery__
 *
 * To run a query within a React component, call `useGetNoumLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumLinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumLinksQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      sorting: // value for 'sorting'
 *   },
 * });
 */
export function useGetNoumLinksQuery(baseOptions?: Apollo.QueryHookOptions<GetNoumLinksQuery, GetNoumLinksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumLinksQuery, GetNoumLinksQueryVariables>(GetNoumLinksDocument, options);
      }
export function useGetNoumLinksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumLinksQuery, GetNoumLinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumLinksQuery, GetNoumLinksQueryVariables>(GetNoumLinksDocument, options);
        }
export type GetNoumLinksQueryHookResult = ReturnType<typeof useGetNoumLinksQuery>;
export type GetNoumLinksLazyQueryHookResult = ReturnType<typeof useGetNoumLinksLazyQuery>;
export type GetNoumLinksQueryResult = Apollo.QueryResult<GetNoumLinksQuery, GetNoumLinksQueryVariables>;