/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNoumLinkFollowersQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  noumLinkId?: Types.InputMaybe<Types.Scalars['ID']>;
  sort?: Types.InputMaybe<Types.SortType>;
}>;


export type GetNoumLinkFollowersQuery = { __typename?: 'Query', getNoumLinkFollowers?: { __typename?: 'SpaceOutputResponse', count?: number | null, data?: Array<{ __typename?: 'SpaceOutput', _id?: string | null, type?: string | null, name?: string | null, approvedAt?: any | null, lastUpdatedAt?: any | null, uid?: { __typename?: 'UserOutput', _id: string, title?: string | null, profile?: { __typename?: 'ProfileOutput', profilePictureThumbnail?: string | null, profilePicture?: string | null } | null } | null } | null> | null } | null };


export const GetNoumLinkFollowersDocument = gql`
    query getNoumLinkFollowers($limit: Int, $offset: Int, $noumLinkId: ID = "", $sort: SortType) {
  getNoumLinkFollowers(
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
 * __useGetNoumLinkFollowersQuery__
 *
 * To run a query within a React component, call `useGetNoumLinkFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumLinkFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumLinkFollowersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      noumLinkId: // value for 'noumLinkId'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetNoumLinkFollowersQuery(baseOptions?: Apollo.QueryHookOptions<GetNoumLinkFollowersQuery, GetNoumLinkFollowersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumLinkFollowersQuery, GetNoumLinkFollowersQueryVariables>(GetNoumLinkFollowersDocument, options);
      }
export function useGetNoumLinkFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumLinkFollowersQuery, GetNoumLinkFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumLinkFollowersQuery, GetNoumLinkFollowersQueryVariables>(GetNoumLinkFollowersDocument, options);
        }
export type GetNoumLinkFollowersQueryHookResult = ReturnType<typeof useGetNoumLinkFollowersQuery>;
export type GetNoumLinkFollowersLazyQueryHookResult = ReturnType<typeof useGetNoumLinkFollowersLazyQuery>;
export type GetNoumLinkFollowersQueryResult = Apollo.QueryResult<GetNoumLinkFollowersQuery, GetNoumLinkFollowersQueryVariables>;