/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSpaceFollowersQueryVariables = Types.Exact<{
  spaceId: Types.Scalars['ID'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetSpaceFollowersQuery = { __typename?: 'Query', getSpaceFollowers?: { __typename?: 'SpaceOutputResponse', count?: number | null, data?: Array<{ __typename?: 'SpaceOutput', _id?: string | null, followersCount?: number | null, requestedAt?: any | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, title?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null, connectionWithNoum?: { __typename?: 'SpaceConnection', _id?: string | null, status?: Types.ConnectionRequestTypeEnum | null, approvedAt?: string | null } | null } | null> | null } | null };


export const GetSpaceFollowersDocument = gql`
    query getSpaceFollowers($spaceId: ID!, $limit: Int, $offset: Int) {
  getSpaceFollowers(spaceId: $spaceId, limit: $limit, offset: $offset) {
    data {
      _id
      followersCount
      requestedAt
      uid {
        _id
        firstName
        middleName
        lastName
        title
        profile {
          profilePicture
          profilePictureThumbnail
        }
        chamber {
          _id
          userId
        }
        userStatus
      }
      connectionWithNoum(noumId: $spaceId) {
        _id
        status
        approvedAt
      }
    }
    count
  }
}
    `;

/**
 * __useGetSpaceFollowersQuery__
 *
 * To run a query within a React component, call `useGetSpaceFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpaceFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpaceFollowersQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetSpaceFollowersQuery(baseOptions: Apollo.QueryHookOptions<GetSpaceFollowersQuery, GetSpaceFollowersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSpaceFollowersQuery, GetSpaceFollowersQueryVariables>(GetSpaceFollowersDocument, options);
      }
export function useGetSpaceFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSpaceFollowersQuery, GetSpaceFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSpaceFollowersQuery, GetSpaceFollowersQueryVariables>(GetSpaceFollowersDocument, options);
        }
export type GetSpaceFollowersQueryHookResult = ReturnType<typeof useGetSpaceFollowersQuery>;
export type GetSpaceFollowersLazyQueryHookResult = ReturnType<typeof useGetSpaceFollowersLazyQuery>;
export type GetSpaceFollowersQueryResult = Apollo.QueryResult<GetSpaceFollowersQuery, GetSpaceFollowersQueryVariables>;