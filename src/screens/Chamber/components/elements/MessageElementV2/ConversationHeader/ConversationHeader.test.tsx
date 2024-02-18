import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { intersectionObserver } from '@/test-utils/stubs';
import { render } from '@/test-utils';
import { useConversationDetails } from '@/features/conversation/hooks/noumMessages/useConversationDetails';
import { ConversationType, ViewMode } from '@/features/conversation/types';
import { useMessageElement } from '../contexts/MessageElementProvider';
import { ConversationHeader } from './ConversationHeader';

vi.mock('../contexts/MessageElementProvider');
const useMessageElementMock = vi.mocked(useMessageElement);
const useMessageElementReturnValue = {
  loading: false,
  space: undefined,
  spaceId: undefined,
  isCollapse: false,
  isMasterNoum: false,
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

vi.mock('@/hooks/spaceConversations/useConversationDetails');
const useConversationDetailsMock = vi.mocked(useConversationDetails);
const useConversationDeatilsReturnValue = {
  title: '',
  users: [],
  participants: [],
  isGroupConversation: false,
  isBlocked: false,
  getUserById: vi.fn(),
  loading: false,
};

const Component: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <MemoryRouter>
      <MockedProvider>
        <QueryClientProvider client={queryClient}>
          <ConversationHeader />
        </QueryClientProvider>
      </MockedProvider>
    </MemoryRouter>
  );
};

describe('<ConversationBody />', () => {
  beforeEach(() => intersectionObserver.mock());
  afterEach(() => {
    intersectionObserver.restore();
  });

  test('render test', () => {
    useMessageElementMock.mockReturnValue({
      ...useMessageElementReturnValue,
    });

    useConversationDetailsMock.mockReturnValue({
      ...useConversationDeatilsReturnValue,
    });

    const { container, getByTestId } = render(<Component />);
    expect(getByTestId('conversationheader-wrapper')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });

  test('render new conversation mode', () => {
    useMessageElementMock.mockReturnValue({
      ...useMessageElementReturnValue,
      isNewConversation: true,
    });

    const { container, getByTestId } = render(<Component />);
    expect(getByTestId('conversationheader-wrapper')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });

  test('render collapse button', () => {
    useMessageElementMock.mockReturnValue({
      ...useMessageElementReturnValue,
      viewMode: ViewMode.FULLCONVERSATION,
    });

    const { container, getByTestId } = render(<Component />);
    expect(getByTestId('conversationheader-wrapper')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});
