/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { EventAllUsersFragmentDoc } from '../fragments/eventAllUsers.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EventAllFavoriteMembersQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.SearchUserFilter>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  chamberId?: Types.InputMaybe<Types.Scalars['ID']>;
  favoritesLimit?: Types.InputMaybe<Types.Scalars['Int']>;
  favoritesOffset?: Types.InputMaybe<Types.Scalars['Int']>;
  type?: Types.InputMaybe<Types.UserRelationType>;
  oldConnectionFlow?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type EventAllFavoriteMembersQuery = { __typename?: 'Query', favorites: { __typename?: 'UserOutputAllUsers', count?: number | null, data?: Array<{ __typename?: 'UserOutput', _id: string, email?: string | null, firstName?: string | null, lastName?: string | null, middleName?: string | null, title?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null, profilePicture?: string | null } | null } | null> | null } };


export const EventAllFavoriteMembersDocument = gql`
    query EventAllFavoriteMembers($filter: SearchUserFilter, $search: String, $chamberId: ID, $favoritesLimit: Int, $favoritesOffset: Int, $type: UserRelationType, $oldConnectionFlow: Boolean) {
  favorites: allUsers(
    search: $search
    chamberId: $chamberId
    limit: $favoritesLimit
    offset: $favoritesOffset
    filter: $filter
    type: $type
    oldConnectionFlow: $oldConnectionFlow
  ) {
    ...EventAllUsers
  }
}
    ${EventAllUsersFragmentDoc}`;

/**
 * __useEventAllFavoriteMembersQuery__
 *
 * To run a query within a React component, call `useEventAllFavoriteMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventAllFavoriteMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventAllFavoriteMembersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      search: // value for 'search'
 *      chamberId: // value for 'chamberId'
 *      favoritesLimit: // value for 'favoritesLimit'
 *      favoritesOffset: // value for 'favoritesOffset'
 *      type: // value for 'type'
 *      oldConnectionFlow: // value for 'oldConnectionFlow'
 *   },
 * });
 */
export function useEventAllFavoriteMembersQuery(baseOptions?: Apollo.QueryHookOptions<EventAllFavoriteMembersQuery, EventAllFavoriteMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventAllFavoriteMembersQuery, EventAllFavoriteMembersQueryVariables>(EventAllFavoriteMembersDocument, options);
      }
export function useEventAllFavoriteMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventAllFavoriteMembersQuery, EventAllFavoriteMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventAllFavoriteMembersQuery, EventAllFavoriteMembersQueryVariables>(EventAllFavoriteMembersDocument, options);
        }
export type EventAllFavoriteMembersQueryHookResult = ReturnType<typeof useEventAllFavoriteMembersQuery>;
export type EventAllFavoriteMembersLazyQueryHookResult = ReturnType<typeof useEventAllFavoriteMembersLazyQuery>;
export type EventAllFavoriteMembersQueryResult = Apollo.QueryResult<EventAllFavoriteMembersQuery, EventAllFavoriteMembersQueryVariables>;