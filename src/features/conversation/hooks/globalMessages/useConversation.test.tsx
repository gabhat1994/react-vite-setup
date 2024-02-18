import { type FC } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@/test-utils';
import { useConversation } from './useConversation';

const wrapper: FC = ({ children }) => (
  <MockedProvider>
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  </MockedProvider>
);

describe('custom hook: useConversation', () => {
  test('hook methods', () => {
    const { result } = renderHook(() => useConversation({ sid: '' }), {
      wrapper,
    });

    expect(result.current.conversation).toBeUndefined();
    expect(result.current.conversationType).toBeUndefined();
    expect(result.current.participants.length).toBe(0);
  });
});
