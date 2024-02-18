import { createContext } from 'react';

type ConversationUnreadStatusContextProps = {
  unreadConversationsCount: number;
  readConversation: (cid: string) => Promise<void>;
  setMutedConversationId: (id: string | null) => void;
};

const ConversationUnreadStatusContextInitialValue = {
  unreadConversationsCount: 0,
  readConversation: async () => {},
  setMutedConversationId: () => {},
};

export const ConversationUnreadStatusContext =
  createContext<ConversationUnreadStatusContextProps>(
    ConversationUnreadStatusContextInitialValue,
  );
