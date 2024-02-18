import { QueryClient, QueryClientProvider } from 'react-query';
import { MockedProvider } from '@apollo/client/testing';
import { ConversationType, ViewMode } from '@/features/conversation/types';
import { fireEvent, render } from '@/test-utils';
import { useMessageElement } from '../contexts/MessageElementProvider';
import { ChatHeader } from './ChatHeader';

vi.mock('../contexts/MessageElementProvider');
const useMessageElementMock = vi.mocked(useMessageElement);
const useMessageElementReturnValue = {
  loading: false,
  space: undefined,
  spaceId: undefined,
  isMasterNoum: false,
  isCollapse: false,
  setIsCollapse: vi.fn(),
  isNewConversation: false,
  setIsNewConversation: vi.fn(),
  isOthersConversations: false,
  setIsOthersConversations: vi.fn(),
  viewMode: ViewMode.DEFAULT,
  setViewMode: vi.fn(),
  unreadMessages: 0,
  setUnreadMessages: vi.fn(),
  conversationType: ConversationType.HOME_OWNER,
  setConversationType: vi.fn(),
  conversationWrapperWidth: 0,
  setConversationWrapperWidth: vi.fn(),
};

const queryClient = new QueryClient();

describe('<ChatHeader />', () => {
  test('render', () => {
    useMessageElementMock.mockReturnValue({
      ...useMessageElementReturnValue,
    });
    const { container } = render(
      <MockedProvider>
        <QueryClientProvider client={queryClient}>
          <ChatHeader />
        </QueryClientProvider>
      </MockedProvider>,
    );
    expect(container).toBeTruthy();
  });

  test('collapse button test', () => {
    useMessageElementMock.mockReturnValue({
      ...useMessageElementReturnValue,
    });
    const { container, getByTestId } = render(
      <MockedProvider>
        <QueryClientProvider client={queryClient}>
          <ChatHeader />
        </QueryClientProvider>
      </MockedProvider>,
    );
    expect(container).toBeTruthy();

    const button = getByTestId('collapse-button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });
});
