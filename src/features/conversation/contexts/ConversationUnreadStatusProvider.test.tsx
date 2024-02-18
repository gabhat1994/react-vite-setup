import { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@/test-utils';
import {
  CurrentUserDocument,
  type CurrentUserQuery,
  GetConversationByCidDocument,
  type GetConversationByCidQuery,
  GetUnreadMessageCountDocument,
  type GetUnreadMessageCountQuery,
} from '@/apollo/graphql';
import { PushNotificationProvider } from '@/features/push-notifications/contexts/PushNotification/provider';
import { ConversationUnreadStatusContext } from './ConversationUnreadStatusContext';
import { ConversationUnreadStatusProvider } from './ConversationUnreadStatusProvider';

vi.mock('@/hooks/fcmDeviceToken', async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { useFCMDeviceToken } = await vi.importActual<any>(
    '@/hooks/fcmDeviceToken.stub',
  );
  return {
    useFCMDeviceToken,
  };
});

const TestComponent = () => {
  const { unreadConversationsCount, readConversation } = useContext(
    ConversationUnreadStatusContext,
  );

  return (
    <>
      <p data-testid="unreadConversationsCount">{unreadConversationsCount}</p>
      <button type="button" onClick={() => readConversation('')}>
        read
      </button>
    </>
  );
};

const queryClient = new QueryClient();

const currentUserMock: MockedResponse<CurrentUserQuery> = {
  request: {
    query: CurrentUserDocument,
  },
  result: () => ({
    data: {
      currentUser: {
        _id: '624fbb408eaeb3c5fbe40eb2',
        access: true,
        userStatus: 'ACTIVE',
      },
    },
  }),
};

const getConversationByCidMock: MockedResponse<GetConversationByCidQuery> = {
  request: {
    query: GetConversationByCidDocument,
    variables: {
      cid: '62ea135bdbe0c8000e653f54',
    },
  },
  result: () => ({
    data: { getConversationByCid: { _id: '62ea135bdbe0c8000e653f54' } },
  }),
};

const getUnreadMessageCountMock: MockedResponse<GetUnreadMessageCountQuery> = {
  request: {
    query: GetUnreadMessageCountDocument,
  },
  result: () => ({ data: { getUnreadMessageCount: 1 } }),
};

const mocks = (): MockedResponse[] => [
  currentUserMock,
  getConversationByCidMock,
  getUnreadMessageCountMock,
];

describe('ActiveConversationProvider', () => {
  it('activeConversationSid, setActiveConversationSid', async () => {
    const { getByText, getByTestId } = render(
      <MockedProvider mocks={mocks()}>
        <QueryClientProvider client={queryClient}>
          <PushNotificationProvider>
            <ConversationUnreadStatusProvider>
              <TestComponent />
            </ConversationUnreadStatusProvider>
          </PushNotificationProvider>
        </QueryClientProvider>
      </MockedProvider>,
    );

    expect(getByTestId('unreadConversationsCount').textContent).toBe('0');

    await waitFor(() => fireEvent.click(getByText('read')));
  });
});
