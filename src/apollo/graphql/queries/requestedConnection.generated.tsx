/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RequestedConnectionQueryVariables = Types.Exact<{
  status?: Types.InputMaybe<Types.ConnectionRequestStatus>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  requestFrom?: Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type RequestedConnectionQuery = { __typename?: 'Query', requestedConnection?: { __typename?: 'ConnectionOutputResponse', count?: number | null, data?: Array<{ __typename?: 'SpaceConnection', requestedAt?: string | null, _id?: string | null, connectionId?: string | null, requestTo?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, type?: string | null, profileImage?: string | null, uid?: { __typename?: 'UserOutput', firstName?: string | null, title?: string | null, lastName?: string | null, _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePictureThumbnail?: string | null, profilePicture?: string | null } | null } | null } | null, requestFrom?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, type?: string | null, profileImage?: string | null, uid?: { __typename?: 'UserOutput', firstName?: string | null, title?: string | null, lastName?: string | null, _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePictureThumbnail?: string | null, profilePicture?: string | null } | null } | null } | null } | null> | null } | null };


export const RequestedConnectionDocument = gql`
    query requestedConnection($status: ConnectionRequestStatus, $limit: Int, $offset: Int, $requestFrom: ID) {
  requestedConnection(
    status: $status
    limit: $limit
    offset: $offset
    requestFrom: $requestFrom
  ) {
    count
    data {
      requestedAt
      connectionId: _id
      requestTo {
        _id
        name
        type
        profileImage
        uid {
          firstName
          title
          lastName
          _id
          userStatus
          profile {
            profilePictureThumbnail
            profilePicture
          }
        }
      }
      requestFrom {
        _id
        name
        type
        profileImage
        uid {
          firstName
          title
          lastName
          _id
          userStatus
          profile {
            profilePictureThumbnail
            profilePicture
          }
        }
      }
      _id
    }
  }
}
    `;

/**
 * __useRequestedConnectionQuery__
 *
 * To run a query within a React component, call `useRequestedConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useRequestedConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRequestedConnectionQuery({
 *   variables: {
 *      status: // value for 'status'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      requestFrom: // value for 'requestFrom'
 *   },
 * });
 */
export function useRequestedConnectionQuery(baseOptions?: Apollo.QueryHookOptions<RequestedConnectionQuery, RequestedConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RequestedConnectionQuery, RequestedConnectionQueryVariables>(RequestedConnectionDocument, options);
      }
export function useRequestedConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RequestedConnectionQuery, RequestedConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RequestedConnectionQuery, RequestedConnectionQueryVariables>(RequestedConnectionDocument, options);
        }
export type RequestedConnectionQueryHookResult = ReturnType<typeof useRequestedConnectionQuery>;
export type RequestedConnectionLazyQueryHookResult = ReturnType<typeof useRequestedConnectionLazyQuery>;
export type RequestedConnectionQueryResult = Apollo.QueryResult<RequestedConnectionQuery, RequestedConnectionQueryVariables>;