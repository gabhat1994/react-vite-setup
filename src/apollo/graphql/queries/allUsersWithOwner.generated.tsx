/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { UserOutputFragmentDoc } from '../fragments/userOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AllUsersWithOwnerQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.SearchUserFilter>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  type?: Types.InputMaybe<Types.UserRelationType>;
  activeUserOnly?: Types.InputMaybe<Types.Scalars['Boolean']>;
  chamberId?: Types.InputMaybe<Types.Scalars['ID']>;
  ownerID: Types.Scalars['ID'];
  oldConnectionFlow?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type AllUsersWithOwnerQuery = { __typename?: 'Query', allUsers: { __typename?: 'UserOutputAllUsers', count?: number | null, data?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, location?: string | null, bio?: string | null, connection?: Types.ConnectionType | null, userStatus?: string | null, userType?: Types.NoumenaUserType | null, createdAt?: any | null, updatedAt?: any | null, isAcceptedSkipMediaTesting?: boolean | null, citizenship?: string | null, SocialHallTCAccepted?: boolean | null, status?: string | null, unreadConnectionCount?: number | null, referralCode?: string | null, profileUrl?: string | null, userOwnReferralCode?: string | null, kycResult?: string | null, creditCheckResult?: string | null, lastLoginAt?: any | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, ageGroup?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, freelancingExperience?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, visibility?: { __typename?: 'UserOutputVisibility', email?: string | null, phone?: string | null, location?: string | null } | null, visibleTo?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null, connections?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null, roles?: Array<{ __typename?: 'UserRoleOutput', _id: string, roleType?: string | null, permissions?: Array<string | null> | null } | null> | null, metadata?: Array<{ __typename?: 'LogsOutput', additionalInfo?: string | null, reason?: string | null, moreInfo?: string | null, statusTo?: string | null, statusFrom?: string | null, changeOn?: any | null, changedBy?: string | null, changedByDetails?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null, type?: string | null, name?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, skills?: Array<{ __typename?: 'Skill', _id: string, name: string, icon: string } | null> | null } | null> | null }, user?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, location?: string | null, bio?: string | null, connection?: Types.ConnectionType | null, userStatus?: string | null, userType?: Types.NoumenaUserType | null, createdAt?: any | null, updatedAt?: any | null, isAcceptedSkipMediaTesting?: boolean | null, citizenship?: string | null, SocialHallTCAccepted?: boolean | null, status?: string | null, unreadConnectionCount?: number | null, referralCode?: string | null, profileUrl?: string | null, userOwnReferralCode?: string | null, kycResult?: string | null, creditCheckResult?: string | null, lastLoginAt?: any | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, ageGroup?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, freelancingExperience?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, visibility?: { __typename?: 'UserOutputVisibility', email?: string | null, phone?: string | null, location?: string | null } | null, visibleTo?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null, connections?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null, roles?: Array<{ __typename?: 'UserRoleOutput', _id: string, roleType?: string | null, permissions?: Array<string | null> | null } | null> | null, metadata?: Array<{ __typename?: 'LogsOutput', additionalInfo?: string | null, reason?: string | null, moreInfo?: string | null, statusTo?: string | null, statusFrom?: string | null, changeOn?: any | null, changedBy?: string | null, changedByDetails?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null, type?: string | null, name?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, skills?: Array<{ __typename?: 'Skill', _id: string, name: string, icon: string } | null> | null } | null };


export const AllUsersWithOwnerDocument = gql`
    query allUsersWithOwner($filter: SearchUserFilter, $limit: Int, $offset: Int, $search: String, $type: UserRelationType, $activeUserOnly: Boolean, $chamberId: ID, $ownerID: ID!, $oldConnectionFlow: Boolean) {
  allUsers(
    filter: $filter
    limit: $limit
    offset: $offset
    search: $search
    type: $type
    activeUserOnly: $activeUserOnly
    chamberId: $chamberId
    oldConnectionFlow: $oldConnectionFlow
  ) {
    count
    data {
      ...UserOutput
    }
  }
  user(_id: $ownerID) {
    ...UserOutput
  }
}
    ${UserOutputFragmentDoc}`;

/**
 * __useAllUsersWithOwnerQuery__
 *
 * To run a query within a React component, call `useAllUsersWithOwnerQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersWithOwnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersWithOwnerQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      search: // value for 'search'
 *      type: // value for 'type'
 *      activeUserOnly: // value for 'activeUserOnly'
 *      chamberId: // value for 'chamberId'
 *      ownerID: // value for 'ownerID'
 *      oldConnectionFlow: // value for 'oldConnectionFlow'
 *   },
 * });
 */
export function useAllUsersWithOwnerQuery(baseOptions: Apollo.QueryHookOptions<AllUsersWithOwnerQuery, AllUsersWithOwnerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllUsersWithOwnerQuery, AllUsersWithOwnerQueryVariables>(AllUsersWithOwnerDocument, options);
      }
export function useAllUsersWithOwnerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUsersWithOwnerQuery, AllUsersWithOwnerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllUsersWithOwnerQuery, AllUsersWithOwnerQueryVariables>(AllUsersWithOwnerDocument, options);
        }
export type AllUsersWithOwnerQueryHookResult = ReturnType<typeof useAllUsersWithOwnerQuery>;
export type AllUsersWithOwnerLazyQueryHookResult = ReturnType<typeof useAllUsersWithOwnerLazyQuery>;
export type AllUsersWithOwnerQueryResult = Apollo.QueryResult<AllUsersWithOwnerQuery, AllUsersWithOwnerQueryVariables>;