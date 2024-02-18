import {
  NoumRolePermissionLevel,
  type PermissibleElementType,
} from '@/apollo/generated/types';
import {
  type NoumPermissionName,
  type DefaultNoumRoleName,
  type NoumRole,
  type NoumPermission,
  type ElementPermission,
  type NoumElementPermission,
} from './types';

export function createDefaultRole(roleName: DefaultNoumRoleName): NoumRole {
  return { name: roleName, isDefault: true };
}
export function createCustomRole(roleName: string): NoumRole {
  return { name: roleName, isDefault: false };
}

export function createNoumPermissions(
  permissions: NoumPermissionName[],
): NoumPermission {
  return {
    level: NoumRolePermissionLevel.Noum,
    elementType: null,
    permissions: permissions.map((id) => ({ isActive: true, id })),
  };
}

export function createElementPermissions<
  ElementType extends PermissibleElementType,
>(
  elementType: ElementType,
  permissions: ElementPermission<ElementType>[],
): NoumElementPermission<ElementType> {
  return {
    level: NoumRolePermissionLevel.Element,
    elementType,
    permissions: permissions.map((id) => ({ isActive: true, id })),
  };
}
