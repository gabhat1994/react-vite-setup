/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SocialHallGroupFragmentDoc } from '../fragments/socialHall.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserActiveSocialHallGroupQueryVariables = Types.Exact<{
  socialHallId?: Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type UserActiveSocialHallGroupQuery = { __typename?: 'Query', userActiveSocialHallGroup?: { __typename?: 'SocialGroup', _id: string, token?: string | null, name?: string | null, channelName?: string | null, topic?: Array<string | null> | null, startTime?: any | null, socialHallId?: string | null, raiseHands?: Array<string | null> | null, hosts?: Array<string | null> | null, rtmToken?: string | null, speakers?: Array<string | null> | null, users?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null> | null, invitedAsSpeakers?: Array<{ __typename?: 'SpeakerInvitation', invitee?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, inviter?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null } | null };


export const UserActiveSocialHallGroupDocument = gql`
    query userActiveSocialHallGroup($socialHallId: ID) {
  userActiveSocialHallGroup(socialHallId: $socialHallId) {
    ...SocialHallGroup
  }
}
    ${SocialHallGroupFragmentDoc}`;

/**
 * __useUserActiveSocialHallGroupQuery__
 *
 * To run a query within a React component, call `useUserActiveSocialHallGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserActiveSocialHallGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserActiveSocialHallGroupQuery({
 *   variables: {
 *      socialHallId: // value for 'socialHallId'
 *   },
 * });
 */
export function useUserActiveSocialHallGroupQuery(baseOptions?: Apollo.QueryHookOptions<UserActiveSocialHallGroupQuery, UserActiveSocialHallGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserActiveSocialHallGroupQuery, UserActiveSocialHallGroupQueryVariables>(UserActiveSocialHallGroupDocument, options);
      }
export function useUserActiveSocialHallGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserActiveSocialHallGroupQuery, UserActiveSocialHallGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserActiveSocialHallGroupQuery, UserActiveSocialHallGroupQueryVariables>(UserActiveSocialHallGroupDocument, options);
        }
export type UserActiveSocialHallGroupQueryHookResult = ReturnType<typeof useUserActiveSocialHallGroupQuery>;
export type UserActiveSocialHallGroupLazyQueryHookResult = ReturnType<typeof useUserActiveSocialHallGroupLazyQuery>;
export type UserActiveSocialHallGroupQueryResult = Apollo.QueryResult<UserActiveSocialHallGroupQuery, UserActiveSocialHallGroupQueryVariables>;