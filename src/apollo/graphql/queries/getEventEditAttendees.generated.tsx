/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EventEditAttendeeFragment = { __typename?: 'Attendees', userRole?: Types.UserRole | null, invitationId?: string | null, invitationStatus?: Types.InvitationStatus | null, userId?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, email?: string | null, userStatus?: string | null, title?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null, profilePictureThumbnail?: string | null } | null } | null, chamberId?: { __typename?: 'ChamberByIdRef', _id: string } | null };

export type GetEventEditAttendeesQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetEventEditAttendeesQuery = { __typename?: 'Query', connected?: { __typename?: 'PaginatedAttendeesData', data?: Array<{ __typename?: 'Attendees', userRole?: Types.UserRole | null, invitationId?: string | null, invitationStatus?: Types.InvitationStatus | null, userId?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, email?: string | null, userStatus?: string | null, title?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null, profilePictureThumbnail?: string | null } | null } | null, chamberId?: { __typename?: 'ChamberByIdRef', _id: string } | null } | null> | null } | null, others?: { __typename?: 'PaginatedAttendeesData', data?: Array<{ __typename?: 'Attendees', userRole?: Types.UserRole | null, invitationId?: string | null, invitationStatus?: Types.InvitationStatus | null, userId?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, email?: string | null, userStatus?: string | null, title?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null, profilePictureThumbnail?: string | null } | null } | null, chamberId?: { __typename?: 'ChamberByIdRef', _id: string } | null } | null> | null } | null };

export const EventEditAttendeeFragmentDoc = gql`
    fragment EventEditAttendee on Attendees {
  userId {
    _id
    firstName
    middleName
    lastName
    email
    userStatus
    title
    profile {
      profilePicture
      profilePictureThumbnail
    }
  }
  chamberId {
    _id
  }
  userRole
  invitationId
  invitationStatus
}
    `;
export const GetEventEditAttendeesDocument = gql`
    query GetEventEditAttendees($id: ID!) {
  connected: getEventAttendees(
    _id: $id
    filter: {attendeesType: CONNECTED, invitationStatus: [ACCEPTED, PENDING]}
  ) {
    data {
      ...EventEditAttendee
    }
  }
  others: getEventAttendees(
    _id: $id
    filter: {attendeesType: OTHERS, invitationStatus: [ACCEPTED, PENDING]}
  ) {
    data {
      ...EventEditAttendee
    }
  }
}
    ${EventEditAttendeeFragmentDoc}`;

/**
 * __useGetEventEditAttendeesQuery__
 *
 * To run a query within a React component, call `useGetEventEditAttendeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventEditAttendeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventEditAttendeesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEventEditAttendeesQuery(baseOptions: Apollo.QueryHookOptions<GetEventEditAttendeesQuery, GetEventEditAttendeesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventEditAttendeesQuery, GetEventEditAttendeesQueryVariables>(GetEventEditAttendeesDocument, options);
      }
export function useGetEventEditAttendeesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventEditAttendeesQuery, GetEventEditAttendeesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventEditAttendeesQuery, GetEventEditAttendeesQueryVariables>(GetEventEditAttendeesDocument, options);
        }
export type GetEventEditAttendeesQueryHookResult = ReturnType<typeof useGetEventEditAttendeesQuery>;
export type GetEventEditAttendeesLazyQueryHookResult = ReturnType<typeof useGetEventEditAttendeesLazyQuery>;
export type GetEventEditAttendeesQueryResult = Apollo.QueryResult<GetEventEditAttendeesQuery, GetEventEditAttendeesQueryVariables>;