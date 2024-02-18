/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumMemberForUserMembersFragmentDoc } from '../fragments/noumMember.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserMembersQueryVariables = Types.Exact<{
  status?: Types.InputMaybe<Types.NoumMemberStatus>;
  statuses?: Types.InputMaybe<Array<Types.NoumMemberStatus> | Types.NoumMemberStatus>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type UserMembersQuery = { __typename?: 'Query', userMembers: { __typename?: 'PaginatedNoumMembers', count: number, data: Array<{ __typename?: 'NoumMember', _id: string, requestedAt?: any | null, user?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, noum?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImage?: string | null, type?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null }> } };


export const UserMembersDocument = gql`
    query userMembers($status: NoumMemberStatus, $statuses: [NoumMemberStatus!], $limit: Int, $offset: Int) {
  userMembers(
    input: {status: $status, statuses: $statuses, limit: $limit, offset: $offset}
  ) {
    count
    data {
      ...NoumMemberForUserMembers
    }
  }
}
    ${NoumMemberForUserMembersFragmentDoc}`;

/**
 * __useUserMembersQuery__
 *
 * To run a query within a React component, call `useUserMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserMembersQuery({
 *   variables: {
 *      status: // value for 'status'
 *      statuses: // value for 'statuses'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useUserMembersQuery(baseOptions?: Apollo.QueryHookOptions<UserMembersQuery, UserMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserMembersQuery, UserMembersQueryVariables>(UserMembersDocument, options);
      }
export function useUserMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserMembersQuery, UserMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserMembersQuery, UserMembersQueryVariables>(UserMembersDocument, options);
        }
export type UserMembersQueryHookResult = ReturnType<typeof useUserMembersQuery>;
export type UserMembersLazyQueryHookResult = ReturnType<typeof useUserMembersLazyQuery>;
export type UserMembersQueryResult = Apollo.QueryResult<UserMembersQuery, UserMembersQueryVariables>;