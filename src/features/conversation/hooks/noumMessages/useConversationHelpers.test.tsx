import { type FC } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { act, renderHook } from '@/test-utils';
import { useConversationHelpers } from './useConversationHelpers';

const wrapper: FC = ({ children }) => (
  <MockedProvider>
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  </MockedProvider>
);

describe('custom hook: useConversationHandlers', () => {
  test('hook methods', () => {
    const { result } = renderHook(() => useConversationHelpers(), {
      wrapper,
    });

    act(() => {
      const isNoum = result.current.isNoumParticipant({
        sid: '',
        state: '',
      } as never);
      expect(isNoum).toBeTruthy();
    });
  });
});
