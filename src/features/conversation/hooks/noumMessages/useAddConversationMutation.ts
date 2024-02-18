import { useMutation, useQueryClient } from 'react-query';
import { useConversationHelpers } from './useConversationHelpers';
import { type NoumConversation, NoumConversationType } from '../../types';

export function useAddConversationMutation() {
  const queryClient = useQueryClient();
  const { getNoumConversationType } = useConversationHelpers();

  const { mutate: addConversationMutation } = useMutation<
    void,
    unknown,
    { conversation: NoumConversation }
  >({
    mutationFn: async ({ conversation }) => {
      const type = await getNoumConversationType(
        conversation.twilioConversation,
      );
      if (type === NoumConversationType.MINE) {
        queryClient.setQueryData<NoumConversation>(
          ['conversation', conversation.twilioConversation.sid],
          conversation,
          {
            updatedAt: Date.now(),
          },
        );
      }

      if (type === NoumConversationType.OTHERS) {
        queryClient.setQueryData<NoumConversation>(
          ['others-conversation', conversation.twilioConversation.sid],
          conversation,
          {
            updatedAt: Date.now(),
          },
        );
      }
    },
  });

  return addConversationMutation;
}
