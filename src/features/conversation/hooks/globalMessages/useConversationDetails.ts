import { useConversation } from './useConversation';
import { useConversationMetadata } from './useConversationMetadata';

interface UseConversationParticipantsOptions {
  sid?: string;
}
export function useConversationDetails({
  sid,
}: UseConversationParticipantsOptions) {
  const { conversation, participants } = useConversation({ sid });

  const metadata = useConversationMetadata({ participants });

  return {
    ...metadata,
    createdBy: conversation?.createdBy
      ? metadata.getParticipantById(conversation?.createdBy)
      : undefined,
    participants,
  };
}
