/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ParticipatedEventFragmentDoc } from '../fragments/event.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EventsParticipatedQueryVariables = Types.Exact<{
  chamberId: Types.Scalars['ID'];
}>;


export type EventsParticipatedQuery = { __typename?: 'Query', hosted?: { __typename?: 'PaginatedEventsData', data?: Array<{ __typename?: 'Event', _id: string, status?: Types.EventsStatus | null, eventDate?: any | null, duration?: number | null, title: string, recurring?: boolean | null, currentUser?: { __typename?: 'CurrentUser', eventId: string, userId: string, userRole?: Types.UserRole | null, invitation?: { __typename?: 'Invitees', _id: string, status?: Types.InvitationStatus | null } | null } | null, recurringDetails?: { __typename?: 'RecurringDetails', frequency?: Types.Frequency | null, weekDays?: Array<Types.WeekDays | null> | null, interval?: number | null, monthDates?: Array<number | null> | null, custom?: boolean | null } | null } | null> | null } | null, attending?: { __typename?: 'PaginatedEventsData', data?: Array<{ __typename?: 'Event', _id: string, status?: Types.EventsStatus | null, eventDate?: any | null, duration?: number | null, title: string, recurring?: boolean | null, currentUser?: { __typename?: 'CurrentUser', eventId: string, userId: string, userRole?: Types.UserRole | null, invitation?: { __typename?: 'Invitees', _id: string, status?: Types.InvitationStatus | null } | null } | null, recurringDetails?: { __typename?: 'RecurringDetails', frequency?: Types.Frequency | null, weekDays?: Array<Types.WeekDays | null> | null, interval?: number | null, monthDates?: Array<number | null> | null, custom?: boolean | null } | null } | null> | null } | null };


export const EventsParticipatedDocument = gql`
    query EventsParticipated($chamberId: ID!) {
  hosted: getEvents(
    chamberId: $chamberId
    filter: {eventFilter: HOSTING}
    limit: 10
    offset: 0
    sortOrder: ASC
  ) {
    data {
      ...ParticipatedEvent
    }
  }
  attending: getEvents(
    chamberId: $chamberId
    filter: {eventFilter: ATTENDING}
    limit: 10
    offset: 0
    sortOrder: ASC
  ) {
    data {
      ...ParticipatedEvent
    }
  }
}
    ${ParticipatedEventFragmentDoc}`;

/**
 * __useEventsParticipatedQuery__
 *
 * To run a query within a React component, call `useEventsParticipatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsParticipatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsParticipatedQuery({
 *   variables: {
 *      chamberId: // value for 'chamberId'
 *   },
 * });
 */
export function useEventsParticipatedQuery(baseOptions: Apollo.QueryHookOptions<EventsParticipatedQuery, EventsParticipatedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventsParticipatedQuery, EventsParticipatedQueryVariables>(EventsParticipatedDocument, options);
      }
export function useEventsParticipatedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsParticipatedQuery, EventsParticipatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventsParticipatedQuery, EventsParticipatedQueryVariables>(EventsParticipatedDocument, options);
        }
export type EventsParticipatedQueryHookResult = ReturnType<typeof useEventsParticipatedQuery>;
export type EventsParticipatedLazyQueryHookResult = ReturnType<typeof useEventsParticipatedLazyQuery>;
export type EventsParticipatedQueryResult = Apollo.QueryResult<EventsParticipatedQuery, EventsParticipatedQueryVariables>;