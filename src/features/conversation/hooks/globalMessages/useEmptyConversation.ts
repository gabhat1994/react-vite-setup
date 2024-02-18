import { useCallback, useContext } from 'react';

import { type SendMediaOptions } from '@twilio/conversations';

import { useGetOrCreateConversationMutation } from '@/apollo/graphql';
import { cleanList } from '@/utils/list';
import { useEmptyConversationDetails } from './useEmptyConversationDetails';

import { TwilioClientContext } from '../../contexts/TwilioClientContext';

interface UseEmptyConversationOptions {
  participantIds: string[];
}

export function useEmptyConversation({
  participantIds,
}: UseEmptyConversationOptions) {
  const { client, isInitialized } = useContext(TwilioClientContext);

  const details = useEmptyConversationDetails({ participantIds });
  const [getOrCreateConversationMutation] =
    useGetOrCreateConversationMutation();

  const createConversationAndSendMessage = useCallback(
    async (message: string | FormData | SendMediaOptions | null) => {
      if (!client) {
        return undefined;
      }
      try {
        const res = await getOrCreateConversationMutation({
          variables: {
            userIds: cleanList([...participantIds]),
          },
        });

        const sid = res.data?.getOrCreateConversation?.cid;

        if (!sid) {
          return undefined;
        }

        const conversation = await client.getConversationBySid(sid);

        await conversation.sendMessage(message);
        conversation.setAllMessagesRead();

        return conversation;
      } catch (error) {
        return undefined;
      }
    },
    [client, getOrCreateConversationMutation, participantIds],
  );

  return {
    ...details,
    isInitialized,
    createConversationAndSendMessage,
  };
}
