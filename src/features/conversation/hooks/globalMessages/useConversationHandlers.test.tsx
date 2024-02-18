import { type FC } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { act, renderHook } from '@/test-utils';
import { useConversationHandlers } from './useConversationHandlers';
import { ConversationType } from '../../types';
import { mockedConversation } from '../../mocks';

const wrapper: FC = ({ children }) => (
  <MockedProvider>
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  </MockedProvider>
);

describe('custom hook: useConversationHandlers', () => {
  test('hook methods', () => {
    const { result } = renderHook(
      () => useConversationHandlers(ConversationType.GLOBAL_DIRECT),
      {
        wrapper,
      },
    );

    const conversation = mockedConversation();

    act(() => {
      const added = result.current.addConversation({ conversation });
      expect(added).toBeUndefined();
      const updated = result.current.updateConversation({ conversation });
      expect(updated).toBeUndefined();
      const removed = result.current.removeConversation({ conversation });
      expect(removed).toBeUndefined();
      const bulkAdded = result.current.bulkAddConversations({
        conversations: [conversation],
        isInitialized: true,
      });
      expect(bulkAdded).toBeUndefined();
    });
  });
});
