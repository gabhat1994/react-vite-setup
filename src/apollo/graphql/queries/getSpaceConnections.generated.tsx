/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SpaceConnectionForNotificationFragmentDoc } from '../fragments/spaceOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSpaceConnectionsQueryVariables = Types.Exact<{
  spaceId: Types.Scalars['ID'];
  status?: Types.InputMaybe<Types.ConnectionRequestTypeEnum>;
}>;


export type GetSpaceConnectionsQuery = { __typename?: 'Query', getSpaceConnections?: Array<{ __typename?: 'SpaceConnection', requestedAt?: string | null, _id?: string | null, status?: Types.ConnectionRequestTypeEnum | null, type?: Types.ConnectionTypeEnum | null, message?: string | null, approvedAt?: string | null, permission?: Types.ConnectionPermissionTypeEnum | null, requestTo?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, projectType?: string | null, permission?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null, type?: string | null, name?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null } | null } | null, requestFrom?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, projectType?: string | null, permission?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null, type?: string | null, name?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null } | null } | null, draft?: { __typename?: 'SpaceConnectionDraft', permission?: Types.ConnectionPermissionTypeEnum | null } | null } | null> | null };


export const GetSpaceConnectionsDocument = gql`
    query getSpaceConnections($spaceId: ID!, $status: ConnectionRequestTypeEnum) {
  getSpaceConnections(spaceId: $spaceId, status: $status) {
    ...SpaceConnectionForNotification
  }
}
    ${SpaceConnectionForNotificationFragmentDoc}`;

/**
 * __useGetSpaceConnectionsQuery__
 *
 * To run a query within a React component, call `useGetSpaceConnectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpaceConnectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpaceConnectionsQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetSpaceConnectionsQuery(baseOptions: Apollo.QueryHookOptions<GetSpaceConnectionsQuery, GetSpaceConnectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSpaceConnectionsQuery, GetSpaceConnectionsQueryVariables>(GetSpaceConnectionsDocument, options);
      }
export function useGetSpaceConnectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSpaceConnectionsQuery, GetSpaceConnectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSpaceConnectionsQuery, GetSpaceConnectionsQueryVariables>(GetSpaceConnectionsDocument, options);
        }
export type GetSpaceConnectionsQueryHookResult = ReturnType<typeof useGetSpaceConnectionsQuery>;
export type GetSpaceConnectionsLazyQueryHookResult = ReturnType<typeof useGetSpaceConnectionsLazyQuery>;
export type GetSpaceConnectionsQueryResult = Apollo.QueryResult<GetSpaceConnectionsQuery, GetSpaceConnectionsQueryVariables>;