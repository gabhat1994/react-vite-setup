import { useMutation, useQueryClient } from 'react-query';
import { type Conversation } from '@twilio/conversations';

export function useAddTwilioConversationMutation() {
  const queryClient = useQueryClient();

  const { mutate: addTwilioConversationMutation } = useMutation<
    void,
    unknown,
    { conversation: Conversation }
  >({
    mutationFn: async ({ conversation }) => {
      queryClient.setQueryData<Conversation>(
        ['twilio-conversation', conversation.sid],
        conversation,
      );
    },
  });

  return addTwilioConversationMutation;
}
