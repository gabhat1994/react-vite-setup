import {
  ConversationViewContextInitialValue,
  type ConversationViewContextProps,
} from '@/features/conversation/contexts/ConversationViewContext';

export type MessageElementContextProps = ConversationViewContextProps & {
  loading: boolean;
  isOthersConversations: boolean;
  setIsOthersConversations: (value: boolean) => void;
  unreadMessages: number;
  setUnreadMessages: (value: number) => void;
  isNoumLayoutCompactViewMode?: boolean;
  isNoumLayoutSmallViewMode?: boolean;
};

export const MessageElementContextInitialValue: MessageElementContextProps = {
  ...ConversationViewContextInitialValue,
  loading: false,
  isOthersConversations: false,
  setIsOthersConversations: () => {},
  unreadMessages: 0,
  setUnreadMessages: () => {},
};
