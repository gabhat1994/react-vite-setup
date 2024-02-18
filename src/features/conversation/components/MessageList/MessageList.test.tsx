import { MockedProvider } from '@apollo/client/testing';
import { intersectionObserver } from '@/test-utils/stubs';
import { render } from '@/test-utils';
import { useConversation } from '../../hooks/globalMessages/useConversation';
import { useConversationParticipants } from '../../hooks/globalMessages/useConversationParticipants';
import { useConversationMessages } from '../../hooks/globalMessages/useConversationMessages';
import { MessageList } from './MessageList';
import { mockedConversation } from '../../mocks';

vi.mock('../../hooks/useConversation');
const useConversationMock = vi.mocked(useConversation);

vi.mock('../../hooks/useConversationParticipants');
const useConversationPartipantsMock = vi.mocked(useConversationParticipants);

vi.mock('../../hooks/useConversationMessages');
const useConversationMessagesMock = vi.mocked(useConversationMessages);

describe('<MessageList />', () => {
  useConversationMock.mockReturnValue({
    conversation: mockedConversation(),
    participants: [],
  });

  useConversationPartipantsMock.mockReturnValue({
    participants: [],
    status: 'success',
  });

  useConversationMessagesMock.mockReturnValue({
    status: 'success',
    isFetched: false,
    isLoading: false,
    hasPreviousPage: true,
    sendMessage: vi.fn(),
    sendFile: vi.fn(),
    fetchPreviousMessages: vi.fn(),
    messages: [],
    pendingMessages: [],
    conversation: mockedConversation(),
  });

  beforeEach(() => intersectionObserver.mock());
  afterEach(() => {
    intersectionObserver.restore();
  });

  test('render', () => {
    const { container } = render(
      <MockedProvider>
        <MessageList />
      </MockedProvider>,
    );

    expect(container).toBeTruthy();
  });
});
