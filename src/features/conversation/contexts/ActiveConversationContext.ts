import { type UnsentMessage } from '@twilio/conversations';
import { createContext } from 'react';
import { type PendingMessage } from '../types';

type ActiveConversationContextProps = {
  activeConversationSid: string;
  setActiveConversationSid: (sid: string) => void;
  addPendingMessage: (message: UnsentMessage) => void;
  updatePendingMessage: (
    id: string,
    pendingMessage: Partial<PendingMessage>,
  ) => void;
  removePendingMessage: (id: string) => void;
  resendErrorMessage: (id: string) => void;
  pendingMessages: PendingMessage[];
};

const ConversationContextInitialValue = {
  activeConversationSid: '',
  setActiveConversationSid: () => {},
  addPendingMessage: () => {},
  updatePendingMessage: () => {},
  removePendingMessage: () => {},
  resendErrorMessage: () => {},
  pendingMessages: [],
};

export const ActiveConversationContext =
  createContext<ActiveConversationContextProps>(
    ConversationContextInitialValue,
  );
