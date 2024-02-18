import { type FC } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@/test-utils';
import { UserStatus } from '@/apollo/generated/types';
import { useConversationDetails } from './useConversationDetails';
import { useConversation } from './useConversation';
import { mockedConversation } from '../../mocks';

vi.mock('./useConversation');
const useConversationMock = vi.mocked(useConversation);

const wrapper: FC = ({ children }) => (
  <MockedProvider>
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  </MockedProvider>
);

describe('custom hook: useConversationDetails', () => {
  beforeEach(() => {
    useConversationMock.mockReturnValue({
      conversation: mockedConversation(),
      participants: [
        {
          _id: 'test',
          firstName: 'John',
          lastName: 'Doe',
          username: 'john_doe',
          userStatus: UserStatus.Active,
        },
      ],
    });
  });
  test('hook methods', () => {
    const { result } = renderHook(() => useConversationDetails({ sid: '' }), {
      wrapper,
    });

    expect(result.current.title).toBe('John Doe');
    expect(result.current.users.length).toBe(1);
    expect(result.current.isConversationBlocked).toBeFalsy();
    expect(result.current.isGroupConversation).toBeFalsy();
  });
});
