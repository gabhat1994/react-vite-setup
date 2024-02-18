/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNoumConnectedMembersQueryVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  sort?: Types.InputMaybe<Types.SortType>;
}>;


export type GetNoumConnectedMembersQuery = { __typename?: 'Query', getNoumConnectedMembers?: { __typename?: 'SpaceOutputResponse', count?: number | null, data?: Array<{ __typename?: 'SpaceOutput', _id?: string | null, lastUpdatedAt?: any | null, approvedAt?: any | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, email?: string | null, title?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null } | null> | null } | null };


export const GetNoumConnectedMembersDocument = gql`
    query getNoumConnectedMembers($noumId: ID!, $offset: Int, $limit: Int, $sort: SortType) {
  getNoumConnectedMembers(
    noumId: $noumId
    offset: $offset
    limit: $limit
    sort: $sort
  ) {
    data {
      _id
      uid {
        _id
        firstName
        middleName
        lastName
        email
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
      lastUpdatedAt
      approvedAt
    }
    count
  }
}
    `;

/**
 * __useGetNoumConnectedMembersQuery__
 *
 * To run a query within a React component, call `useGetNoumConnectedMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumConnectedMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumConnectedMembersQuery({
 *   variables: {
 *      noumId: // value for 'noumId'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetNoumConnectedMembersQuery(baseOptions: Apollo.QueryHookOptions<GetNoumConnectedMembersQuery, GetNoumConnectedMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumConnectedMembersQuery, GetNoumConnectedMembersQueryVariables>(GetNoumConnectedMembersDocument, options);
      }
export function useGetNoumConnectedMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumConnectedMembersQuery, GetNoumConnectedMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumConnectedMembersQuery, GetNoumConnectedMembersQueryVariables>(GetNoumConnectedMembersDocument, options);
        }
export type GetNoumConnectedMembersQueryHookResult = ReturnType<typeof useGetNoumConnectedMembersQuery>;
export type GetNoumConnectedMembersLazyQueryHookResult = ReturnType<typeof useGetNoumConnectedMembersLazyQuery>;
export type GetNoumConnectedMembersQueryResult = Apollo.QueryResult<GetNoumConnectedMembersQuery, GetNoumConnectedMembersQueryVariables>;