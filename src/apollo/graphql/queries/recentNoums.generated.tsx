/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RecentNoumsQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type RecentNoumsQuery = { __typename?: 'Query', recentNoums: { __typename?: 'SpaceOutputResponse', count?: number | null, data?: Array<{ __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, title?: string | null, type?: string | null, projectType?: string | null, description?: string | null, profileImage?: string | null, followersCount?: number | null, isFavourited?: boolean | null, status?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, title?: string | null, userStatus?: string | null, location?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null } | null } | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null } | null> | null } };


export const RecentNoumsDocument = gql`
    query recentNoums($offset: Int, $limit: Int) {
  recentNoums(offset: $offset, limit: $limit) {
    data {
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
    count
  }
}
    `;

/**
 * __useRecentNoumsQuery__
 *
 * To run a query within a React component, call `useRecentNoumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentNoumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentNoumsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useRecentNoumsQuery(baseOptions?: Apollo.QueryHookOptions<RecentNoumsQuery, RecentNoumsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecentNoumsQuery, RecentNoumsQueryVariables>(RecentNoumsDocument, options);
      }
export function useRecentNoumsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecentNoumsQuery, RecentNoumsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecentNoumsQuery, RecentNoumsQueryVariables>(RecentNoumsDocument, options);
        }
export type RecentNoumsQueryHookResult = ReturnType<typeof useRecentNoumsQuery>;
export type RecentNoumsLazyQueryHookResult = ReturnType<typeof useRecentNoumsLazyQuery>;
export type RecentNoumsQueryResult = Apollo.QueryResult<RecentNoumsQuery, RecentNoumsQueryVariables>;