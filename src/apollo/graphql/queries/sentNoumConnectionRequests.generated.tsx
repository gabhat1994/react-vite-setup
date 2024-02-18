/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumPendingConnectionFragmentDoc } from '../fragments/noumPendingConnection.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SentNoumConnectionRequestsQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type SentNoumConnectionRequestsQuery = { __typename?: 'Query', sentNoumConnectionRequests: { __typename?: 'PaginatedNoumPendingConnections', count: number, data: Array<{ __typename?: 'NoumPendingConnection', _id: string, type: Types.NoumPendingConnectionType, requestedAt: any, user: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null }, noum: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImage?: string | null, type?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } }> } };


export const SentNoumConnectionRequestsDocument = gql`
    query sentNoumConnectionRequests($limit: Int, $offset: Int) {
  sentNoumConnectionRequests(input: {limit: $limit, offset: $offset}) {
    count
    data {
      ...NoumPendingConnection
    }
  }
}
    ${NoumPendingConnectionFragmentDoc}`;

/**
 * __useSentNoumConnectionRequestsQuery__
 *
 * To run a query within a React component, call `useSentNoumConnectionRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSentNoumConnectionRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSentNoumConnectionRequestsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useSentNoumConnectionRequestsQuery(baseOptions?: Apollo.QueryHookOptions<SentNoumConnectionRequestsQuery, SentNoumConnectionRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SentNoumConnectionRequestsQuery, SentNoumConnectionRequestsQueryVariables>(SentNoumConnectionRequestsDocument, options);
      }
export function useSentNoumConnectionRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SentNoumConnectionRequestsQuery, SentNoumConnectionRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SentNoumConnectionRequestsQuery, SentNoumConnectionRequestsQueryVariables>(SentNoumConnectionRequestsDocument, options);
        }
export type SentNoumConnectionRequestsQueryHookResult = ReturnType<typeof useSentNoumConnectionRequestsQuery>;
export type SentNoumConnectionRequestsLazyQueryHookResult = ReturnType<typeof useSentNoumConnectionRequestsLazyQuery>;
export type SentNoumConnectionRequestsQueryResult = Apollo.QueryResult<SentNoumConnectionRequestsQuery, SentNoumConnectionRequestsQueryVariables>;