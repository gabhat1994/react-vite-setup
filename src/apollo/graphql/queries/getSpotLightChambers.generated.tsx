/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSpotLightChambersQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.SpotlightChamberFilters>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetSpotLightChambersQuery = { __typename?: 'Query', getSpotLightChambers?: { __typename?: 'SpaceOutputResponse', count?: number | null, data?: Array<{ __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, title?: string | null, type?: string | null, projectType?: string | null, description?: string | null, profileImage?: string | null, followersCount?: number | null, status?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, title?: string | null, userStatus?: string | null, location?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null } | null } | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null } | null> | null } | null };


export const GetSpotLightChambersDocument = gql`
    query getSpotLightChambers($filter: SpotlightChamberFilters, $offset: Int, $limit: Int) {
  getSpotLightChambers(filter: $filter, offset: $offset, limit: $limit) {
    data {
      _id
      name
      title
      type
      projectType
      description
      profileImage
      followersCount
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
 * __useGetSpotLightChambersQuery__
 *
 * To run a query within a React component, call `useGetSpotLightChambersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpotLightChambersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpotLightChambersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetSpotLightChambersQuery(baseOptions?: Apollo.QueryHookOptions<GetSpotLightChambersQuery, GetSpotLightChambersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSpotLightChambersQuery, GetSpotLightChambersQueryVariables>(GetSpotLightChambersDocument, options);
      }
export function useGetSpotLightChambersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSpotLightChambersQuery, GetSpotLightChambersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSpotLightChambersQuery, GetSpotLightChambersQueryVariables>(GetSpotLightChambersDocument, options);
        }
export type GetSpotLightChambersQueryHookResult = ReturnType<typeof useGetSpotLightChambersQuery>;
export type GetSpotLightChambersLazyQueryHookResult = ReturnType<typeof useGetSpotLightChambersLazyQuery>;
export type GetSpotLightChambersQueryResult = Apollo.QueryResult<GetSpotLightChambersQuery, GetSpotLightChambersQueryVariables>;