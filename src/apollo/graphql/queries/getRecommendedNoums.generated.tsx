/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetRecommendedNoumsQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  filter?: Types.InputMaybe<Types.SpaceCategoryFilter>;
}>;


export type GetRecommendedNoumsQuery = { __typename?: 'Query', getRecommendedNoums?: { __typename?: 'SpaceOutputResponse', count?: number | null, data?: Array<{ __typename?: 'SpaceOutput', name?: string | null, _id?: string | null, type?: string | null, title?: string | null, description?: string | null, profileImage?: string | null, followersCount?: number | null, isFavourited?: boolean | null, status?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, title?: string | null, userStatus?: string | null, location?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null } | null } | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null } | null> | null } | null };


export const GetRecommendedNoumsDocument = gql`
    query getRecommendedNoums($limit: Int, $offset: Int, $filter: SpaceCategoryFilter) {
  getRecommendedNoums(limit: $limit, offset: $offset, filter: $filter) {
    data {
      name
      _id
      type
      title
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
 * __useGetRecommendedNoumsQuery__
 *
 * To run a query within a React component, call `useGetRecommendedNoumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecommendedNoumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecommendedNoumsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetRecommendedNoumsQuery(baseOptions?: Apollo.QueryHookOptions<GetRecommendedNoumsQuery, GetRecommendedNoumsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecommendedNoumsQuery, GetRecommendedNoumsQueryVariables>(GetRecommendedNoumsDocument, options);
      }
export function useGetRecommendedNoumsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecommendedNoumsQuery, GetRecommendedNoumsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecommendedNoumsQuery, GetRecommendedNoumsQueryVariables>(GetRecommendedNoumsDocument, options);
        }
export type GetRecommendedNoumsQueryHookResult = ReturnType<typeof useGetRecommendedNoumsQuery>;
export type GetRecommendedNoumsLazyQueryHookResult = ReturnType<typeof useGetRecommendedNoumsLazyQuery>;
export type GetRecommendedNoumsQueryResult = Apollo.QueryResult<GetRecommendedNoumsQuery, GetRecommendedNoumsQueryVariables>;