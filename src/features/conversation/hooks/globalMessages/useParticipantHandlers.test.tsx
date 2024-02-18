import { type FC } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { act, renderHook } from '@/test-utils';
import { useParticipantHandlers } from './useParticipantHandlers';

const wrapper: FC = ({ children }) => (
  <MockedProvider>
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  </MockedProvider>
);

describe('custom hook: useParticipantHandlers', () => {
  test('hook methods', () => {
    const { result } = renderHook(() => useParticipantHandlers(), {
      wrapper,
    });
    const participant = {
      sid: '',
      state: '',
    } as never;

    act(() => {
      const added = result.current.addConversationParticipant({
        participant,
      });
      expect(added).toBeUndefined();
      const updated = result.current.updateConversationParticipant({
        participant,
      });
      expect(updated).toBeUndefined();
      const removed = result.current.removeConversationParticipant({
        participant,
      });
      expect(removed).toBeUndefined();
    });
  });
});
