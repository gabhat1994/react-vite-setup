/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetProjectChambersQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.ProjectChamberFilter>;
}>;


export type GetProjectChambersQuery = { __typename?: 'Query', getProjectChambers?: { __typename?: 'SpaceOutputResponse', data?: Array<{ __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, status?: string | null, profileImage?: string | null, type?: string | null, followersCount?: number | null, category?: { __typename?: 'ProjectChamberCategory', name: string } | null, uid?: { __typename?: 'UserOutput', firstName?: string | null, title?: string | null, lastName?: string | null, _id: string, middleName?: string | null, location?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null } | null } | null } | null> | null } | null };


export const GetProjectChambersDocument = gql`
    query getProjectChambers($filter: ProjectChamberFilter) {
  getProjectChambers(filter: $filter) {
    data {
      _id
      name
      status
      profileImage
      type
      followersCount
      category {
        name
      }
      uid {
        profile {
          profilePicture
        }
        firstName
        title
        lastName
        _id
        firstName
        middleName
        lastName
        location
      }
    }
  }
}
    `;

/**
 * __useGetProjectChambersQuery__
 *
 * To run a query within a React component, call `useGetProjectChambersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectChambersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectChambersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetProjectChambersQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectChambersQuery, GetProjectChambersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectChambersQuery, GetProjectChambersQueryVariables>(GetProjectChambersDocument, options);
      }
export function useGetProjectChambersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectChambersQuery, GetProjectChambersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectChambersQuery, GetProjectChambersQueryVariables>(GetProjectChambersDocument, options);
        }
export type GetProjectChambersQueryHookResult = ReturnType<typeof useGetProjectChambersQuery>;
export type GetProjectChambersLazyQueryHookResult = ReturnType<typeof useGetProjectChambersLazyQuery>;
export type GetProjectChambersQueryResult = Apollo.QueryResult<GetProjectChambersQuery, GetProjectChambersQueryVariables>;