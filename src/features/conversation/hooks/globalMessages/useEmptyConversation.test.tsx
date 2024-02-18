import { type FC } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { act, renderHook } from '@/test-utils';
import { useEmptyConversation } from './useEmptyConversation';

const wrapper: FC = ({ children }) => (
  <MockedProvider>
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  </MockedProvider>
);

describe('custom hook: useEmptyConversation', () => {
  test('hook methods', async () => {
    const { result } = renderHook(
      () => useEmptyConversation({ participantIds: [] }),
      {
        wrapper,
      },
    );

    expect(result.current.isInitialized).toBeFalsy();

    await act(async () => {
      const created = await result.current.createConversationAndSendMessage(
        'test',
      );
      expect(created).toBeUndefined();
    });
    act(() => {
      const participant = result.current.getParticipantById('test');
      expect(participant).toBeUndefined();
    });
  });
});
