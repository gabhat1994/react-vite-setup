import { forwardRef, type Ref } from 'react';
import {
  ElementTypeEnum,
  PermissibleElementType,
} from '@/apollo/generated/types';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { type WalletElementProps } from './types';
import { WalletElementViewMode } from './WalletElementViewMode';
import { WalletElementProvider } from './providers/WalletElementProvider';
import { ElementContainer } from '../ElementContainer';

export const WalletElement = forwardRef(
  (props: WalletElementProps, ref: Ref<HTMLDivElement>) => {
    const { isConnected } = useNoumUserConnectionContext();
    const { hasElementPermission } = useNoumAuthorization();

    const hasViewWalletElementPermission = hasElementPermission(
      PermissibleElementType.Payment,
      'view-wallet-element',
      true,
    );

    if (isConnected && !hasViewWalletElementPermission) {
      return null;
    }

    return (
      <ElementContainer elementType={ElementTypeEnum.Wallet}>
        <WalletElementProvider>
          <WalletElementViewMode
            {...{
              ...props,
              isOwner: props.isEditing || props.isOwner,
            }}
            ref={ref}
          />
        </WalletElementProvider>
      </ElementContainer>
    );
  },
);
