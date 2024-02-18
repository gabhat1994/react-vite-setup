import { type FC } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { act, renderHook } from '@/test-utils';
import { useGetConversation } from './useGetConversation';

const wrapper: FC = ({ children }) => (
  <MockedProvider>
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  </MockedProvider>
);

describe('custom hook: useGetConversation', () => {
  test('hook methods', async () => {
    const { result } = renderHook(
      () => useGetConversation({ participantIds: ['test_id'] }),
      {
        wrapper,
      },
    );

    await act(async () => {
      const { isInitialized, sid } = await result.current.getConversationInfo();
      expect(isInitialized).toBeTruthy();
      expect(sid).toBeFalsy();
    });
  });
});
