/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNoumLinkConnectionsQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  noumLinkId?: Types.InputMaybe<Types.Scalars['ID']>;
  sort?: Types.InputMaybe<Types.SortType>;
}>;


export type GetNoumLinkConnectionsQuery = { __typename?: 'Query', getNoumLinkConnections?: { __typename?: 'SpaceOutputResponse', count?: number | null, data?: Array<{ __typename?: 'SpaceOutput', _id?: string | null, type?: string | null, name?: string | null, approvedAt?: any | null, lastUpdatedAt?: any | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, title?: string | null, profile?: { __typename?: 'ProfileOutput', profilePictureThumbnail?: string | null, profilePicture?: string | null } | null } | null } | null> | null } | null };


export const GetNoumLinkConnectionsDocument = gql`
    query getNoumLinkConnections($limit: Int, $offset: Int, $noumLinkId: ID = "", $sort: SortType) {
  getNoumLinkConnections(
    limit: $limit
    offset: $offset
    noumLinkId: $noumLinkId
    sort: $sort
  ) {
    data {
      _id
      type
      name
      approvedAt
      uid {
        _id
        firstName
        lastName
        title
        profile {
          profilePictureThumbnail
          profilePicture
        }
      }
      lastUpdatedAt
    }
    count
  }
}
    `;

/**
 * __useGetNoumLinkConnectionsQuery__
 *
 * To run a query within a React component, call `useGetNoumLinkConnectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumLinkConnectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumLinkConnectionsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      noumLinkId: // value for 'noumLinkId'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetNoumLinkConnectionsQuery(baseOptions?: Apollo.QueryHookOptions<GetNoumLinkConnectionsQuery, GetNoumLinkConnectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumLinkConnectionsQuery, GetNoumLinkConnectionsQueryVariables>(GetNoumLinkConnectionsDocument, options);
      }
export function useGetNoumLinkConnectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumLinkConnectionsQuery, GetNoumLinkConnectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumLinkConnectionsQuery, GetNoumLinkConnectionsQueryVariables>(GetNoumLinkConnectionsDocument, options);
        }
export type GetNoumLinkConnectionsQueryHookResult = ReturnType<typeof useGetNoumLinkConnectionsQuery>;
export type GetNoumLinkConnectionsLazyQueryHookResult = ReturnType<typeof useGetNoumLinkConnectionsLazyQuery>;
export type GetNoumLinkConnectionsQueryResult = Apollo.QueryResult<GetNoumLinkConnectionsQuery, GetNoumLinkConnectionsQueryVariables>;