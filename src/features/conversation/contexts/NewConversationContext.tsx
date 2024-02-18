import { createContext, type Dispatch, type SetStateAction } from 'react';
import { type Conversation } from '@twilio/conversations';
import { type UserBasicOutputFragment } from '@/apollo/graphql/fragments';

type NewConversationContextProps = {
  isConversationCreatable: boolean;
  loading: boolean;
  ecLoading: boolean;
  selectedUsers: UserBasicOutputFragment[];
  setSelectedUsers: Dispatch<SetStateAction<UserBasicOutputFragment[]>>;
  createNewConversation: () => Promise<Conversation | undefined>;
  createHomeNoumNewConversation: () => Promise<Conversation | undefined>;
};

const NewConversationContextInitialValue = {
  isConversationCreatable: false,
  loading: false,
  ecLoading: false,
  selectedUsers: [],
  setSelectedUsers: () => {},
  createNewConversation: async () => undefined,
  createHomeNoumNewConversation: async () => undefined,
};

export const NewConversationContext =
  createContext<NewConversationContextProps>(
    NewConversationContextInitialValue,
  );
