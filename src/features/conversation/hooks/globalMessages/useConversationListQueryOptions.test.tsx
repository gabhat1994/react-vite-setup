import { type FC } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@/test-utils';
import { useConversationListQueryOptions } from './useConversationListQueryOptions';
import { ConversationType } from '../../types';

const wrapper: FC = ({ children }) => (
  <MockedProvider>
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  </MockedProvider>
);

describe('custom hook: useConversationListQueryOptions', () => {
  test('hook methods', async () => {
    const { result } = renderHook(
      () => useConversationListQueryOptions(ConversationType.GLOBAL_ALL),
      {
        wrapper,
      },
    );

    expect(result.current?.conversationType).toBe(ConversationType.GLOBAL_ALL);
    expect(result.current?.variables).not.toBeNull();
  });
});
