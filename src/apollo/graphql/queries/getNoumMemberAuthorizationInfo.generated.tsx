/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumAuthorizationFragmentDoc } from '../fragments/noumAuthorization.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNoumMemberAuthorizationInfoQueryVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
}>;


export type GetNoumMemberAuthorizationInfoQuery = { __typename?: 'Query', getSpaceById?: { __typename?: 'SpaceOutput', _id?: string | null, assignedRole?: { __typename?: 'NoumRole', _id: string, name: string, isDefault: boolean, status: Types.NoumRoleStatus, groupedPermissions: Array<{ __typename?: 'NoumRolePermissionGroup', level: Types.NoumRolePermissionLevel, elementType?: Types.PermissibleElementType | null, permissions: Array<{ __typename?: 'NoumRolePermissionItem', id: string, isActive: boolean }> }> } | null } | null };


export const GetNoumMemberAuthorizationInfoDocument = gql`
    query GetNoumMemberAuthorizationInfo($noumId: ID!) {
  getSpaceById(id: $noumId) {
    ...NoumAuthorization
  }
}
    ${NoumAuthorizationFragmentDoc}`;

/**
 * __useGetNoumMemberAuthorizationInfoQuery__
 *
 * To run a query within a React component, call `useGetNoumMemberAuthorizationInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumMemberAuthorizationInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumMemberAuthorizationInfoQuery({
 *   variables: {
 *      noumId: // value for 'noumId'
 *   },
 * });
 */
export function useGetNoumMemberAuthorizationInfoQuery(baseOptions: Apollo.QueryHookOptions<GetNoumMemberAuthorizationInfoQuery, GetNoumMemberAuthorizationInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumMemberAuthorizationInfoQuery, GetNoumMemberAuthorizationInfoQueryVariables>(GetNoumMemberAuthorizationInfoDocument, options);
      }
export function useGetNoumMemberAuthorizationInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumMemberAuthorizationInfoQuery, GetNoumMemberAuthorizationInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumMemberAuthorizationInfoQuery, GetNoumMemberAuthorizationInfoQueryVariables>(GetNoumMemberAuthorizationInfoDocument, options);
        }
export type GetNoumMemberAuthorizationInfoQueryHookResult = ReturnType<typeof useGetNoumMemberAuthorizationInfoQuery>;
export type GetNoumMemberAuthorizationInfoLazyQueryHookResult = ReturnType<typeof useGetNoumMemberAuthorizationInfoLazyQuery>;
export type GetNoumMemberAuthorizationInfoQueryResult = Apollo.QueryResult<GetNoumMemberAuthorizationInfoQuery, GetNoumMemberAuthorizationInfoQueryVariables>;