/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { LinkedNoumFragmentDoc } from '../fragments/linkedNoum.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetOwnNoumsToLinkQueryVariables = Types.Exact<{
  limit: Types.Scalars['Int'];
  offset: Types.Scalars['Int'];
  filter?: Types.InputMaybe<Types.ProjectChamberFilter>;
  sort?: Types.InputMaybe<Types.SortType>;
}>;


export type GetOwnNoumsToLinkQuery = { __typename?: 'Query', getOwnProjectChambers?: { __typename?: 'SpaceOutputResponse', count?: number | null, data?: Array<{ __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, title?: string | null, profileImage?: string | null, type?: string | null, permission?: string | null, followersCount?: number | null, connectionId?: string | null, projectType?: string | null, connectionsCount?: number | null, createdAt?: any | null, link?: { __typename?: 'NoumLink', _id: string, status: Types.NoumLinkStatus, linkedNoumsCount: number } | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null, members?: { __typename?: 'PaginatedNoumMembers', count: number } | null } | null> | null } | null };


export const GetOwnNoumsToLinkDocument = gql`
    query getOwnNoumsToLink($limit: Int!, $offset: Int!, $filter: ProjectChamberFilter, $sort: SortType) {
  getOwnProjectChambers(
    limit: $limit
    offset: $offset
    filter: $filter
    sort: $sort
  ) {
    count
    data {
      ...LinkedNoum
    }
  }
}
    ${LinkedNoumFragmentDoc}`;

/**
 * __useGetOwnNoumsToLinkQuery__
 *
 * To run a query within a React component, call `useGetOwnNoumsToLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOwnNoumsToLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOwnNoumsToLinkQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetOwnNoumsToLinkQuery(baseOptions: Apollo.QueryHookOptions<GetOwnNoumsToLinkQuery, GetOwnNoumsToLinkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOwnNoumsToLinkQuery, GetOwnNoumsToLinkQueryVariables>(GetOwnNoumsToLinkDocument, options);
      }
export function useGetOwnNoumsToLinkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOwnNoumsToLinkQuery, GetOwnNoumsToLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOwnNoumsToLinkQuery, GetOwnNoumsToLinkQueryVariables>(GetOwnNoumsToLinkDocument, options);
        }
export type GetOwnNoumsToLinkQueryHookResult = ReturnType<typeof useGetOwnNoumsToLinkQuery>;
export type GetOwnNoumsToLinkLazyQueryHookResult = ReturnType<typeof useGetOwnNoumsToLinkLazyQuery>;
export type GetOwnNoumsToLinkQueryResult = Apollo.QueryResult<GetOwnNoumsToLinkQuery, GetOwnNoumsToLinkQueryVariables>;