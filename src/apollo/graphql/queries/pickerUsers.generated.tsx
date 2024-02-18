/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { EventAllUsersFragmentDoc } from '../fragments/eventAllUsers.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PickerUsersQueryVariables = Types.Exact<{
  search?: Types.InputMaybe<Types.Scalars['String']>;
  chamberId?: Types.InputMaybe<Types.Scalars['ID']>;
  connectedLimit?: Types.InputMaybe<Types.Scalars['Int']>;
  connectedOffset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  userStatuses?: Types.InputMaybe<Array<Types.GlobalSearchUserEntityStatus> | Types.GlobalSearchUserEntityStatus>;
  fetchAll: Types.Scalars['Boolean'];
  oldConnectionFlow?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type PickerUsersQuery = { __typename?: 'Query', connected: { __typename?: 'UserOutputAllUsers', count?: number | null, data?: Array<{ __typename?: 'UserOutput', _id: string, email?: string | null, firstName?: string | null, lastName?: string | null, middleName?: string | null, title?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null, profilePicture?: string | null } | null } | null> | null }, other: { __typename?: 'GlobalSearchResult', count: number, data: Array<{ __typename?: 'GlobalSearchEntity', id: string, user: { __typename?: 'GlobalSearchEntityUser', id?: string | null, firstName?: string | null, lastName?: string | null, middleName?: string | null, title?: string | null, thumbnailUrl?: string | null }, chamber?: { __typename?: 'GlobalSearchNoumEntity', isConnected: boolean } | null }> } };


export const PickerUsersDocument = gql`
    query PickerUsers($search: String, $chamberId: ID, $connectedLimit: Int, $connectedOffset: Int, $limit: Int, $offset: Int, $userStatuses: [GlobalSearchUserEntityStatus!], $fetchAll: Boolean!, $oldConnectionFlow: Boolean) {
  connected: allUsers(
    search: $search
    chamberId: $chamberId
    limit: $connectedLimit
    offset: $connectedOffset
    type: CONNECTED
    oldConnectionFlow: $oldConnectionFlow
  ) {
    ...EventAllUsers
  }
  other: globalSearch(
    query: $search
    entityType: HomeNoum
    offset: $offset
    limit: $limit
    userStatuses: $userStatuses
  ) @include(if: $fetchAll) {
    count
    data {
      id
      user {
        id
        firstName
        lastName
        middleName
        title
        thumbnailUrl
      }
      chamber: noum {
        isConnected
      }
    }
  }
}
    ${EventAllUsersFragmentDoc}`;

/**
 * __usePickerUsersQuery__
 *
 * To run a query within a React component, call `usePickerUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePickerUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePickerUsersQuery({
 *   variables: {
 *      search: // value for 'search'
 *      chamberId: // value for 'chamberId'
 *      connectedLimit: // value for 'connectedLimit'
 *      connectedOffset: // value for 'connectedOffset'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      userStatuses: // value for 'userStatuses'
 *      fetchAll: // value for 'fetchAll'
 *      oldConnectionFlow: // value for 'oldConnectionFlow'
 *   },
 * });
 */
export function usePickerUsersQuery(baseOptions: Apollo.QueryHookOptions<PickerUsersQuery, PickerUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PickerUsersQuery, PickerUsersQueryVariables>(PickerUsersDocument, options);
      }
export function usePickerUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PickerUsersQuery, PickerUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PickerUsersQuery, PickerUsersQueryVariables>(PickerUsersDocument, options);
        }
export type PickerUsersQueryHookResult = ReturnType<typeof usePickerUsersQuery>;
export type PickerUsersLazyQueryHookResult = ReturnType<typeof usePickerUsersLazyQuery>;
export type PickerUsersQueryResult = Apollo.QueryResult<PickerUsersQuery, PickerUsersQueryVariables>;