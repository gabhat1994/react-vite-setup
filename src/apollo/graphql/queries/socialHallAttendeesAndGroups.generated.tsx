/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SocialHallAttendeeFragmentDoc, SocialHallGroupFragmentDoc } from '../fragments/socialHall.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SocialHallAttendeesAndGroupsQueryVariables = Types.Exact<{
  limit: Types.Scalars['Int'];
  offset: Types.Scalars['Int'];
  socialHallId: Types.Scalars['ID'];
}>;


export type SocialHallAttendeesAndGroupsQuery = { __typename?: 'Query', socialHallAttendee?: { __typename?: 'SocialHallAttendees', count: number, data?: Array<{ __typename?: 'SocialHallAttendee', _id: string, socialHallId: string, isHost?: boolean | null, hallGroupId?: string | null, rtmToken?: string | null, waitingRoomChannelName?: string | null, eventRole?: { __typename?: 'CurrentUser', userRole?: Types.UserRole | null } | null, attendeeId?: { __typename?: 'UserOutput', bio?: string | null, _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, skills?: Array<{ __typename?: 'Skill', _id: string, name: string, icon: string } | null> | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null } | null, socialHallGroups?: { __typename?: 'SocialGroups', count: number, data?: Array<{ __typename?: 'SocialGroup', _id: string, token?: string | null, name?: string | null, channelName?: string | null, topic?: Array<string | null> | null, startTime?: any | null, socialHallId?: string | null, raiseHands?: Array<string | null> | null, hosts?: Array<string | null> | null, rtmToken?: string | null, speakers?: Array<string | null> | null, users?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null> | null, invitedAsSpeakers?: Array<{ __typename?: 'SpeakerInvitation', invitee?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, inviter?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null } | null> | null } | null };


export const SocialHallAttendeesAndGroupsDocument = gql`
    query socialHallAttendeesAndGroups($limit: Int!, $offset: Int!, $socialHallId: ID!) {
  socialHallAttendee(limit: $limit, offset: $offset, socialHallId: $socialHallId) {
    count
    data {
      ...SocialHallAttendee
    }
  }
  socialHallGroups(socialHallId: $socialHallId, limit: $limit, offset: $offset) {
    count
    data {
      ...SocialHallGroup
    }
  }
}
    ${SocialHallAttendeeFragmentDoc}
${SocialHallGroupFragmentDoc}`;

/**
 * __useSocialHallAttendeesAndGroupsQuery__
 *
 * To run a query within a React component, call `useSocialHallAttendeesAndGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSocialHallAttendeesAndGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSocialHallAttendeesAndGroupsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      socialHallId: // value for 'socialHallId'
 *   },
 * });
 */
export function useSocialHallAttendeesAndGroupsQuery(baseOptions: Apollo.QueryHookOptions<SocialHallAttendeesAndGroupsQuery, SocialHallAttendeesAndGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SocialHallAttendeesAndGroupsQuery, SocialHallAttendeesAndGroupsQueryVariables>(SocialHallAttendeesAndGroupsDocument, options);
      }
export function useSocialHallAttendeesAndGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SocialHallAttendeesAndGroupsQuery, SocialHallAttendeesAndGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SocialHallAttendeesAndGroupsQuery, SocialHallAttendeesAndGroupsQueryVariables>(SocialHallAttendeesAndGroupsDocument, options);
        }
export type SocialHallAttendeesAndGroupsQueryHookResult = ReturnType<typeof useSocialHallAttendeesAndGroupsQuery>;
export type SocialHallAttendeesAndGroupsLazyQueryHookResult = ReturnType<typeof useSocialHallAttendeesAndGroupsLazyQuery>;
export type SocialHallAttendeesAndGroupsQueryResult = Apollo.QueryResult<SocialHallAttendeesAndGroupsQuery, SocialHallAttendeesAndGroupsQueryVariables>;