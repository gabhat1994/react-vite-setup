import { useAddConversationMessageMutation } from './useAddConversationMessageMutation';
import { useAddConversationMutation } from './useAddConversationMutation';
import { useConversation } from './useConversation';
import { useConversationParticipants } from './useConversationParticipants';
import { useConversationsList } from './useConversationsList';
import { useTotalUnreadMessagesCount } from './useTotalUnreadMessagesCount';
import { useUpdateConversationMutation } from './useUpdateConversationMutation';
import { useUpdateConversationParticipantMutation } from './useUpdateConversationParticipantMutation';
import { useConversationDetails } from './useConversationDetails';
import { useMessageStatus } from './useMessageStatus';
import { useConversationHelpers } from './useConversationHelpers';
import { useAddTwilioConversationMutation } from './useTwilioConversation';

export const SpaceConversationHooks = {
  useConversationsList,
  useConversationDetails,
  useConversation,
  useAddConversationMutation,
  useUpdateConversationMutation,
  useConversationParticipants,
  useUpdateConversationParticipantMutation,
  useAddConversationMessageMutation,
  useTotalUnreadMessagesCount,
  useMessageStatus,
  useConversationHelpers,
  useAddTwilioConversationMutation,
};
