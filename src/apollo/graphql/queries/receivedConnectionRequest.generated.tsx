/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ReceivedConnectionRequestQueryVariables = Types.Exact<{
  status?: Types.InputMaybe<Types.ConnectionRequestStatus>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  spaceId?: Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type ReceivedConnectionRequestQuery = { __typename?: 'Query', receivedConnectionRequest?: { __typename?: 'ConnectionOutputResponse', count?: number | null, data?: Array<{ __typename?: 'SpaceConnection', _id?: string | null, status?: Types.ConnectionRequestTypeEnum | null, message?: string | null, requestedAt?: string | null, requestTo?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, title?: string | null, type?: string | null, profileImage?: string | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null } | null, requestFrom?: { __typename?: 'SpaceOutput', _id?: string | null, title?: string | null, type?: string | null, institution?: string | null, profileImage?: string | null, name?: string | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, title?: string | null, status?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null, profilePictureThumbnail?: string | null } | null } | null } | null } | null> | null } | null };


export const ReceivedConnectionRequestDocument = gql`
    query receivedConnectionRequest($status: ConnectionRequestStatus, $limit: Int, $offset: Int, $spaceId: ID) {
  receivedConnectionRequest(
    status: $status
    limit: $limit
    offset: $offset
    spaceId: $spaceId
  ) {
    data {
      _id
      status
      message
      requestedAt
      requestTo {
        _id
        name
        title
        type
        profileImage
        category {
          _id
          name
        }
      }
      requestFrom {
        _id
        title
        type
        institution
        profileImage
        name
        category {
          _id
          name
        }
        uid {
          _id
          firstName
          middleName
          lastName
          title
          profile {
            profilePicture
            profilePictureThumbnail
          }
          status
          userStatus
        }
      }
    }
    count
  }
}
    `;

/**
 * __useReceivedConnectionRequestQuery__
 *
 * To run a query within a React component, call `useReceivedConnectionRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useReceivedConnectionRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReceivedConnectionRequestQuery({
 *   variables: {
 *      status: // value for 'status'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useReceivedConnectionRequestQuery(baseOptions?: Apollo.QueryHookOptions<ReceivedConnectionRequestQuery, ReceivedConnectionRequestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReceivedConnectionRequestQuery, ReceivedConnectionRequestQueryVariables>(ReceivedConnectionRequestDocument, options);
      }
export function useReceivedConnectionRequestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReceivedConnectionRequestQuery, ReceivedConnectionRequestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReceivedConnectionRequestQuery, ReceivedConnectionRequestQueryVariables>(ReceivedConnectionRequestDocument, options);
        }
export type ReceivedConnectionRequestQueryHookResult = ReturnType<typeof useReceivedConnectionRequestQuery>;
export type ReceivedConnectionRequestLazyQueryHookResult = ReturnType<typeof useReceivedConnectionRequestLazyQuery>;
export type ReceivedConnectionRequestQueryResult = Apollo.QueryResult<ReceivedConnectionRequestQuery, ReceivedConnectionRequestQueryVariables>;