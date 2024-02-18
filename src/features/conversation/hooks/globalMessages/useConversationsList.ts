import { useCallback, useEffect, useMemo } from 'react';
import * as Sentry from '@sentry/react';
import { useQuery } from '@apollo/client';
import { GetConversationByCidDocument } from '@/apollo/graphql';
import { useClient } from '@/hooks';
import { CONVERSATION_PAGINATION_LIMIT_S } from '@/constants/conversation';
import { useConversationListQueryOptions } from './useConversationListQueryOptions';
import { type ConversationQueryType, type ConversationType } from '../../types';
import {
  ConversationListDocuments,
  extractConversationOutputs,
} from '../../helpers';

export function useConversationsList(conversationType: ConversationType) {
  const { client: apolloClient } = useClient();

  const queryOptions = useConversationListQueryOptions(conversationType);
  const { data, networkStatus, refetch, fetchMore, loading } = useQuery<
    ConversationQueryType[typeof conversationType]
  >(ConversationListDocuments[conversationType], {
    variables: {
      offset: 0,
      limit: CONVERSATION_PAGINATION_LIMIT_S,
      ...queryOptions?.variables,
    },
    skip: !queryOptions?.variables,
    fetchPolicy: 'cache-and-network',
  });
  const { privateConversation, conversations, count, totalCount, unreadCount } =
    useMemo(() => {
      const extracted = extractConversationOutputs(conversationType, data);
      return {
        privateConversation: extracted.privateConversation,
        conversations: extracted.conversations,
        count:
          extracted.conversations.length +
          (extracted.privateConversation ? 1 : 0),
        totalCount: extracted.totalCount,
        unreadCount: extracted.unreadCount,
      };
    }, [conversationType, data]);

  const onRefetch = useCallback(async () => {
    try {
      await refetch();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [refetch]);

  const onFetchMore = useCallback(async () => {
    if (!queryOptions?.variables) {
      return;
    }
    try {
      await fetchMore({
        variables: { offset: count, ...queryOptions?.variables },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [count, fetchMore, queryOptions?.variables]);

  useEffect(() => {
    if (conversations.length === 0) return;
    conversations.forEach((conversationData) => {
      let conversationItem;
      if (
        conversationData.__typename === 'ConversationOutput' &&
        conversationData.cid
      ) {
        conversationItem = conversationData;
      } else if (
        conversationData.__typename === 'BasicConversationItem' &&
        conversationData.conversation?.cid
      ) {
        conversationItem = conversationData.conversation;
      } else if (conversationData.__typename === 'NoumGroupConversationItem') {
        conversationData.conversations?.forEach((item) => {
          try {
            apolloClient.writeQuery({
              query: GetConversationByCidDocument,
              data: { getConversationByCid: item?.conversation },
              variables: { cid: item?.conversation?.cid },
            });
          } catch (error) {
            let message = '[cacheResults]: Unknown';
            if (error instanceof Error) {
              message = error.message;
            }
            Sentry.captureException(new Error(message), {
              tags: {
                section: 'useConversationsList',
              },
            });
          }
        });
      }
      if (!conversationItem) return;
      try {
        apolloClient.writeQuery({
          query: GetConversationByCidDocument,
          data: { getConversationByCid: conversationItem },
          variables: { cid: conversationItem.cid },
        });
      } catch (error) {
        let message = '[cacheResults]: Unknown';
        if (error instanceof Error) {
          message = error.message;
        }
        Sentry.captureException(new Error(message), {
          tags: {
            section: 'useConversationsList',
          },
        });
      }
    });
  }, [apolloClient, conversations]);

  return {
    privateConversation,
    conversations,
    networkStatus,
    loading,
    count,
    totalCount,
    unreadCount,
    onFetchMore,
    onRefetch,
  };
}
