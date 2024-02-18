import { type FC } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@/test-utils';
import { useConversationParticipants } from './useConversationParticipants';

const wrapper: FC = ({ children }) => (
  <MockedProvider>
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  </MockedProvider>
);

describe('custom hook: useConversationParticipants', () => {
  test('hook methods', () => {
    const { result } = renderHook(
      () =>
        useConversationParticipants({
          sid: '',
        }),
      {
        wrapper,
      },
    );

    expect(result.current.participants.length).toBe(0);
    expect(result.current.status).toBe('idle');
  });
});
