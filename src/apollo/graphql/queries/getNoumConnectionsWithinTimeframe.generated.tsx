/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNoumConnectionsWithinTimeframeQueryVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
  from?: Types.InputMaybe<Types.Scalars['ISODate']>;
  to?: Types.InputMaybe<Types.Scalars['ISODate']>;
  connectionType?: Types.InputMaybe<Types.NoumConnectionsWithinTimeframeType>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetNoumConnectionsWithinTimeframeQuery = { __typename?: 'Query', getNoumConnectionsWithinTimeframe?: { __typename?: 'SpaceOutputResponse', count?: number | null, data?: Array<{ __typename?: 'SpaceOutput', _id?: string | null, type?: string | null, name?: string | null, approvedAt?: any | null, updatedAt?: any | null, requestedAt?: any | null, lastUpdatedAt?: any | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, email?: string | null, title?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null } | null> | null } | null };


export const GetNoumConnectionsWithinTimeframeDocument = gql`
    query getNoumConnectionsWithinTimeframe($noumId: ID!, $from: ISODate, $to: ISODate, $connectionType: NoumConnectionsWithinTimeframeType, $offset: Int, $limit: Int) {
  getNoumConnectionsWithinTimeframe(
    noumId: $noumId
    from: $from
    to: $to
    connectionType: $connectionType
    offset: $offset
    limit: $limit
  ) {
    data {
      _id
      type
      name
      approvedAt
      updatedAt
      requestedAt
      uid {
        _id
        firstName
        middleName
        lastName
        email
        title
        profile {
          profilePicture
          profilePictureThumbnail
        }
        chamber {
          _id
          userId
        }
        userStatus
      }
      lastUpdatedAt
    }
    count
  }
}
    `;

/**
 * __useGetNoumConnectionsWithinTimeframeQuery__
 *
 * To run a query within a React component, call `useGetNoumConnectionsWithinTimeframeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumConnectionsWithinTimeframeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumConnectionsWithinTimeframeQuery({
 *   variables: {
 *      noumId: // value for 'noumId'
 *      from: // value for 'from'
 *      to: // value for 'to'
 *      connectionType: // value for 'connectionType'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetNoumConnectionsWithinTimeframeQuery(baseOptions: Apollo.QueryHookOptions<GetNoumConnectionsWithinTimeframeQuery, GetNoumConnectionsWithinTimeframeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumConnectionsWithinTimeframeQuery, GetNoumConnectionsWithinTimeframeQueryVariables>(GetNoumConnectionsWithinTimeframeDocument, options);
      }
export function useGetNoumConnectionsWithinTimeframeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumConnectionsWithinTimeframeQuery, GetNoumConnectionsWithinTimeframeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumConnectionsWithinTimeframeQuery, GetNoumConnectionsWithinTimeframeQueryVariables>(GetNoumConnectionsWithinTimeframeDocument, options);
        }
export type GetNoumConnectionsWithinTimeframeQueryHookResult = ReturnType<typeof useGetNoumConnectionsWithinTimeframeQuery>;
export type GetNoumConnectionsWithinTimeframeLazyQueryHookResult = ReturnType<typeof useGetNoumConnectionsWithinTimeframeLazyQuery>;
export type GetNoumConnectionsWithinTimeframeQueryResult = Apollo.QueryResult<GetNoumConnectionsWithinTimeframeQuery, GetNoumConnectionsWithinTimeframeQueryVariables>;