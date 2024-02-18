import { useMutation, useQueryClient } from 'react-query';

import { type Participant } from '@twilio/conversations';
import { useConversationHelpers } from './useConversationHelpers';

export function useUpdateConversationParticipantMutation() {
  const queryClient = useQueryClient();
  const { isNoumParticipant } = useConversationHelpers();

  const { mutate: updateConversationParticipant } = useMutation<
    void,
    unknown,
    { participant: Participant }
  >({
    mutationFn: async ({ participant }) => {
      if (!isNoumParticipant(participant)) return;

      queryClient.setQueryData<Participant[]>(
        ['conversation-participants', participant.conversation.sid],
        (oldParticipants) => {
          if (!oldParticipants) {
            return [participant];
          }
          return oldParticipants.map((p) =>
            p.sid === participant.sid ? participant : p,
          );
        },
      );
    },
  });

  return updateConversationParticipant;
}
