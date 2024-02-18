/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumRoleForDropdownFragmentDoc, NoumRoleForInfoFragmentDoc } from '../fragments/noumMember.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNoumRolesQueryVariables = Types.Exact<{
  limit: Types.Scalars['Int'];
  offset: Types.Scalars['Int'];
}>;


export type GetNoumRolesQuery = { __typename?: 'Query', noumRoles: { __typename?: 'PaginatedNoumRoles', count: number, data: Array<{ __typename?: 'NoumRole', _id: string, name: string }> } };

export type GetNoumRolesInfoQueryVariables = Types.Exact<{
  limit: Types.Scalars['Int'];
  offset: Types.Scalars['Int'];
}>;


export type GetNoumRolesInfoQuery = { __typename?: 'Query', noumRoles: { __typename?: 'PaginatedNoumRoles', count: number, data: Array<{ __typename?: 'NoumRole', _id: string, name: string, description: string, groupedPermissions: Array<{ __typename?: 'NoumRolePermissionGroup', level: Types.NoumRolePermissionLevel, elementType?: Types.PermissibleElementType | null, permissionIDs: Array<string>, permissions: Array<{ __typename?: 'NoumRolePermissionItem', id: string, isActive: boolean }> }> }> } };


export const GetNoumRolesDocument = gql`
    query GetNoumRoles($limit: Int!, $offset: Int!) {
  noumRoles(
    limit: $limit
    offset: $offset
    filterBy: Active
    order: {sortBy: HIERARCHY_ORDER, order: asc}
  ) {
    count
    data {
      ...NoumRoleForDropdown
    }
  }
}
    ${NoumRoleForDropdownFragmentDoc}`;

/**
 * __useGetNoumRolesQuery__
 *
 * To run a query within a React component, call `useGetNoumRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumRolesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetNoumRolesQuery(baseOptions: Apollo.QueryHookOptions<GetNoumRolesQuery, GetNoumRolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumRolesQuery, GetNoumRolesQueryVariables>(GetNoumRolesDocument, options);
      }
export function useGetNoumRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumRolesQuery, GetNoumRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumRolesQuery, GetNoumRolesQueryVariables>(GetNoumRolesDocument, options);
        }
export type GetNoumRolesQueryHookResult = ReturnType<typeof useGetNoumRolesQuery>;
export type GetNoumRolesLazyQueryHookResult = ReturnType<typeof useGetNoumRolesLazyQuery>;
export type GetNoumRolesQueryResult = Apollo.QueryResult<GetNoumRolesQuery, GetNoumRolesQueryVariables>;
export const GetNoumRolesInfoDocument = gql`
    query GetNoumRolesInfo($limit: Int!, $offset: Int!) {
  noumRoles(
    limit: $limit
    offset: $offset
    filterBy: Active
    order: {sortBy: HIERARCHY_ORDER, order: asc}
  ) {
    count
    data {
      ...NoumRoleForInfo
    }
  }
}
    ${NoumRoleForInfoFragmentDoc}`;

/**
 * __useGetNoumRolesInfoQuery__
 *
 * To run a query within a React component, call `useGetNoumRolesInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumRolesInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumRolesInfoQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetNoumRolesInfoQuery(baseOptions: Apollo.QueryHookOptions<GetNoumRolesInfoQuery, GetNoumRolesInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumRolesInfoQuery, GetNoumRolesInfoQueryVariables>(GetNoumRolesInfoDocument, options);
      }
export function useGetNoumRolesInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumRolesInfoQuery, GetNoumRolesInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumRolesInfoQuery, GetNoumRolesInfoQueryVariables>(GetNoumRolesInfoDocument, options);
        }
export type GetNoumRolesInfoQueryHookResult = ReturnType<typeof useGetNoumRolesInfoQuery>;
export type GetNoumRolesInfoLazyQueryHookResult = ReturnType<typeof useGetNoumRolesInfoLazyQuery>;
export type GetNoumRolesInfoQueryResult = Apollo.QueryResult<GetNoumRolesInfoQuery, GetNoumRolesInfoQueryVariables>;