import { type Conversation } from '@twilio/conversations';
import { useContext } from 'react';
import { useQuery } from 'react-query';

import { TwilioClientContext } from '../../contexts/TwilioClientContext';

interface UseConversationUnreadMessageCountOptions {
  sid?: string;
}

export function useConversationUnreadMessageCount({
  sid,
}: UseConversationUnreadMessageCountOptions) {
  const { client, isInitialized } = useContext(TwilioClientContext);

  const { data: twilioConversation } = useQuery<Conversation>({
    queryKey: ['conversation', sid],
    queryFn: () => client!.getConversationBySid(sid!),
    enabled: !!client && isInitialized && !!sid,
    // We don't want to garbage-collect the conversation object from cache, unless user leaves the conversation.
    // Any changes (events) to the conversation metadata will trigger a manual update.
    staleTime: Infinity,
  });

  const lastMessageIndex = twilioConversation?.lastMessage?.index ?? 0;
  const lastReadMessageIndex = twilioConversation?.lastReadMessageIndex ?? 0;

  return lastMessageIndex - lastReadMessageIndex;
}
