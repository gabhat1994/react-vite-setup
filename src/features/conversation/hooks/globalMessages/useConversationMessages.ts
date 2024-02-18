import { useCallback, useContext, useEffect, useMemo } from 'react';

import { useInfiniteQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { type Conversation, type Message } from '@twilio/conversations';

import { ActiveConversationContext } from '../../contexts/ActiveConversationContext';
import { useConversation } from './useConversation';
import { getMediaType, loadImageFromFile } from '../../helpers';

const MESSAGES_PAGE_SIZE = 30;
const MESSAGES_CACHE_TIME = 10 * 60 * 1000; // 10 mins

export type MessagesPaginator = Awaited<
  ReturnType<Conversation['getMessages']>
>;

interface UseConversationMessagesOptions {
  sid?: string;
  onMessage?: (message: Message) => void;
  pageSize?: number;
}

export function useConversationMessages({
  sid,
  onMessage,
  pageSize = MESSAGES_PAGE_SIZE,
}: UseConversationMessagesOptions) {
  const { conversation } = useConversation({ sid });
  const { pendingMessages, addPendingMessage, updatePendingMessage } =
    useContext(ActiveConversationContext);

  const messagesQuery = useInfiniteQuery<MessagesPaginator>({
    queryKey: ['messages', sid],
    queryFn: async ({ pageParam }) => {
      // This is the paginator function returned by Twilio, we pass it in `getPreviousPageParam` below.
      if (typeof pageParam === 'function') {
        return pageParam();
      }

      // If no pageParam provided, it means we're fetching the initial page, so just call Twilio directly.
      return conversation?.getMessages(pageSize);
    },
    // Don't make any queries of the conversation is not provided.
    enabled: !!conversation,
    staleTime: MESSAGES_CACHE_TIME,
    getPreviousPageParam: (firstPage) =>
      // Pass the function so we can call it in `queryFn`.
      firstPage.hasPrevPage ? () => firstPage.prevPage() : undefined,
    getNextPageParam: (lastPage) =>
      // Pass the function so we can call it in `queryFn`.
      lastPage.hasNextPage ? () => lastPage.nextPage() : undefined,
  });

  useEffect(() => {
    if (!conversation || !onMessage) {
      return undefined;
    }

    conversation.on('messageAdded', onMessage);

    return () => {
      conversation.off('messageAdded', onMessage);
    };
  }, [conversation, onMessage]);

  const sendMessage = useCallback(
    async (message: string, convo?: Conversation) => {
      if (!convo || !message) {
        return;
      }

      const messageId = uuidv4();
      const unsentMessage = convo
        .prepareMessage()
        .setAttributes({
          id: messageId,
          dateCreatedTimestamp: new Date().getTime(),
        })
        .setBody(message)
        .build();

      addPendingMessage(unsentMessage);
      unsentMessage
        .send()
        .then((resp) => {
          if (resp === null) return;
          updatePendingMessage(messageId, {
            status: { status: 'sent' },
            index: resp,
          });
        })
        .catch(() => {
          updatePendingMessage(messageId, {
            status: { status: 'failed' },
          });
        });
    },
    [addPendingMessage, updatePendingMessage],
  );

  const sendFile = useCallback(
    async (file: File, convo?: Conversation) => {
      if (!convo) {
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      let width = null;
      let height = null;

      if (getMediaType(file.type) === 'image') {
        const dimensions = await loadImageFromFile(file);
        width = dimensions.width;
        height = dimensions.height;
      }

      const messageId = uuidv4();
      const unsentMessage = convo
        .prepareMessage()
        .addMedia(formData)
        .setAttributes({
          id: messageId,
          dateCreatedTimestamp: new Date().getTime(),
          width,
          height,
        })
        .build();

      addPendingMessage(unsentMessage);
      unsentMessage
        .send()
        .then((resp) => {
          if (resp === null) return;
          updatePendingMessage(messageId, {
            status: { status: 'sent' },
            index: resp,
          });
        })
        .catch(() => {
          updatePendingMessage(messageId, {
            status: { status: 'failed' },
          });
        });
    },
    [addPendingMessage, updatePendingMessage],
  );

  const messages = useMemo(
    () => messagesQuery.data?.pages.flatMap((item) => item.items) ?? [],
    [messagesQuery.data?.pages],
  );

  return {
    status: messagesQuery.status,
    isFetched: messagesQuery.isFetched,
    isLoading: messagesQuery.isLoading,
    hasPreviousPage: messagesQuery.hasPreviousPage,
    messages,
    pendingMessages,
    conversation,
    sendMessage,
    sendFile,
    fetchPreviousMessages: messagesQuery.fetchPreviousPage,
  };
}
