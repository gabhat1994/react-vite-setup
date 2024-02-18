/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SpaceForListFragmentDoc } from '../fragments/spaceOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetOwnProjectChambersQueryVariables = Types.Exact<{
  limit: Types.Scalars['Int'];
  offset: Types.Scalars['Int'];
  filter?: Types.InputMaybe<Types.ProjectChamberFilter>;
  sort?: Types.InputMaybe<Types.SortType>;
}>;


export type GetOwnProjectChambersQuery = { __typename?: 'Query', getOwnProjectChambers?: { __typename?: 'SpaceOutputResponse', count?: number | null, data?: Array<{ __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, title?: string | null, description?: string | null, profileImage?: string | null, status?: string | null, type?: string | null, permission?: string | null, followersCount?: number | null, isFollowing?: boolean | null, isConnected?: boolean | null, connectionsCount?: number | null, connectionId?: string | null, isFavourited?: boolean | null, broadcastedAt?: any | null, projectType?: string | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null, elements?: Array<{ __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null, status?: string | null, tempStatus?: Types.ElementStatusEnum | null } | null> | null, networks?: Array<{ __typename?: 'NetworkOutput', _id?: string | null } | null> | null, uid?: { __typename?: 'UserOutput', location?: string | null, _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null } | null };


export const GetOwnProjectChambersDocument = gql`
    query getOwnProjectChambers($limit: Int!, $offset: Int!, $filter: ProjectChamberFilter, $sort: SortType) {
  getOwnProjectChambers(
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
 * __useGetOwnProjectChambersQuery__
 *
 * To run a query within a React component, call `useGetOwnProjectChambersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOwnProjectChambersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOwnProjectChambersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetOwnProjectChambersQuery(baseOptions: Apollo.QueryHookOptions<GetOwnProjectChambersQuery, GetOwnProjectChambersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOwnProjectChambersQuery, GetOwnProjectChambersQueryVariables>(GetOwnProjectChambersDocument, options);
      }
export function useGetOwnProjectChambersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOwnProjectChambersQuery, GetOwnProjectChambersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOwnProjectChambersQuery, GetOwnProjectChambersQueryVariables>(GetOwnProjectChambersDocument, options);
        }
export type GetOwnProjectChambersQueryHookResult = ReturnType<typeof useGetOwnProjectChambersQuery>;
export type GetOwnProjectChambersLazyQueryHookResult = ReturnType<typeof useGetOwnProjectChambersLazyQuery>;
export type GetOwnProjectChambersQueryResult = Apollo.QueryResult<GetOwnProjectChambersQuery, GetOwnProjectChambersQueryVariables>;