import { forwardRef, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { ConversationViewProvider } from '@/features/conversation/contexts/ConversationViewProvider';
import { ActiveConversationProvider } from '@/features/conversation/contexts/ActiveConversationProvider';
import { NewConversationProvider } from '@/features/conversation/contexts/NewConversationProvider';
import { TwilioClientProvider } from '@/features/conversation/contexts/TwilioClientProvider';
import { useSkeletonIsLoadingContext } from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import SkeletonLoaderMessageElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderMessageElement';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import {
  ElementTypeEnum,
  PermissibleElementType,
} from '@/apollo/generated/types';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { SpaceUtils } from '@/utils/space';
import { MessageElementProvider } from './contexts/MessageElementProvider';
import { MessageElementViewMode } from './MessageElementViewMode';
import { type MessageElementProps } from './types';
import { ElementContainer } from '../ElementContainer';

export const MessageElement = forwardRef((props: MessageElementProps) => {
  const { isLoading } = useSkeletonIsLoadingContext();
  const queryClient = useQueryClient();
  const { space } = useNoumContext();
  const { isConnected } = useNoumUserConnectionContext();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => queryClient.clear(), []);

  const { hasElementPermission } = useNoumAuthorization();

  const hasViewMessageElementPermission = hasElementPermission(
    PermissibleElementType.Messages,
    'view-message-element',
    true,
  );

  if (
    isConnected &&
    !SpaceUtils.isMasterNoum(space) &&
    !hasViewMessageElementPermission
  ) {
    return null;
  }

  if (isLoading) return <SkeletonLoaderMessageElement />;

  return (
    <ElementContainer
      isBorderContent={props.isEditing}
      elementType={ElementTypeEnum.Message}
    >
      <ConversationViewProvider>
        <MessageElementProvider>
          <TwilioClientProvider>
            <ActiveConversationProvider>
              <NewConversationProvider>
                <MessageElementViewMode {...props} />
              </NewConversationProvider>
            </ActiveConversationProvider>
          </TwilioClientProvider>
        </MessageElementProvider>
      </ConversationViewProvider>
    </ElementContainer>
  );
});
