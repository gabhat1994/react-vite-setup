import { useConversation } from './useConversation';
import { useConversationDetails } from './useConversationDetails';
import { useConversationHandlers } from './useConversationHandlers';
import { useConversationMessages } from './useConversationMessages';
import { useConversationMetadata } from './useConversationMetadata';
import { useConversationsList } from './useConversationsList';
import { useEmptyConversation } from './useEmptyConversation';
import { useEmptyConversationDetails } from './useEmptyConversationDetails';
import { useMessageHandlers } from './useMessageHandlers';
import { useParticipantHandlers } from './useParticipantHandlers';
import { useMessageStatus } from './useMessageStatus';
import { useConversationParticipants } from './useConversationParticipants';
import { useMediaMessageBubble } from './useMediaMessageBubble';
import { useMessageBubbleProps } from './useMessageBubbleProps';
import { useGetConversation } from './useGetConversation';
import { useConversationUnreadMessageCount } from './useConversationUnreadMessageCount';

const ConversationHooks = {
  // Mutations
  useConversationHandlers,
  useParticipantHandlers,
  useMessageHandlers,
  // Queries
  useConversationsList,
  useConversation,
  useConversationParticipants,
  useConversationMessages,
  useConversationDetails,
  useEmptyConversation,
  useConversationMetadata,
  useEmptyConversationDetails,
  // helpers
  useMediaMessageBubble,
  useMessageBubbleProps,
  useMessageStatus,
  useGetConversation,
  useConversationUnreadMessageCount,
};

export default ConversationHooks;
