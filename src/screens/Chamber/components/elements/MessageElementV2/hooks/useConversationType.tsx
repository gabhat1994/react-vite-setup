import { useContext, useEffect, useMemo } from 'react';
import { useAuth } from '@/features/auth/contexts';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { ConversationType } from '@/features/conversation/types';
import { SpaceUtils } from '@/utils/space';
import { MessageElementContext } from '../contexts/MessageElementProvider';

export function useConversationType(): ConversationType {
  const { user } = useAuth();
  const { space } = useNoumContext();
  const { setConversationType, isOthersConversations } = useContext(
    MessageElementContext,
  );

  const isOwner = space?.uid?._id === user?._id;
  const isMasterNoum = SpaceUtils.isMasterNoum(space);

  const conversationType = useMemo(() => {
    if (isMasterNoum) {
      return isOwner ? ConversationType.HOME_OWNER : ConversationType.HOME_USER;
    }
    if (isOwner) {
      return isOthersConversations
        ? ConversationType.PROJECT_OWNER_OTHERS
        : ConversationType.PROJECT_OWNER;
    }
    return ConversationType.PROJECT_USER;
  }, [isMasterNoum, isOwner, isOthersConversations]);

  useEffect(() => {
    setConversationType(conversationType);
  }, [conversationType, setConversationType]);

  return conversationType;
}
