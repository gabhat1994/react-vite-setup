import { QueryClientProvider, QueryClient } from 'react-query';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/apollo/client';
import { render } from '@/test-utils';
import { TwilioClientV3Provider } from '@/providers/TwilioClientV3Provider';
import { AuthProvider } from '@/features/auth/contexts';
import ChatList from './ChatList';
import { MessageElementProvider } from '../contexts/MessageElementProvider';

const queryClient = new QueryClient();

describe('<ChatList />', () => {
  it('renders', () => {
    const { getByTestId, container } = render(
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider client={client}>
            <TwilioClientV3Provider>
              <MessageElementProvider>
                <ChatList />
              </MessageElementProvider>
            </TwilioClientV3Provider>
          </AuthProvider>
        </QueryClientProvider>
      </ApolloProvider>,
    );
    expect(getByTestId('chatlist-wrapper')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});
