import { type FC } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { act, renderHook } from '@/test-utils';
import { UserStatus } from '@/apollo/generated/types';
import { useConversationMetadata } from './useConversationMetadata';

const wrapper: FC = ({ children }) => (
  <MockedProvider>
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  </MockedProvider>
);

describe('custom hook: useConversationMetadata', () => {
  test('hook methods', () => {
    const { result } = renderHook(
      () =>
        useConversationMetadata({
          participants: [{ _id: 'test', userStatus: UserStatus.Active }],
        }),
      {
        wrapper,
      },
    );

    expect(result.current.title).toBe('');
    expect(result.current.users.length).toBe(1);
    expect(result.current.isConversationBlocked).toBeFalsy();
    expect(result.current.isGroupConversation).toBeFalsy();
    act(() => {
      const user = result.current.getParticipantById('test');
      expect(user._id).toBe('test');
    });
  });
});
