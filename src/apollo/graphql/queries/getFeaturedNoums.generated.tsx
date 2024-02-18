/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetFeaturedNoumsQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetFeaturedNoumsQuery = { __typename?: 'Query', getFeaturedNoums?: { __typename?: 'SpaceOutputResponse', count?: number | null, data?: Array<{ __typename?: 'SpaceOutput', _id?: string | null, broadcastedAt?: any | null, broadcastEndedAt?: any | null, name?: string | null, title?: string | null, type?: string | null, projectType?: string | null, description?: string | null, profileImage?: string | null, followersCount?: number | null, isFavourited?: boolean | null, status?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, title?: string | null, userStatus?: string | null, location?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null } | null } | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null } | null> | null } | null };


export const GetFeaturedNoumsDocument = gql`
    query getFeaturedNoums($offset: Int, $limit: Int) {
  getFeaturedNoums(offset: $offset, limit: $limit) {
    data {
      _id
      broadcastedAt
      broadcastEndedAt
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
 * __useGetFeaturedNoumsQuery__
 *
 * To run a query within a React component, call `useGetFeaturedNoumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeaturedNoumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeaturedNoumsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetFeaturedNoumsQuery(baseOptions?: Apollo.QueryHookOptions<GetFeaturedNoumsQuery, GetFeaturedNoumsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFeaturedNoumsQuery, GetFeaturedNoumsQueryVariables>(GetFeaturedNoumsDocument, options);
      }
export function useGetFeaturedNoumsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFeaturedNoumsQuery, GetFeaturedNoumsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFeaturedNoumsQuery, GetFeaturedNoumsQueryVariables>(GetFeaturedNoumsDocument, options);
        }
export type GetFeaturedNoumsQueryHookResult = ReturnType<typeof useGetFeaturedNoumsQuery>;
export type GetFeaturedNoumsLazyQueryHookResult = ReturnType<typeof useGetFeaturedNoumsLazyQuery>;
export type GetFeaturedNoumsQueryResult = Apollo.QueryResult<GetFeaturedNoumsQuery, GetFeaturedNoumsQueryVariables>;