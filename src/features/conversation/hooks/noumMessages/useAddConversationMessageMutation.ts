import { type InfiniteData, useMutation, useQueryClient } from 'react-query';

import { type Message, RestPaginator } from '@twilio/conversations';
import { type MessagesPaginator } from '../globalMessages/useConversationMessages';

export function useAddConversationMessageMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync: addMessageMutation } = useMutation<
    void,
    unknown,
    { message: Message }
  >({
    mutationFn: async ({ message }) => {
      const existingMessages = queryClient.getQueryData<
        InfiniteData<MessagesPaginator>
      >(['messages', message.conversation.sid]);

      // No messages so far, so let's prefetch the initial page.
      if (!existingMessages || existingMessages.pages.length === 0) {
        return queryClient.invalidateQueries([
          'messages',
          message.conversation.sid,
        ]);
      }

      // Add the new message to the last page in the cache.
      queryClient.setQueryData<InfiniteData<MessagesPaginator>>(
        ['messages', message.conversation.sid],
        (data) => {
          if (!data || data.pages.length === 0) {
            // This should never happen, as we already check for empty cache above
            return {
              pageParams: [() => {}],
              pages: [new RestPaginator([message], () => {}, null, null)],
            };
          }

          const lastPage = data.pages[data.pages.length - 1];
          return {
            pages: [
              ...data.pages.slice(0, -1),
              {
                ...lastPage,
                items: [
                  ...lastPage.items.filter((item) => item.sid !== message.sid),
                  message,
                ],
              },
            ],
            pageParams: data.pageParams,
          };
        },
      );

      return undefined;
    },
  });

  return addMessageMutation;
}
