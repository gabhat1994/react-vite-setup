/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserFavouritesQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type UserFavouritesQuery = { __typename?: 'Query', userFavourites: { __typename?: 'UserFavouritesOutput', count: number, data: Array<{ __typename?: 'UserFavourites', _id: string, order: number, favouritedAt: any, noum: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, title?: string | null, type?: string | null, projectType?: string | null, description?: string | null, profileImage?: string | null, followersCount?: number | null, isFavourited?: boolean | null, status?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, title?: string | null, userStatus?: string | null, location?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null } | null } | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null } }> } };


export const UserFavouritesDocument = gql`
    query userFavourites($offset: Int, $limit: Int) {
  userFavourites(offset: $offset, limit: $limit) {
    data {
      _id
      order
      favouritedAt
      noum {
        _id
        name
        title
        type
        projectType
        description
        profileImage
        followersCount
        isFavourited
        status
        uid {
          _id
          firstName
          lastName
          title
          userStatus
          location
          profile {
            profilePicture
          }
        }
        category {
          _id
          name
        }
      }
    }
    count
  }
}
    `;

/**
 * __useUserFavouritesQuery__
 *
 * To run a query within a React component, call `useUserFavouritesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFavouritesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFavouritesQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useUserFavouritesQuery(baseOptions?: Apollo.QueryHookOptions<UserFavouritesQuery, UserFavouritesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserFavouritesQuery, UserFavouritesQueryVariables>(UserFavouritesDocument, options);
      }
export function useUserFavouritesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFavouritesQuery, UserFavouritesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserFavouritesQuery, UserFavouritesQueryVariables>(UserFavouritesDocument, options);
        }
export type UserFavouritesQueryHookResult = ReturnType<typeof useUserFavouritesQuery>;
export type UserFavouritesLazyQueryHookResult = ReturnType<typeof useUserFavouritesLazyQuery>;
export type UserFavouritesQueryResult = Apollo.QueryResult<UserFavouritesQuery, UserFavouritesQueryVariables>;