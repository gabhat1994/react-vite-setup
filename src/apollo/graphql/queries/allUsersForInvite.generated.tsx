/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { EventCurrentUserFragmentDoc } from '../fragments/event.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AllUsersForInviteQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.SearchUserFilter>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  eventId?: Types.InputMaybe<Types.Scalars['ID']>;
  chamberId?: Types.InputMaybe<Types.Scalars['ID']>;
  skipEventRole: Types.Scalars['Boolean'];
  oldConnectionFlow?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type AllUsersForInviteQuery = { __typename?: 'Query', allUsers: { __typename?: 'UserOutputAllUsers', count?: number | null, data?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null, getEventUserRole?: { __typename?: 'CurrentUser', eventId: string, userId: string, userRole?: Types.UserRole | null, invitation?: { __typename?: 'Invitees', _id: string, status?: Types.InvitationStatus | null } | null } | null } | null> | null } };


export const AllUsersForInviteDocument = gql`
    query allUsersForInvite($filter: SearchUserFilter, $limit: Int, $offset: Int, $search: String, $eventId: ID, $chamberId: ID, $skipEventRole: Boolean!, $oldConnectionFlow: Boolean) {
  allUsers(
    filter: $filter
    limit: $limit
    offset: $offset
    search: $search
    chamberId: $chamberId
    oldConnectionFlow: $oldConnectionFlow
  ) {
    count
    data {
      _id
      firstName
      lastName
      middleName
      title
      phone
      email
      userStatus
      profile {
        profilePictureThumbnail
      }
      chamber {
        userId
        _id
      }
      getEventUserRole(eventId: $eventId) @skip(if: $skipEventRole) {
        ...EventCurrentUser
      }
    }
  }
}
    ${EventCurrentUserFragmentDoc}`;

/**
 * __useAllUsersForInviteQuery__
 *
 * To run a query within a React component, call `useAllUsersForInviteQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersForInviteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersForInviteQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      search: // value for 'search'
 *      eventId: // value for 'eventId'
 *      chamberId: // value for 'chamberId'
 *      skipEventRole: // value for 'skipEventRole'
 *      oldConnectionFlow: // value for 'oldConnectionFlow'
 *   },
 * });
 */
export function useAllUsersForInviteQuery(baseOptions: Apollo.QueryHookOptions<AllUsersForInviteQuery, AllUsersForInviteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllUsersForInviteQuery, AllUsersForInviteQueryVariables>(AllUsersForInviteDocument, options);
      }
export function useAllUsersForInviteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUsersForInviteQuery, AllUsersForInviteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllUsersForInviteQuery, AllUsersForInviteQueryVariables>(AllUsersForInviteDocument, options);
        }
export type AllUsersForInviteQueryHookResult = ReturnType<typeof useAllUsersForInviteQuery>;
export type AllUsersForInviteLazyQueryHookResult = ReturnType<typeof useAllUsersForInviteLazyQuery>;
export type AllUsersForInviteQueryResult = Apollo.QueryResult<AllUsersForInviteQuery, AllUsersForInviteQueryVariables>;