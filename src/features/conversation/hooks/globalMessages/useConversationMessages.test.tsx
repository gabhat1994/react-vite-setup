import { type FC } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { act, renderHook } from '@/test-utils';
import { useConversationMessages } from './useConversationMessages';

const wrapper: FC = ({ children }) => (
  <MockedProvider>
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  </MockedProvider>
);

describe('custom hook: useConversationHandlers', () => {
  test('hook methods', async () => {
    const onMessage = vi.fn();
    const { result } = renderHook(
      () =>
        useConversationMessages({
          sid: '',
          onMessage,
          pageSize: 10,
        }),
      {
        wrapper,
      },
    );

    expect(result.current.status).toBe('idle');
    expect(result.current.isFetched).toBeFalsy();
    expect(result.current.messages.length).toBe(0);
    expect(result.current.pendingMessages.length).toBe(0);
    await act(async () => {
      const sent = await result.current.sendMessage('test');
      expect(sent).toBeUndefined();
    });
    await act(async () => {
      const sentFile = await result.current.sendFile(
        new File(['testFile'], 'test'),
      );
      expect(sentFile).toBeUndefined();
    });
  });
});
