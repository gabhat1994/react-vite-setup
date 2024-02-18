/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SpaceForListFragmentDoc } from '../fragments/spaceOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetConnectedSpacesQueryVariables = Types.Exact<{
  uid: Types.Scalars['ID'];
  filter?: Types.InputMaybe<Types.ProjectChamberFilter>;
  sort?: Types.InputMaybe<Types.SortType>;
  limit: Types.Scalars['Int'];
  offset: Types.Scalars['Int'];
}>;


export type GetConnectedSpacesQuery = { __typename?: 'Query', getConnectedSpaces?: { __typename?: 'SpaceOutputResponse', count?: number | null, data?: Array<{ __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, title?: string | null, description?: string | null, profileImage?: string | null, status?: string | null, type?: string | null, permission?: string | null, followersCount?: number | null, isFollowing?: boolean | null, isConnected?: boolean | null, connectionsCount?: number | null, connectionId?: string | null, isFavourited?: boolean | null, broadcastedAt?: any | null, projectType?: string | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null, elements?: Array<{ __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null, status?: string | null, tempStatus?: Types.ElementStatusEnum | null } | null> | null, networks?: Array<{ __typename?: 'NetworkOutput', _id?: string | null } | null> | null, uid?: { __typename?: 'UserOutput', location?: string | null, _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null } | null };


export const GetConnectedSpacesDocument = gql`
    query getConnectedSpaces($uid: ID!, $filter: ProjectChamberFilter, $sort: SortType, $limit: Int!, $offset: Int!) {
  getConnectedSpaces(
    uid: $uid
    filter: $filter
    sort: $sort
    limit: $limit
    offset: $offset
  ) {
    count
    data {
      ...SpaceForList
    }
  }
}
    ${SpaceForListFragmentDoc}`;

/**
 * __useGetConnectedSpacesQuery__
 *
 * To run a query within a React component, call `useGetConnectedSpacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConnectedSpacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConnectedSpacesQuery({
 *   variables: {
 *      uid: // value for 'uid'
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetConnectedSpacesQuery(baseOptions: Apollo.QueryHookOptions<GetConnectedSpacesQuery, GetConnectedSpacesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConnectedSpacesQuery, GetConnectedSpacesQueryVariables>(GetConnectedSpacesDocument, options);
      }
export function useGetConnectedSpacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConnectedSpacesQuery, GetConnectedSpacesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConnectedSpacesQuery, GetConnectedSpacesQueryVariables>(GetConnectedSpacesDocument, options);
        }
export type GetConnectedSpacesQueryHookResult = ReturnType<typeof useGetConnectedSpacesQuery>;
export type GetConnectedSpacesLazyQueryHookResult = ReturnType<typeof useGetConnectedSpacesLazyQuery>;
export type GetConnectedSpacesQueryResult = Apollo.QueryResult<GetConnectedSpacesQuery, GetConnectedSpacesQueryVariables>;