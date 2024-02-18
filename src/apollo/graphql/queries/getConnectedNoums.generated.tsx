/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SpaceForListFragmentDoc } from '../fragments/spaceOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetConnectedNoumsQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.ProjectChamberFilter>;
  sort?: Types.InputMaybe<Types.SortType>;
  limit: Types.Scalars['Int'];
  offset: Types.Scalars['Int'];
}>;


export type GetConnectedNoumsQuery = { __typename?: 'Query', connectedNoums: { __typename?: 'SpaceOutputResponse', count?: number | null, data?: Array<{ __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, title?: string | null, description?: string | null, profileImage?: string | null, status?: string | null, type?: string | null, permission?: string | null, followersCount?: number | null, isFollowing?: boolean | null, isConnected?: boolean | null, connectionsCount?: number | null, connectionId?: string | null, isFavourited?: boolean | null, broadcastedAt?: any | null, projectType?: string | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null, elements?: Array<{ __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null, status?: string | null, tempStatus?: Types.ElementStatusEnum | null } | null> | null, networks?: Array<{ __typename?: 'NetworkOutput', _id?: string | null } | null> | null, uid?: { __typename?: 'UserOutput', location?: string | null, _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null } };


export const GetConnectedNoumsDocument = gql`
    query getConnectedNoums($filter: ProjectChamberFilter, $sort: SortType, $limit: Int!, $offset: Int!) {
  connectedNoums(
    input: {filter: $filter, sort: $sort, limit: $limit, offset: $offset}
  ) {
    count
    data {
      ...SpaceForList
    }
  }
}
    ${SpaceForListFragmentDoc}`;

/**
 * __useGetConnectedNoumsQuery__
 *
 * To run a query within a React component, call `useGetConnectedNoumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConnectedNoumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConnectedNoumsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetConnectedNoumsQuery(baseOptions: Apollo.QueryHookOptions<GetConnectedNoumsQuery, GetConnectedNoumsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConnectedNoumsQuery, GetConnectedNoumsQueryVariables>(GetConnectedNoumsDocument, options);
      }
export function useGetConnectedNoumsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConnectedNoumsQuery, GetConnectedNoumsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConnectedNoumsQuery, GetConnectedNoumsQueryVariables>(GetConnectedNoumsDocument, options);
        }
export type GetConnectedNoumsQueryHookResult = ReturnType<typeof useGetConnectedNoumsQuery>;
export type GetConnectedNoumsLazyQueryHookResult = ReturnType<typeof useGetConnectedNoumsLazyQuery>;
export type GetConnectedNoumsQueryResult = Apollo.QueryResult<GetConnectedNoumsQuery, GetConnectedNoumsQueryVariables>;