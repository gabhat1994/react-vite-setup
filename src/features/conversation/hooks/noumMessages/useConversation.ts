import { useQuery } from 'react-query';

import { CREAT_CONVERSATION_WITH_HOME_OWNER } from '@/constants/conversation';
import { useMessageElement } from '@/screens/Chamber/components/elements/MessageElementV2/contexts/MessageElementProvider';
import { useTwilioClient } from '../twilioClient';
import { useConversationHelpers } from './useConversationHelpers';
import { type NoumConversation } from '../../types';

interface UseConversationOptions {
  sid: string;
}

export function useConversation({ sid }: UseConversationOptions) {
  const { client, isInitialized } = useTwilioClient();
  const { isOthersConversations } = useMessageElement();
  const { getConversation } = useConversationHelpers();
  const key = isOthersConversations ? 'others-conversation' : 'conversation';

  const { data: conversation, status } = useQuery<NoumConversation | null>({
    queryKey: [key, sid],
    queryFn: () => getConversation(key, sid),
    enabled:
      !!client &&
      !!sid &&
      !(sid === CREAT_CONVERSATION_WITH_HOME_OWNER) &&
      isInitialized,
    // We don't want to garbage-collect the conversation object from cache, unless user leaves the conversation.
    // Any changes (events) to the conversation metadata will trigger a manual update.
    staleTime: Infinity,
  });

  return {
    status,
    conversation,
  };
}
