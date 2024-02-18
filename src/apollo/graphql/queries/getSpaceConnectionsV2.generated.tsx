/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSpaceConnectionsV2QueryVariables = Types.Exact<{
  spaceId: Types.Scalars['ID'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  status?: Types.InputMaybe<Array<Types.InputMaybe<Types.ConnectionRequestTypeEnum>> | Types.InputMaybe<Types.ConnectionRequestTypeEnum>>;
}>;


export type GetSpaceConnectionsV2Query = { __typename?: 'Query', getSpaceConnectionsV2?: { __typename?: 'SpaceConnectionsResponse', count?: number | null, data?: Array<{ __typename?: 'SpaceConnection', _id?: string | null, requestedAt?: string | null, approvedAt?: string | null, status?: Types.ConnectionRequestTypeEnum | null, type?: Types.ConnectionTypeEnum | null, permission?: Types.ConnectionPermissionTypeEnum | null, draft?: { __typename?: 'SpaceConnectionDraft', permission?: Types.ConnectionPermissionTypeEnum | null } | null, requestTo?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, projectType?: string | null, permission?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, userStatus?: string | null, email?: string | null, title?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, type?: string | null, name?: string | null, userId?: string | null } | null } | null } | null, requestFrom?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, projectType?: string | null, permission?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, email?: string | null, title?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, type?: string | null, name?: string | null, userId?: string | null } | null } | null } | null } | null> | null } | null };


export const GetSpaceConnectionsV2Document = gql`
    query getSpaceConnectionsV2($spaceId: ID!, $limit: Int, $offset: Int, $status: [ConnectionRequestTypeEnum]) {
  getSpaceConnectionsV2(
    spaceId: $spaceId
    limit: $limit
    offset: $offset
    status: $status
  ) {
    count
    data {
      _id
      requestedAt
      approvedAt
      status
      type
      permission
      draft {
        permission
      }
      status
      requestTo {
        _id
        name
        projectType
        permission
        uid {
          _id
          firstName
          middleName
          lastName
          userStatus
          email
          title
          profile {
            profilePicture
            profilePictureThumbnail
          }
          chamber {
            _id
            type
            name
            userId
          }
        }
      }
      requestFrom {
        _id
        name
        projectType
        permission
        uid {
          _id
          firstName
          middleName
          lastName
          email
          title
          userStatus
          profile {
            profilePicture
            profilePictureThumbnail
          }
          chamber {
            _id
            type
            name
            userId
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetSpaceConnectionsV2Query__
 *
 * To run a query within a React component, call `useGetSpaceConnectionsV2Query` and pass it any options that fit your needs.
 * When your component renders, `useGetSpaceConnectionsV2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpaceConnectionsV2Query({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetSpaceConnectionsV2Query(baseOptions: Apollo.QueryHookOptions<GetSpaceConnectionsV2Query, GetSpaceConnectionsV2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSpaceConnectionsV2Query, GetSpaceConnectionsV2QueryVariables>(GetSpaceConnectionsV2Document, options);
      }
export function useGetSpaceConnectionsV2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSpaceConnectionsV2Query, GetSpaceConnectionsV2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSpaceConnectionsV2Query, GetSpaceConnectionsV2QueryVariables>(GetSpaceConnectionsV2Document, options);
        }
export type GetSpaceConnectionsV2QueryHookResult = ReturnType<typeof useGetSpaceConnectionsV2Query>;
export type GetSpaceConnectionsV2LazyQueryHookResult = ReturnType<typeof useGetSpaceConnectionsV2LazyQuery>;
export type GetSpaceConnectionsV2QueryResult = Apollo.QueryResult<GetSpaceConnectionsV2Query, GetSpaceConnectionsV2QueryVariables>;