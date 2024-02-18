import { QueryClientProvider, QueryClient } from 'react-query';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/apollo/client';
import { render } from '@/test-utils';
import { TwilioClientV3Provider } from '@/providers/TwilioClientV3Provider';
import { HomeOwnerChatItem } from './HomeOwnerChatItem';

const testSid = 'CH824d89b7a571474681dc1782770cdff5';
const queryClient = new QueryClient();

describe('<HomeOwnerChatItem />', () => {
  it('renders', () => {
    const { getByTestId } = render(
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <TwilioClientV3Provider>
            <HomeOwnerChatItem index={0} sid={testSid} onClick={vi.fn()} />
          </TwilioClientV3Provider>
        </QueryClientProvider>
      </ApolloProvider>,
    );
    expect(getByTestId('chatitem-testid')).toBeInTheDocument();
  });
});
