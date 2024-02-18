import { useMemo } from 'react';

import { orderBy } from 'lodash';
import { useQuery, useQueryClient, type UseQueryOptions } from 'react-query';

import { useTwilioClient } from '@/features/conversation/hooks/twilioClient';
import { cleanList } from '@/utils/list';
import { type NoumConversation } from '../../types';

type UseConversationListOption = UseQueryOptions<NoumConversation[]>;

export function useConversationsList(
  isOthersConversations: boolean,
  { ...queryOptions }: UseConversationListOption = {},
) {
  const { client: twilioClient, isInitialized } = useTwilioClient();
  const queryClient = useQueryClient();
  const listKey = isOthersConversations
    ? 'others-conversations'
    : 'conversations';
  const itemKey = isOthersConversations
    ? 'others-conversation'
    : 'conversation';

  const privateConversation = queryClient.getQueryData<NoumConversation>([
    'private-conversation',
  ]);

  const conversationsQuery = useQuery<NoumConversation[]>({
    ...queryOptions,
    queryKey: listKey,
    queryFn: async () =>
      orderBy(
        queryClient
          .getQueriesData<NoumConversation>(itemKey)
          .map(([, conversation]) => conversation)
          .filter(
            (conversation) =>
              conversation &&
              conversation.twilioConversation &&
              !!conversation.twilioConversation.lastMessage,
          ),
        (conv) => conv?.twilioConversation?.lastMessage?.dateCreated,
        'desc',
      ),
    staleTime: 20 * 60 * 1000,
    enabled: !!twilioClient && isInitialized,
  });

  const conversations = useMemo(
    () => cleanList([...(conversationsQuery.data || [])]),
    // We need to update the list whenever the cache is updated (dataUpdatedAt).
    // Otherwise, the array has the same reference, but the contents are different,
    // and this useMemo is not triggered.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [conversationsQuery.data, conversationsQuery.dataUpdatedAt],
  );

  return {
    ...conversationsQuery,
    conversations,
    privateConversation,
  };
}
