/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumMemberWithInvitationFragmentDoc } from '../fragments/noumMember.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNoumMembersQueryVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  input?: Types.InputMaybe<Types.SearchMembersInput>;
}>;


export type GetNoumMembersQuery = { __typename?: 'Query', getSpaceById?: { __typename?: 'SpaceOutput', _id?: string | null, members?: { __typename?: 'PaginatedNoumMembers', count: number, data: Array<{ __typename?: 'NoumMember', _id: string, noumId: string, status: Types.NoumMemberStatus, connectedAt?: any | null, updatedAt?: any | null, requestedAt?: any | null, activeRequest?: { __typename?: 'NoumConnectionRequest', _id: string, requestedAt: any, user?: { __typename?: 'UserOutput', _id: string } | null } | null, activeInvitation?: { __typename?: 'ActiveNoumInvitation', _id: string, invitedAt: any } | null, user?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, noum?: { __typename?: 'SpaceOutput', _id?: string | null, type?: string | null } | null, role: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null }, previousRole?: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, rolePromotionToApprove?: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null }> } | null } | null };

export type GetNoumMembersCountQueryVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  input?: Types.InputMaybe<Types.SearchMembersInput>;
}>;


export type GetNoumMembersCountQuery = { __typename?: 'Query', getSpaceById?: { __typename?: 'SpaceOutput', _id?: string | null, members?: { __typename?: 'PaginatedNoumMembers', count: number } | null } | null };


export const GetNoumMembersDocument = gql`
    query GetNoumMembers($noumId: ID!, $limit: Int, $offset: Int, $input: SearchMembersInput) {
  getSpaceById(id: $noumId) {
    _id
    members(limit: $limit, offset: $offset, input: $input) {
      count
      data {
        ...NoumMemberWithInvitation
      }
    }
  }
}
    ${NoumMemberWithInvitationFragmentDoc}`;

/**
 * __useGetNoumMembersQuery__
 *
 * To run a query within a React component, call `useGetNoumMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumMembersQuery({
 *   variables: {
 *      noumId: // value for 'noumId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetNoumMembersQuery(baseOptions: Apollo.QueryHookOptions<GetNoumMembersQuery, GetNoumMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumMembersQuery, GetNoumMembersQueryVariables>(GetNoumMembersDocument, options);
      }
export function useGetNoumMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumMembersQuery, GetNoumMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumMembersQuery, GetNoumMembersQueryVariables>(GetNoumMembersDocument, options);
        }
export type GetNoumMembersQueryHookResult = ReturnType<typeof useGetNoumMembersQuery>;
export type GetNoumMembersLazyQueryHookResult = ReturnType<typeof useGetNoumMembersLazyQuery>;
export type GetNoumMembersQueryResult = Apollo.QueryResult<GetNoumMembersQuery, GetNoumMembersQueryVariables>;
export const GetNoumMembersCountDocument = gql`
    query getNoumMembersCount($noumId: ID!, $limit: Int, $offset: Int, $input: SearchMembersInput) {
  getSpaceById(id: $noumId) {
    _id
    members(limit: $limit, offset: $offset, input: $input) {
      count
    }
  }
}
    `;

/**
 * __useGetNoumMembersCountQuery__
 *
 * To run a query within a React component, call `useGetNoumMembersCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumMembersCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumMembersCountQuery({
 *   variables: {
 *      noumId: // value for 'noumId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetNoumMembersCountQuery(baseOptions: Apollo.QueryHookOptions<GetNoumMembersCountQuery, GetNoumMembersCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumMembersCountQuery, GetNoumMembersCountQueryVariables>(GetNoumMembersCountDocument, options);
      }
export function useGetNoumMembersCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumMembersCountQuery, GetNoumMembersCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumMembersCountQuery, GetNoumMembersCountQueryVariables>(GetNoumMembersCountDocument, options);
        }
export type GetNoumMembersCountQueryHookResult = ReturnType<typeof useGetNoumMembersCountQuery>;
export type GetNoumMembersCountLazyQueryHookResult = ReturnType<typeof useGetNoumMembersCountLazyQuery>;
export type GetNoumMembersCountQueryResult = Apollo.QueryResult<GetNoumMembersCountQuery, GetNoumMembersCountQueryVariables>;