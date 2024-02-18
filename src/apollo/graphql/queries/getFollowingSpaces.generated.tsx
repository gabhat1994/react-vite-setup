/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SpaceForListFragmentDoc } from '../fragments/spaceOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetFollowingSpacesQueryVariables = Types.Exact<{
  userId: Types.Scalars['ID'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  sort?: Types.InputMaybe<Types.SortType>;
  filter?: Types.InputMaybe<Types.ProjectChamberFilter>;
}>;


export type GetFollowingSpacesQuery = { __typename?: 'Query', getFollowingSpaces?: { __typename?: 'SpaceOutputResponse', count?: number | null, data?: Array<{ __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, title?: string | null, description?: string | null, profileImage?: string | null, status?: string | null, type?: string | null, permission?: string | null, followersCount?: number | null, isFollowing?: boolean | null, isConnected?: boolean | null, connectionsCount?: number | null, connectionId?: string | null, isFavourited?: boolean | null, broadcastedAt?: any | null, projectType?: string | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null, elements?: Array<{ __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null, status?: string | null, tempStatus?: Types.ElementStatusEnum | null } | null> | null, networks?: Array<{ __typename?: 'NetworkOutput', _id?: string | null } | null> | null, uid?: { __typename?: 'UserOutput', location?: string | null, _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null } | null };


export const GetFollowingSpacesDocument = gql`
    query getFollowingSpaces($userId: ID!, $limit: Int, $offset: Int, $sort: SortType, $filter: ProjectChamberFilter) {
  getFollowingSpaces(
    uid: $userId
    limit: $limit
    offset: $offset
    filter: $filter
    sort: $sort
  ) {
    data {
      ...SpaceForList
    }
    count
  }
}
    ${SpaceForListFragmentDoc}`;

/**
 * __useGetFollowingSpacesQuery__
 *
 * To run a query within a React component, call `useGetFollowingSpacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowingSpacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowingSpacesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetFollowingSpacesQuery(baseOptions: Apollo.QueryHookOptions<GetFollowingSpacesQuery, GetFollowingSpacesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFollowingSpacesQuery, GetFollowingSpacesQueryVariables>(GetFollowingSpacesDocument, options);
      }
export function useGetFollowingSpacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFollowingSpacesQuery, GetFollowingSpacesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFollowingSpacesQuery, GetFollowingSpacesQueryVariables>(GetFollowingSpacesDocument, options);
        }
export type GetFollowingSpacesQueryHookResult = ReturnType<typeof useGetFollowingSpacesQuery>;
export type GetFollowingSpacesLazyQueryHookResult = ReturnType<typeof useGetFollowingSpacesLazyQuery>;
export type GetFollowingSpacesQueryResult = Apollo.QueryResult<GetFollowingSpacesQuery, GetFollowingSpacesQueryVariables>;