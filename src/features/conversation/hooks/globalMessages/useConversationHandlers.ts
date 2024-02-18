import { useMutation, useQueryClient } from 'react-query';
import { delay } from 'lodash';
import { type Conversation } from '@twilio/conversations';
import { useClient } from '@/hooks';
import { useConversationListQueryOptions } from './useConversationListQueryOptions';
import { type ConversationType, type ConversationQueryType } from '../../types';
import {
  ConversationListDocuments,
  extractConversationUpdatingLimit,
} from '../../helpers';

export function useConversationHandlers(conversationType: ConversationType) {
  const { client: apolloClient } = useClient();
  const queryOptions = useConversationListQueryOptions(conversationType);

  const updateConversationsList = async () => {
    delay(() => {
      const list = apolloClient.readQuery<
        ConversationQueryType[typeof conversationType]
      >({
        query: ConversationListDocuments[conversationType],
        variables: queryOptions?.variables,
      });

      const limit = extractConversationUpdatingLimit(conversationType, list);
      apolloClient.refetchQueries({
        include: [ConversationListDocuments[conversationType]],
        onQueryUpdated: (previousResult) => {
          previousResult.refetch(
            limit
              ? {
                  limit,
                }
              : undefined,
          );
        },
      });
    }, 500);
  };

  const queryClient = useQueryClient();

  const { mutate: addConversation } = useMutation<
    void,
    unknown,
    { conversation: Conversation }
  >({
    mutationFn: async ({ conversation }) => {
      if (queryClient.getQueryData(['conversation', conversation.sid])) {
        return;
      }

      queryClient.setQueryData<Conversation>(
        ['conversation', conversation.sid],
        conversation,
        {
          updatedAt: Date.now(),
        },
      );
      updateConversationsList();
    },
  });

  const { mutate: updateConversation } = useMutation<
    void,
    unknown,
    { conversation: Conversation }
  >({
    mutationFn: async ({ conversation }) => {
      queryClient.setQueryData<Conversation>(
        ['conversation', conversation.sid],
        conversation,
        {
          updatedAt: Date.now(),
        },
      );

      updateConversationsList();
    },
    onSuccess() {
      queryClient.invalidateQueries('conversations');
    },
  });

  const { mutate: removeConversation } = useMutation<
    void,
    unknown,
    { conversation: Conversation }
  >({
    mutationFn: async ({ conversation }) => {
      queryClient.removeQueries(['conversation', conversation.sid]);
      queryClient.removeQueries(['conversation-messages', conversation.sid]);
    },
    onSuccess() {
      queryClient.invalidateQueries('conversations');
    },
  });

  const { mutate: bulkAddConversations } = useMutation<
    void,
    unknown,
    { conversations: Conversation[]; isInitialized: boolean }
  >({
    mutationFn: async ({ conversations, isInitialized }) => {
      conversations.forEach((conversation) => {
        queryClient.setQueryData<Conversation>(
          ['conversation', conversation.sid],
          conversation,
        );
        if (isInitialized) {
          updateConversationsList();
        }
      });
    },
    onSuccess() {
      queryClient.invalidateQueries('conversations');
    },
  });

  return {
    addConversation,
    updateConversation,
    removeConversation,
    bulkAddConversations,
  };
}
