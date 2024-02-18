/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumPendingConnectionFragmentDoc } from '../fragments/noumPendingConnection.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ReceivedNoumConnectionInvitesQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ReceivedNoumConnectionInvitesQuery = { __typename?: 'Query', receivedNoumConnectionInvites: { __typename?: 'PaginatedNoumPendingConnections', count: number, data: Array<{ __typename?: 'NoumPendingConnection', _id: string, type: Types.NoumPendingConnectionType, requestedAt: any, user: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null }, noum: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImage?: string | null, type?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } }> } };


export const ReceivedNoumConnectionInvitesDocument = gql`
    query receivedNoumConnectionInvites($limit: Int, $offset: Int) {
  receivedNoumConnectionInvites(input: {limit: $limit, offset: $offset}) {
    count
    data {
      ...NoumPendingConnection
    }
  }
}
    ${NoumPendingConnectionFragmentDoc}`;

/**
 * __useReceivedNoumConnectionInvitesQuery__
 *
 * To run a query within a React component, call `useReceivedNoumConnectionInvitesQuery` and pass it any options that fit your needs.
 * When your component renders, `useReceivedNoumConnectionInvitesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReceivedNoumConnectionInvitesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useReceivedNoumConnectionInvitesQuery(baseOptions?: Apollo.QueryHookOptions<ReceivedNoumConnectionInvitesQuery, ReceivedNoumConnectionInvitesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReceivedNoumConnectionInvitesQuery, ReceivedNoumConnectionInvitesQueryVariables>(ReceivedNoumConnectionInvitesDocument, options);
      }
export function useReceivedNoumConnectionInvitesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReceivedNoumConnectionInvitesQuery, ReceivedNoumConnectionInvitesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReceivedNoumConnectionInvitesQuery, ReceivedNoumConnectionInvitesQueryVariables>(ReceivedNoumConnectionInvitesDocument, options);
        }
export type ReceivedNoumConnectionInvitesQueryHookResult = ReturnType<typeof useReceivedNoumConnectionInvitesQuery>;
export type ReceivedNoumConnectionInvitesLazyQueryHookResult = ReturnType<typeof useReceivedNoumConnectionInvitesLazyQuery>;
export type ReceivedNoumConnectionInvitesQueryResult = Apollo.QueryResult<ReceivedNoumConnectionInvitesQuery, ReceivedNoumConnectionInvitesQueryVariables>;