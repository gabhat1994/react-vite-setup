import { useMemo } from 'react';

import { sumBy } from 'lodash';

import { useConversationsList } from './useConversationsList';

export function useTotalUnreadMessagesCount(isOthersConversations: boolean) {
  const { conversations, privateConversation } = useConversationsList(
    isOthersConversations,
  );

  return useMemo(
    () =>
      sumBy([...conversations, privateConversation], (conversation) => {
        const twilioConversation = conversation?.twilioConversation;
        if (!twilioConversation) return 0;

        const totalMessagesCount =
          twilioConversation.lastMessage?.index === undefined
            ? 0
            : twilioConversation.lastMessage.index + 1;
        const readMessagesCount =
          twilioConversation.lastReadMessageIndex === undefined ||
          twilioConversation.lastReadMessageIndex === null
            ? 0
            : twilioConversation.lastReadMessageIndex + 1;

        return totalMessagesCount - readMessagesCount;
      }),
    [conversations, privateConversation],
  );
}
