import {
  ElementTypeEnum,
  PermissibleElementType,
} from '@/apollo/generated/types';
import { useCallback } from 'react';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';

interface ToolboxPermissionApi {
  /**
   * Checks whether the user has a permission to add element from toolbox.
   * @param fallbackValue Value to be returned when `elementPermission` feature flag is disabled.
   * @example
   * ```tsx
   * {hasToolboxPermissionToAddElement(ElementTypeEnum.Wallet, 'create-wallet') && (
   *   <Button primary>Create a new wallet</Button>
   * )}
   * ```
   */
  hasToolboxPermissionToAddElement(
    elementType: ElementTypeEnum,
    fallbackValue?: boolean,
  ): boolean;
}
export function useToolboxPermission(): ToolboxPermissionApi {
  const { hasElementPermission } = useNoumAuthorization();
  const hasToolboxPermissionToAddElement = useCallback(
    (elementType: ElementTypeEnum, fallbackValue?: boolean) => {
      let hasPermissionToAdd = true;
      switch (elementType) {
        case ElementTypeEnum.Wallet:
          hasPermissionToAdd = hasElementPermission(
            PermissibleElementType.Payment,
            'create-wallet',
            fallbackValue,
          );
          break;
        default:
          break;
      }
      return hasPermissionToAdd;
    },
    [hasElementPermission],
  );

  return { hasToolboxPermissionToAddElement };
}
