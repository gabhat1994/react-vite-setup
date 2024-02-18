import { type NoumConversation } from '@/features/conversation/types';
import { type SendMediaOptions } from '@twilio/conversations';

export function sendMessage(
  conversation: NoumConversation,
  message: string | FormData | SendMediaOptions | null,
) {
  return conversation.twilioConversation.sendMessage(message);
}

export function setAllMessagesRead(conversation: NoumConversation) {
  return conversation.twilioConversation.setAllMessagesRead();
}
