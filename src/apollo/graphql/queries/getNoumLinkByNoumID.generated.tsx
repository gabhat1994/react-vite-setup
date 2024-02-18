/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumLinkFragmentDoc } from '../fragments/noumLink.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNoumLinkByNoumIdQueryVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
}>;


export type GetNoumLinkByNoumIdQuery = { __typename?: 'Query', getNoumLinkByNoumId?: { __typename: 'SpaceOutput', _id?: string | null, link?: { __typename?: 'NoumLink', _id: string, linkedNoumsCount: number, status: Types.NoumLinkStatus, followersCount: number, projectType: Types.ProjectChamberType, linkedAt: any, connectionsCount: number, linkedNoums: Array<{ __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, title?: string | null, profileImage?: string | null, type?: string | null, permission?: string | null, followersCount?: number | null, connectionId?: string | null, projectType?: string | null, connectionsCount?: number | null, createdAt?: any | null, link?: { __typename?: 'NoumLink', _id: string, status: Types.NoumLinkStatus, linkedNoumsCount: number } | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null, members?: { __typename?: 'PaginatedNoumMembers', count: number } | null } | null> } | null } | null };


export const GetNoumLinkByNoumIdDocument = gql`
    query getNoumLinkByNoumId($noumId: ID!) {
  getNoumLinkByNoumId: getSpaceById(id: $noumId) {
    _id
    __typename
    link {
      ...NoumLink
    }
  }
}
    ${NoumLinkFragmentDoc}`;

/**
 * __useGetNoumLinkByNoumIdQuery__
 *
 * To run a query within a React component, call `useGetNoumLinkByNoumIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumLinkByNoumIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumLinkByNoumIdQuery({
 *   variables: {
 *      noumId: // value for 'noumId'
 *   },
 * });
 */
export function useGetNoumLinkByNoumIdQuery(baseOptions: Apollo.QueryHookOptions<GetNoumLinkByNoumIdQuery, GetNoumLinkByNoumIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumLinkByNoumIdQuery, GetNoumLinkByNoumIdQueryVariables>(GetNoumLinkByNoumIdDocument, options);
      }
export function useGetNoumLinkByNoumIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumLinkByNoumIdQuery, GetNoumLinkByNoumIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumLinkByNoumIdQuery, GetNoumLinkByNoumIdQueryVariables>(GetNoumLinkByNoumIdDocument, options);
        }
export type GetNoumLinkByNoumIdQueryHookResult = ReturnType<typeof useGetNoumLinkByNoumIdQuery>;
export type GetNoumLinkByNoumIdLazyQueryHookResult = ReturnType<typeof useGetNoumLinkByNoumIdLazyQuery>;
export type GetNoumLinkByNoumIdQueryResult = Apollo.QueryResult<GetNoumLinkByNoumIdQuery, GetNoumLinkByNoumIdQueryVariables>;