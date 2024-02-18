/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { EventMetaFragmentDoc } from '../fragments/eventMeta.generated';
import { EventFragmentDoc } from '../fragments/event.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetEventsQueryVariables = Types.Exact<{
  chamberId: Types.Scalars['ID'];
  filter?: Types.InputMaybe<Types.FilterEvents>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  sortOrder?: Types.InputMaybe<Types.SortOrder>;
}>;


export type GetEventsQuery = { __typename?: 'Query', getEvents?: { __typename?: 'PaginatedEventsData', count?: number | null, meta?: { __typename?: 'EventMeta', allEventsCount?: number | null, hostedEventsCount?: number | null, pendingEventsCount?: number | null, acceptedEventsCount?: number | null, pastEventsCount?: number | null } | null, data?: Array<{ __typename?: 'Event', _id: string, title: string, eventStatusUpdatedAt?: any | null, description?: string | null, eventDate?: any | null, duration?: number | null, privacy?: Types.Privacy | null, isInstantEvent?: boolean | null, totalAttendees?: number | null, status?: Types.EventsStatus | null, recurring?: boolean | null, timezone?: { __typename?: 'Timezone', _id: string, offset?: string | null, text?: string | null, value?: string | null, abbr?: string | null, utcOffset?: string | null, timezone?: string | null } | null, cohosts: Array<{ __typename?: 'Cohost', _id?: string | null, status?: Types.InvitationStatus | null, userId?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, location?: string | null, bio?: string | null, connection?: Types.ConnectionType | null, userStatus?: string | null, userType?: Types.NoumenaUserType | null, createdAt?: any | null, updatedAt?: any | null, isAcceptedSkipMediaTesting?: boolean | null, citizenship?: string | null, SocialHallTCAccepted?: boolean | null, status?: string | null, unreadConnectionCount?: number | null, referralCode?: string | null, profileUrl?: string | null, userOwnReferralCode?: string | null, kycResult?: string | null, creditCheckResult?: string | null, lastLoginAt?: any | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, ageGroup?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, freelancingExperience?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, visibility?: { __typename?: 'UserOutputVisibility', email?: string | null, phone?: string | null, location?: string | null } | null, visibleTo?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null, connections?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null, roles?: Array<{ __typename?: 'UserRoleOutput', _id: string, roleType?: string | null, permissions?: Array<string | null> | null } | null> | null, metadata?: Array<{ __typename?: 'LogsOutput', additionalInfo?: string | null, reason?: string | null, moreInfo?: string | null, statusTo?: string | null, statusFrom?: string | null, changeOn?: any | null, changedBy?: string | null, changedByDetails?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null, type?: string | null, name?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, skills?: Array<{ __typename?: 'Skill', _id: string, name: string, icon: string } | null> | null } | null }>, userId?: { __typename?: 'UserOutput', _id: string, email?: string | null, firstName?: string | null, lastName?: string | null, middleName?: string | null, title?: string | null, userStatus?: string | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null } | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null, profilePicture?: string | null } | null } | null, invitations: Array<{ __typename?: 'Invitees', _id: string, status?: Types.InvitationStatus | null }>, currentUser?: { __typename?: 'CurrentUser', eventId: string, userId: string, userRole?: Types.UserRole | null, invitation?: { __typename?: 'Invitees', _id: string, status?: Types.InvitationStatus | null } | null } | null, socialHall?: { __typename?: 'SocialHall', _id: string, hasUserJoined?: boolean | null, isActive: boolean } | null, chamberId?: { __typename?: 'ChamberByIdRef', _id: string, type?: string | null, name?: string | null, uid?: { __typename?: 'UserOutput', _id: string, email?: string | null, firstName?: string | null, lastName?: string | null, middleName?: string | null, title?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null, profilePicture?: string | null } | null } | null } | null, recurringDetails?: { __typename?: 'RecurringDetails', frequency?: Types.Frequency | null, weekDays?: Array<Types.WeekDays | null> | null, interval?: number | null, monthDates?: Array<number | null> | null, custom?: boolean | null } | null } | null> | null } | null };


export const GetEventsDocument = gql`
    query GetEvents($chamberId: ID!, $filter: FilterEvents, $limit: Int, $offset: Int, $sortOrder: SortOrder) {
  getEvents(
    chamberId: $chamberId
    filter: $filter
    limit: $limit
    offset: $offset
    sortOrder: $sortOrder
  ) {
    count
    meta {
      ...EventMeta
    }
    data {
      ...Event
    }
  }
}
    ${EventMetaFragmentDoc}
${EventFragmentDoc}`;

/**
 * __useGetEventsQuery__
 *
 * To run a query within a React component, call `useGetEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsQuery({
 *   variables: {
 *      chamberId: // value for 'chamberId'
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      sortOrder: // value for 'sortOrder'
 *   },
 * });
 */
export function useGetEventsQuery(baseOptions: Apollo.QueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
      }
export function useGetEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export type GetEventsQueryHookResult = ReturnType<typeof useGetEventsQuery>;
export type GetEventsLazyQueryHookResult = ReturnType<typeof useGetEventsLazyQuery>;
export type GetEventsQueryResult = Apollo.QueryResult<GetEventsQuery, GetEventsQueryVariables>;