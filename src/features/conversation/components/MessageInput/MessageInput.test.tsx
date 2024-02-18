import { QueryClient, QueryClientProvider } from 'react-query';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@/test-utils';
import { MessageInput } from './MessageInput';

describe('<MessageInput />', () => {
  const queryClient = new QueryClient();

  test('render test', () => {
    const { container } = render(
      <MockedProvider>
        <QueryClientProvider client={queryClient}>
          <MessageInput onSendMessage={vi.fn()} />
        </QueryClientProvider>
      </MockedProvider>,
    );
    expect(container).toBeTruthy();
  });
});
