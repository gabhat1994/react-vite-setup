import { useMutation, useQueryClient } from 'react-query';

import { type Participant } from '@twilio/conversations';

export function useParticipantHandlers() {
  const queryClient = useQueryClient();

  const { mutate: addConversationParticipant } = useMutation<
    void,
    unknown,
    { participant: Participant }
  >({
    mutationFn: async ({ participant }) => {
      queryClient.setQueryData<Participant[]>(
        ['conversation-participants', participant.conversation.sid],
        (oldParticipants) => [...(oldParticipants ?? []), participant],
      );
    },
  });

  const { mutate: updateConversationParticipant } = useMutation<
    void,
    unknown,
    { participant: Participant }
  >({
    mutationFn: async ({ participant }) => {
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

  const { mutate: removeConversationParticipant } = useMutation<
    void,
    unknown,
    { participant: Participant }
  >({
    mutationFn: async ({ participant }) => {
      queryClient.setQueryData<Participant[]>(
        ['conversation-participants', participant.conversation.sid],
        (oldParticipants) =>
          (oldParticipants ?? []).filter((p) => p.sid !== participant.sid),
      );
    },
  });

  return {
    addConversationParticipant,
    updateConversationParticipant,
    removeConversationParticipant,
  };
}
