/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumMemberWithInvitationFragmentDoc } from '../fragments/noumMember.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type NoumMemberQueryVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
  memberId: Types.Scalars['ID'];
}>;


export type NoumMemberQuery = { __typename?: 'Query', noumMember?: { __typename?: 'NoumMember', _id: string, noumId: string, status: Types.NoumMemberStatus, connectedAt?: any | null, updatedAt?: any | null, requestedAt?: any | null, activeRequest?: { __typename?: 'NoumConnectionRequest', _id: string, requestedAt: any, user?: { __typename?: 'UserOutput', _id: string } | null } | null, activeInvitation?: { __typename?: 'ActiveNoumInvitation', _id: string, invitedAt: any } | null, user?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, noum?: { __typename?: 'SpaceOutput', _id?: string | null, type?: string | null } | null, role: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null }, previousRole?: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, rolePromotionToApprove?: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null } | null };


export const NoumMemberDocument = gql`
    query noumMember($noumId: ID!, $memberId: ID!) {
  noumMember(memberId: $memberId) {
    ...NoumMemberWithInvitation
  }
}
    ${NoumMemberWithInvitationFragmentDoc}`;

/**
 * __useNoumMemberQuery__
 *
 * To run a query within a React component, call `useNoumMemberQuery` and pass it any options that fit your needs.
 * When your component renders, `useNoumMemberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNoumMemberQuery({
 *   variables: {
 *      noumId: // value for 'noumId'
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useNoumMemberQuery(baseOptions: Apollo.QueryHookOptions<NoumMemberQuery, NoumMemberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NoumMemberQuery, NoumMemberQueryVariables>(NoumMemberDocument, options);
      }
export function useNoumMemberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NoumMemberQuery, NoumMemberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NoumMemberQuery, NoumMemberQueryVariables>(NoumMemberDocument, options);
        }
export type NoumMemberQueryHookResult = ReturnType<typeof useNoumMemberQuery>;
export type NoumMemberLazyQueryHookResult = ReturnType<typeof useNoumMemberLazyQuery>;
export type NoumMemberQueryResult = Apollo.QueryResult<NoumMemberQuery, NoumMemberQueryVariables>;