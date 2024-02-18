import { QueryClientProvider, QueryClient } from 'react-query';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/apollo/client';
import { render } from '@/test-utils';
import { TwilioClientV3Provider } from '@/providers/TwilioClientV3Provider';
import { useConversationDetails } from '@/features/conversation/hooks/noumMessages/useConversationDetails';
import { ChatItem } from './ChatItem';

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

const testSid = 'CH824d89b7a571474681dc1782770cdff5';
const queryClient = new QueryClient();

describe('<ChatItem />', () => {
  useConversationDetailsMock.mockReturnValue({
    ...useConversationDeatilsReturnValue,
  });

  it('renders', () => {
    const { getByTestId } = render(
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <TwilioClientV3Provider>
            <ChatItem index={0} sid={testSid} onClick={() => {}} />
          </TwilioClientV3Provider>
        </QueryClientProvider>
      </ApolloProvider>,
    );
    expect(getByTestId('chatitem-testid')).toBeInTheDocument();
  });
});
