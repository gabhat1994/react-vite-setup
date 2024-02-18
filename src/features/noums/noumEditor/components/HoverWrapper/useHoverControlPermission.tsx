import {
  ElementTypeEnum,
  PermissibleElementType,
} from '@/apollo/generated/types';
import { useCallback } from 'react';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { type HasElementHoverControlPermissionProps } from './types';

interface HoverControlPermissionApi {
  hasElementHoverControlPermission(
    props: HasElementHoverControlPermissionProps,
  ): boolean;
}

export function useHoverControlPermission(): HoverControlPermissionApi {
  const { hasElementPermission } = useNoumAuthorization();

  const hasElementHoverControlPermission = useCallback(
    ({ element, fallbackValue }: HasElementHoverControlPermissionProps) => {
      let hasPermission = true;
      switch (element?.elementType) {
        case ElementTypeEnum.Wallet:
          hasPermission = hasElementPermission(
            PermissibleElementType.Payment,
            'create-wallet',
            fallbackValue,
          );
          break;
        default:
          break;
      }
      return hasPermission;
    },
    [hasElementPermission],
  );

  return { hasElementHoverControlPermission };
}
