import { type FC } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@/test-utils';
import { useConversationsList } from './useConversationsList';

const wrapper: FC = ({ children }) => (
  <MockedProvider>
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  </MockedProvider>
);

describe('custom hook: useConversationsList', () => {
  test('hook methods', () => {
    const { result } = renderHook(() => useConversationsList(false), {
      wrapper,
    });

    expect(result.current.conversations.length).toBe(0);
  });
});
