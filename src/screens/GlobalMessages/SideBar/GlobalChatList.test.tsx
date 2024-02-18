import { MockedProvider } from '@apollo/client/testing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@/test-utils';
import { GlobalChatList } from './GlobalChatList';

describe('<GlobalChatList />', () => {
  test('rendering test', () => {
    const { container } = render(
      <MockedProvider>
        <BrowserRouter>
          <QueryClientProvider client={new QueryClient()}>
            <GlobalChatList selectedTabId={1} handleCreateNewConv={() => {}} />
          </QueryClientProvider>
        </BrowserRouter>
      </MockedProvider>,
    );

    expect(container).toBeTruthy();
  });
});
