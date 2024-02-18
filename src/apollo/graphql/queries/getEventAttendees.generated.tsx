/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { AttendeesFragmentDoc } from '../fragments/attendees.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetEventAttendeesQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  filter?: Types.InputMaybe<Types.EventAttendeesFilter>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetEventAttendeesQuery = { __typename?: 'Query', getEventAttendees?: { __typename?: 'PaginatedAttendeesData', count?: number | null, meta?: { __typename?: 'AttendeesMeta', pendingCount?: number | null, attendeesCount?: number | null } | null, data?: Array<{ __typename?: 'Attendees', userRole?: Types.UserRole | null, invitationId?: string | null, invitationStatus?: Types.InvitationStatus | null, userId?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, email?: string | null, title?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null } | null };


export const GetEventAttendeesDocument = gql`
    query GetEventAttendees($id: ID!, $filter: EventAttendeesFilter, $limit: Int, $offset: Int) {
  getEventAttendees(_id: $id, filter: $filter, limit: $limit, offset: $offset) {
    count
    meta {
      pendingCount
      attendeesCount
    }
    data {
      ...Attendees
    }
  }
}
    ${AttendeesFragmentDoc}`;

/**
 * __useGetEventAttendeesQuery__
 *
 * To run a query within a React component, call `useGetEventAttendeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventAttendeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventAttendeesQuery({
 *   variables: {
 *      id: // value for 'id'
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetEventAttendeesQuery(baseOptions: Apollo.QueryHookOptions<GetEventAttendeesQuery, GetEventAttendeesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventAttendeesQuery, GetEventAttendeesQueryVariables>(GetEventAttendeesDocument, options);
      }
export function useGetEventAttendeesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventAttendeesQuery, GetEventAttendeesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventAttendeesQuery, GetEventAttendeesQueryVariables>(GetEventAttendeesDocument, options);
        }
export type GetEventAttendeesQueryHookResult = ReturnType<typeof useGetEventAttendeesQuery>;
export type GetEventAttendeesLazyQueryHookResult = ReturnType<typeof useGetEventAttendeesLazyQuery>;
export type GetEventAttendeesQueryResult = Apollo.QueryResult<GetEventAttendeesQuery, GetEventAttendeesQueryVariables>;