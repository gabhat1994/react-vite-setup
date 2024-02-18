/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumLinkFragmentDoc } from '../fragments/noumLink.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNoumLinkQueryVariables = Types.Exact<{
  noumLinkId: Types.Scalars['ID'];
}>;


export type GetNoumLinkQuery = { __typename?: 'Query', getNoumLink?: { __typename?: 'NoumLink', _id: string, linkedNoumsCount: number, status: Types.NoumLinkStatus, followersCount: number, projectType: Types.ProjectChamberType, linkedAt: any, connectionsCount: number, linkedNoums: Array<{ __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, title?: string | null, profileImage?: string | null, type?: string | null, permission?: string | null, followersCount?: number | null, connectionId?: string | null, projectType?: string | null, connectionsCount?: number | null, createdAt?: any | null, link?: { __typename?: 'NoumLink', _id: string, status: Types.NoumLinkStatus, linkedNoumsCount: number } | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null, members?: { __typename?: 'PaginatedNoumMembers', count: number } | null } | null> } | null };


export const GetNoumLinkDocument = gql`
    query getNoumLink($noumLinkId: ID!) {
  getNoumLink(noumLinkId: $noumLinkId) {
    ...NoumLink
  }
}
    ${NoumLinkFragmentDoc}`;

/**
 * __useGetNoumLinkQuery__
 *
 * To run a query within a React component, call `useGetNoumLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumLinkQuery({
 *   variables: {
 *      noumLinkId: // value for 'noumLinkId'
 *   },
 * });
 */
export function useGetNoumLinkQuery(baseOptions: Apollo.QueryHookOptions<GetNoumLinkQuery, GetNoumLinkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumLinkQuery, GetNoumLinkQueryVariables>(GetNoumLinkDocument, options);
      }
export function useGetNoumLinkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumLinkQuery, GetNoumLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumLinkQuery, GetNoumLinkQueryVariables>(GetNoumLinkDocument, options);
        }
export type GetNoumLinkQueryHookResult = ReturnType<typeof useGetNoumLinkQuery>;
export type GetNoumLinkLazyQueryHookResult = ReturnType<typeof useGetNoumLinkLazyQuery>;
export type GetNoumLinkQueryResult = Apollo.QueryResult<GetNoumLinkQuery, GetNoumLinkQueryVariables>;