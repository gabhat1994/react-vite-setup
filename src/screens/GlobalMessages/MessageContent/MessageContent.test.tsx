import { QueryClient, QueryClientProvider } from 'react-query';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@/test-utils';
import MessageContent from './MessageContent';

const queryClient = new QueryClient();

describe('<MessageContent />', () => {
  test('rendering test', () => {
    const { container } = render(
      <MockedProvider addTypename={false}>
        <QueryClientProvider client={queryClient}>
          <MessageContent />
        </QueryClientProvider>
      </MockedProvider>,
    );

    expect(container).toBeTruthy();
  });
});
