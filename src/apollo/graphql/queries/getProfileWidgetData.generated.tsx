/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetProfileWidgetDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetProfileWidgetDataQuery = { __typename?: 'Query', user?: { __typename?: 'UserOutput', _id: string, bio?: string | null, title?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null, location?: string | null, connection?: Types.ConnectionType | null, updatedAt?: any | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null, profilePictureThumbnail?: string | null } | null } | null };


export const GetProfileWidgetDataDocument = gql`
    query getProfileWidgetData($id: ID!) {
  user(_id: $id) {
    _id
    bio
    title
    firstName
    lastName
    username
    location
    connection
    updatedAt
    userStatus
    profile {
      profilePicture
      profilePictureThumbnail
    }
  }
}
    `;

/**
 * __useGetProfileWidgetDataQuery__
 *
 * To run a query within a React component, call `useGetProfileWidgetDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileWidgetDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileWidgetDataQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProfileWidgetDataQuery(baseOptions: Apollo.QueryHookOptions<GetProfileWidgetDataQuery, GetProfileWidgetDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileWidgetDataQuery, GetProfileWidgetDataQueryVariables>(GetProfileWidgetDataDocument, options);
      }
export function useGetProfileWidgetDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileWidgetDataQuery, GetProfileWidgetDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileWidgetDataQuery, GetProfileWidgetDataQueryVariables>(GetProfileWidgetDataDocument, options);
        }
export type GetProfileWidgetDataQueryHookResult = ReturnType<typeof useGetProfileWidgetDataQuery>;
export type GetProfileWidgetDataLazyQueryHookResult = ReturnType<typeof useGetProfileWidgetDataLazyQuery>;
export type GetProfileWidgetDataQueryResult = Apollo.QueryResult<GetProfileWidgetDataQuery, GetProfileWidgetDataQueryVariables>;