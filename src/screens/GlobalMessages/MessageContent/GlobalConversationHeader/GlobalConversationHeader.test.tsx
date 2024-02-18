import { QueryClient, QueryClientProvider } from 'react-query';
import { MockedProvider } from '@apollo/client/testing';
import { intersectionObserver } from '@/test-utils/stubs';
import { render } from '@/test-utils';
import { ConversationViewProvider } from '@/features/conversation/contexts/ConversationViewProvider';
import GlobalConversationHeader from './GlobalConversationHeader';

describe('<GlobalConversationHeader />', () => {
  const queryClient = new QueryClient();

  beforeEach(() => intersectionObserver.mock());
  afterEach(() => {
    intersectionObserver.restore();
  });

  test('render test', () => {
    const { container, getByTestId } = render(
      <MockedProvider>
        <QueryClientProvider client={queryClient}>
          <ConversationViewProvider>
            <GlobalConversationHeader />,
          </ConversationViewProvider>
        </QueryClientProvider>
      </MockedProvider>,
    );
    expect(getByTestId('conversionheader-wrapper')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});
