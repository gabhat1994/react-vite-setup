import {
  type ElementTypeEnum,
  NoumRolePermissionLevel,
  type PermissibleElementType,
} from '@/apollo/generated/types';
import { useCallback } from 'react';
import { useLaunchDarkly } from '@/hooks';
import { useNoumAuthorizationContext } from './NoumAuthorizationContext';
import {
  type DefaultNoumRoleName,
  type NoumPermissionName,
  type ElementPermission,
  elementTypeEnumPermissionMap,
} from './types';

interface NoumAuthorizationApi {
  /**
   * Checks whether the user has a Noum-level permission granted. Can be used to determine whether the user should see a particular screen or section of the Noum settings.
   * @param fallbackValue Value to be returned when `elementPermission` feature flag is disabled.
   * @example
   * ```tsx
   * {hasNoumPermission('invite-users') && (
   *   <InviteMembersModal />
   * )}
   * ```
   */
  hasNoumPermission(
    noumPermission: NoumPermissionName,
    fallbackValue?: boolean,
  ): boolean;

  /**
   * Checks whether the user has an Element-level permission granted. Can be used to determine whether the user should see a particular button or perform a particular action.
   * @param fallbackValue Value to be returned when `elementPermission` feature flag is disabled.
   * @example
   * ```tsx
   * {hasElementPermission(PermissibleElementType.Calendar, 'create-event') && (
   *   <Button primary>Create a new Event</Button>
   * )}
   * ```
   */
  hasElementPermission<ElementType extends PermissibleElementType>(
    elementType: ElementType,
    elementPermission: ElementPermission<ElementType>,
    fallbackValue?: boolean,
  ): boolean;

  /**
   * Checks whether the user has a predefined default role. Default roles are the roles that are hard-coded in BE and cannot be modified via the Ops Portal, for example, “Co-Manager”, “Follower”, or “Guest”.
   * @example
   * ```tsx
   * {hasDefaultRole('Guest') && (
   *   <GuestWelcomeBanner />
   * )}
   * ```
   */
  hasDefaultRole(role: DefaultNoumRoleName): boolean;

  /**
   * Checks whether the user has a custom role. Custom roles are dynamic and can be added and deleted via the Ops Portal. Checking for these should be rare because they aren’t guaranteed to stay.
   * @example
   * ```tsx
   * {hasCustomRole('Sub-contractor') && (
   *   <SubContractorBanner />
   * )}
   * ```
   */
  hasCustomRole(role: string): boolean;

  /**
   * Checks whether the permission for element is enabled in Ops Portal.
   * @param fallbackValue Value to be returned when `elementPermission` feature flag is disabled.
   * @example
   * ```tsx
   * {hasElementPermissionEnabled(ElementTypeEnum.Wallet, true) && (
   *   <WalletElement />
   * )}
   * ```
   */
  hasElementPermissionEnabled(
    elementType: ElementTypeEnum,
    fallbackValue?: boolean,
  ): boolean;
}

export function useNoumAuthorization(): NoumAuthorizationApi {
  const { role, permissions } = useNoumAuthorizationContext();
  const { flags } = useLaunchDarkly();

  const hasDefaultRole = useCallback(
    (roleName: DefaultNoumRoleName) =>
      !!role && role.isDefault && role.name === roleName,
    [role],
  );

  const hasCustomRole = useCallback(
    (roleName: string) => !!role && !role.isDefault && role.name === roleName,
    [role],
  );

  const hasPermission = useCallback(
    (
      level: NoumRolePermissionLevel,
      elementType: PermissibleElementType | null,
      permissionName: string,
      fallbackValue: boolean = false,
    ) =>
      flags.elementPermission
        ? !!permissions.find(
            (permission) =>
              permission.level === level &&
              permission.elementType === elementType &&
              permission.permissions.find(
                (p) => p.isActive && p.id === permissionName,
              ),
          )
        : fallbackValue,
    [flags.elementPermission, permissions],
  );

  const hasElementPermission = useCallback(
    <ElementType extends PermissibleElementType>(
      elementType: ElementType,
      elementPermission: ElementPermission<ElementType>,
      fallbackValue?: boolean,
    ) =>
      hasPermission(
        NoumRolePermissionLevel.Element,
        elementType,
        elementPermission,
        fallbackValue,
      ),
    [hasPermission],
  );

  const hasNoumPermission = useCallback(
    (noumPermission: NoumPermissionName, fallbackValue?: boolean) =>
      hasPermission(
        NoumRolePermissionLevel.Noum,
        null,
        noumPermission,
        fallbackValue,
      ),
    [hasPermission],
  );

  const hasElementPermissionEnabled = useCallback(
    (elementType: ElementTypeEnum, fallbackValue: boolean = false) => {
      const permissionEnabledObj = elementTypeEnumPermissionMap[elementType];
      return permissionEnabledObj
        ? hasElementPermission(
            permissionEnabledObj.permissibleElementType,
            permissionEnabledObj.permissionNameForCheckingEnabled,
            fallbackValue,
          )
        : fallbackValue;
    },
    [hasElementPermission],
  );

  return {
    hasDefaultRole,
    hasCustomRole,
    hasElementPermission,
    hasNoumPermission,
    hasElementPermissionEnabled,
  };
}
