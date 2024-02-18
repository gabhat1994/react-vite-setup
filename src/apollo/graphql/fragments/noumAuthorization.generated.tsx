/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type NoumAuthorizationFragment = { __typename?: 'SpaceOutput', _id?: string | null, assignedRole?: { __typename?: 'NoumRole', _id: string, name: string, isDefault: boolean, status: Types.NoumRoleStatus, groupedPermissions: Array<{ __typename?: 'NoumRolePermissionGroup', level: Types.NoumRolePermissionLevel, elementType?: Types.PermissibleElementType | null, permissions: Array<{ __typename?: 'NoumRolePermissionItem', id: string, isActive: boolean }> }> } | null };

export type NoumRoleForAuthorizationFragment = { __typename?: 'NoumRole', _id: string, name: string, isDefault: boolean, status: Types.NoumRoleStatus, groupedPermissions: Array<{ __typename?: 'NoumRolePermissionGroup', level: Types.NoumRolePermissionLevel, elementType?: Types.PermissibleElementType | null, permissions: Array<{ __typename?: 'NoumRolePermissionItem', id: string, isActive: boolean }> }> };

export type NoumRolePermissionGroupForAuthorizationFragment = { __typename?: 'NoumRolePermissionGroup', level: Types.NoumRolePermissionLevel, elementType?: Types.PermissibleElementType | null, permissions: Array<{ __typename?: 'NoumRolePermissionItem', id: string, isActive: boolean }> };

export const NoumRolePermissionGroupForAuthorizationFragmentDoc = gql`
    fragment NoumRolePermissionGroupForAuthorization on NoumRolePermissionGroup {
  level
  elementType
  permissions {
    id
    isActive
  }
}
    `;
export const NoumRoleForAuthorizationFragmentDoc = gql`
    fragment NoumRoleForAuthorization on NoumRole {
  _id
  name
  isDefault
  status
  groupedPermissions {
    ...NoumRolePermissionGroupForAuthorization
  }
}
    ${NoumRolePermissionGroupForAuthorizationFragmentDoc}`;
export const NoumAuthorizationFragmentDoc = gql`
    fragment NoumAuthorization on SpaceOutput {
  _id
  assignedRole {
    ...NoumRoleForAuthorization
  }
}
    ${NoumRoleForAuthorizationFragmentDoc}`;