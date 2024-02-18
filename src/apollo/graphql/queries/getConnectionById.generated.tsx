/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SpaceConnectionBasicFragmentDoc } from '../fragments/spaceOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetConnectionByIdQueryVariables = Types.Exact<{
  connectionId: Types.Scalars['ID'];
}>;


export type GetConnectionByIdQuery = { __typename?: 'Query', getConnectionById?: { __typename?: 'SpaceConnection', _id?: string | null, status?: Types.ConnectionRequestTypeEnum | null, type?: Types.ConnectionTypeEnum | null, message?: string | null, approvedAt?: string | null, permission?: Types.ConnectionPermissionTypeEnum | null, requestTo?: { __typename?: 'SpaceOutput', _id?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, requestFrom?: { __typename?: 'SpaceOutput', _id?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, draft?: { __typename?: 'SpaceConnectionDraft', permission?: Types.ConnectionPermissionTypeEnum | null } | null } | null };


export const GetConnectionByIdDocument = gql`
    query getConnectionById($connectionId: ID!) {
  getConnectionById(connectionId: $connectionId) {
    ...SpaceConnectionBasic
  }
}
    ${SpaceConnectionBasicFragmentDoc}`;

/**
 * __useGetConnectionByIdQuery__
 *
 * To run a query within a React component, call `useGetConnectionByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConnectionByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConnectionByIdQuery({
 *   variables: {
 *      connectionId: // value for 'connectionId'
 *   },
 * });
 */
export function useGetConnectionByIdQuery(baseOptions: Apollo.QueryHookOptions<GetConnectionByIdQuery, GetConnectionByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConnectionByIdQuery, GetConnectionByIdQueryVariables>(GetConnectionByIdDocument, options);
      }
export function useGetConnectionByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConnectionByIdQuery, GetConnectionByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConnectionByIdQuery, GetConnectionByIdQueryVariables>(GetConnectionByIdDocument, options);
        }
export type GetConnectionByIdQueryHookResult = ReturnType<typeof useGetConnectionByIdQuery>;
export type GetConnectionByIdLazyQueryHookResult = ReturnType<typeof useGetConnectionByIdLazyQuery>;
export type GetConnectionByIdQueryResult = Apollo.QueryResult<GetConnectionByIdQuery, GetConnectionByIdQueryVariables>;