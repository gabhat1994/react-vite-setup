/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumUserConnectionStateFragmentDoc } from '../fragments/spaceOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNoumUserConnectionStateQueryVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
  userHomeNoumId: Types.Scalars['ID'];
}>;


export type GetNoumUserConnectionStateQuery = { __typename?: 'Query', getSpaceById?: { __typename?: 'SpaceOutput', _id?: string | null, isFollowing?: boolean | null, connectionRole?: string | null, connectionId?: string | null, isConnected?: boolean | null, connectionWithNoum?: { __typename?: 'SpaceConnection', _id?: string | null, status?: Types.ConnectionRequestTypeEnum | null, type?: Types.ConnectionTypeEnum | null, message?: string | null, approvedAt?: string | null, permission?: Types.ConnectionPermissionTypeEnum | null, requestTo?: { __typename?: 'SpaceOutput', _id?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, requestFrom?: { __typename?: 'SpaceOutput', _id?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, draft?: { __typename?: 'SpaceConnectionDraft', permission?: Types.ConnectionPermissionTypeEnum | null } | null } | null, membershipStatus?: { __typename?: 'NoumMembershipStatus', _id: string, status: Types.NoumMemberStatus, connectedAt?: any | null, role: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null }, invitationSentFrom?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, rolePromotionToApprove?: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null } | null, activeInvitation?: { __typename?: 'ActiveNoumInvitation', _id: string, invitedAt: any } | null } | null };


export const GetNoumUserConnectionStateDocument = gql`
    query GetNoumUserConnectionState($noumId: ID!, $userHomeNoumId: ID!) {
  getSpaceById(id: $noumId) {
    _id
    ...NoumUserConnectionState
  }
}
    ${NoumUserConnectionStateFragmentDoc}`;

/**
 * __useGetNoumUserConnectionStateQuery__
 *
 * To run a query within a React component, call `useGetNoumUserConnectionStateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumUserConnectionStateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumUserConnectionStateQuery({
 *   variables: {
 *      noumId: // value for 'noumId'
 *      userHomeNoumId: // value for 'userHomeNoumId'
 *   },
 * });
 */
export function useGetNoumUserConnectionStateQuery(baseOptions: Apollo.QueryHookOptions<GetNoumUserConnectionStateQuery, GetNoumUserConnectionStateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumUserConnectionStateQuery, GetNoumUserConnectionStateQueryVariables>(GetNoumUserConnectionStateDocument, options);
      }
export function useGetNoumUserConnectionStateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumUserConnectionStateQuery, GetNoumUserConnectionStateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumUserConnectionStateQuery, GetNoumUserConnectionStateQueryVariables>(GetNoumUserConnectionStateDocument, options);
        }
export type GetNoumUserConnectionStateQueryHookResult = ReturnType<typeof useGetNoumUserConnectionStateQuery>;
export type GetNoumUserConnectionStateLazyQueryHookResult = ReturnType<typeof useGetNoumUserConnectionStateLazyQuery>;
export type GetNoumUserConnectionStateQueryResult = Apollo.QueryResult<GetNoumUserConnectionStateQuery, GetNoumUserConnectionStateQueryVariables>;