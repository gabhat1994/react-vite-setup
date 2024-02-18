/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { EventFragmentDoc } from '../fragments/event.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetEventByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetEventByIdQuery = { __typename?: 'Query', getEventById?: { __typename?: 'Event', _id: string, title: string, eventStatusUpdatedAt?: any | null, description?: string | null, eventDate?: any | null, duration?: number | null, privacy?: Types.Privacy | null, isInstantEvent?: boolean | null, totalAttendees?: number | null, status?: Types.EventsStatus | null, recurring?: boolean | null, timezone?: { __typename?: 'Timezone', _id: string, offset?: string | null, text?: string | null, value?: string | null, abbr?: string | null, utcOffset?: string | null, timezone?: string | null } | null, cohosts: Array<{ __typename?: 'Cohost', _id?: string | null, status?: Types.InvitationStatus | null, userId?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, location?: string | null, bio?: string | null, connection?: Types.ConnectionType | null, userStatus?: string | null, userType?: Types.NoumenaUserType | null, createdAt?: any | null, updatedAt?: any | null, isAcceptedSkipMediaTesting?: boolean | null, citizenship?: string | null, SocialHallTCAccepted?: boolean | null, status?: string | null, unreadConnectionCount?: number | null, referralCode?: string | null, profileUrl?: string | null, userOwnReferralCode?: string | null, kycResult?: string | null, creditCheckResult?: string | null, lastLoginAt?: any | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, ageGroup?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, freelancingExperience?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, visibility?: { __typename?: 'UserOutputVisibility', email?: string | null, phone?: string | null, location?: string | null } | null, visibleTo?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null, connections?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null, roles?: Array<{ __typename?: 'UserRoleOutput', _id: string, roleType?: string | null, permissions?: Array<string | null> | null } | null> | null, metadata?: Array<{ __typename?: 'LogsOutput', additionalInfo?: string | null, reason?: string | null, moreInfo?: string | null, statusTo?: string | null, statusFrom?: string | null, changeOn?: any | null, changedBy?: string | null, changedByDetails?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null, type?: string | null, name?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, skills?: Array<{ __typename?: 'Skill', _id: string, name: string, icon: string } | null> | null } | null }>, userId?: { __typename?: 'UserOutput', _id: string, email?: string | null, firstName?: string | null, lastName?: string | null, middleName?: string | null, title?: string | null, userStatus?: string | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null } | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null, profilePicture?: string | null } | null } | null, invitations: Array<{ __typename?: 'Invitees', _id: string, status?: Types.InvitationStatus | null }>, currentUser?: { __typename?: 'CurrentUser', eventId: string, userId: string, userRole?: Types.UserRole | null, invitation?: { __typename?: 'Invitees', _id: string, status?: Types.InvitationStatus | null } | null } | null, socialHall?: { __typename?: 'SocialHall', _id: string, hasUserJoined?: boolean | null, isActive: boolean } | null, chamberId?: { __typename?: 'ChamberByIdRef', _id: string, type?: string | null, name?: string | null, uid?: { __typename?: 'UserOutput', _id: string, email?: string | null, firstName?: string | null, lastName?: string | null, middleName?: string | null, title?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null, profilePicture?: string | null } | null } | null } | null, recurringDetails?: { __typename?: 'RecurringDetails', frequency?: Types.Frequency | null, weekDays?: Array<Types.WeekDays | null> | null, interval?: number | null, monthDates?: Array<number | null> | null, custom?: boolean | null } | null } | null };

export type GetEventStatusQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetEventStatusQuery = { __typename?: 'Query', getEventById?: { __typename?: 'Event', _id: string, status?: Types.EventsStatus | null } | null };


export const GetEventByIdDocument = gql`
    query GetEventById($id: ID!) {
  getEventById(_id: $id) {
    ...Event
  }
}
    ${EventFragmentDoc}`;

/**
 * __useGetEventByIdQuery__
 *
 * To run a query within a React component, call `useGetEventByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEventByIdQuery(baseOptions: Apollo.QueryHookOptions<GetEventByIdQuery, GetEventByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventByIdQuery, GetEventByIdQueryVariables>(GetEventByIdDocument, options);
      }
export function useGetEventByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventByIdQuery, GetEventByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventByIdQuery, GetEventByIdQueryVariables>(GetEventByIdDocument, options);
        }
export type GetEventByIdQueryHookResult = ReturnType<typeof useGetEventByIdQuery>;
export type GetEventByIdLazyQueryHookResult = ReturnType<typeof useGetEventByIdLazyQuery>;
export type GetEventByIdQueryResult = Apollo.QueryResult<GetEventByIdQuery, GetEventByIdQueryVariables>;
export const GetEventStatusDocument = gql`
    query getEventStatus($id: ID!) {
  getEventById(_id: $id) {
    _id
    status
  }
}
    `;

/**
 * __useGetEventStatusQuery__
 *
 * To run a query within a React component, call `useGetEventStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventStatusQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEventStatusQuery(baseOptions: Apollo.QueryHookOptions<GetEventStatusQuery, GetEventStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventStatusQuery, GetEventStatusQueryVariables>(GetEventStatusDocument, options);
      }
export function useGetEventStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventStatusQuery, GetEventStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventStatusQuery, GetEventStatusQueryVariables>(GetEventStatusDocument, options);
        }
export type GetEventStatusQueryHookResult = ReturnType<typeof useGetEventStatusQuery>;
export type GetEventStatusLazyQueryHookResult = ReturnType<typeof useGetEventStatusLazyQuery>;
export type GetEventStatusQueryResult = Apollo.QueryResult<GetEventStatusQuery, GetEventStatusQueryVariables>;