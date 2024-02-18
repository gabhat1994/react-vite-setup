import { createContext } from 'react';
import { ConversationType, ViewMode, type NoumLayoutViewMode } from '../types';

export type ConversationViewContextProps = {
  viewMode: ViewMode;
  setViewMode: (value: ViewMode) => void;
  isNewConversation: boolean;
  setIsNewConversation: (value: boolean) => void;
  conversationType: ConversationType;
  setConversationType: (value: ConversationType) => void;
  conversationWrapperWidth: number;
  setConversationWrapperWidth: (value: number) => void;
  noumLayoutViewMode?: NoumLayoutViewMode;
};

export const ConversationViewContextInitialValue = {
  viewMode: ViewMode.DEFAULT,
  setViewMode: () => {},
  isNewConversation: false,
  setIsNewConversation: () => {},
  conversationType: ConversationType.GLOBAL_ALL,
  setConversationType: () => {},
  conversationWrapperWidth: 0,
  setConversationWrapperWidth: () => {},
  noumLayoutViewMode: undefined,
};

export const ConversationViewContext =
  createContext<ConversationViewContextProps>(
    ConversationViewContextInitialValue,
  );
