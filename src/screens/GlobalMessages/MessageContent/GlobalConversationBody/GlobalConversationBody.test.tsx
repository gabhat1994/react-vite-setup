import { QueryClient, QueryClientProvider } from 'react-query';
import { MockedProvider } from '@apollo/client/testing';
import { intersectionObserver } from '@/test-utils/stubs';
import { render } from '@/test-utils';
import { ConversationViewProvider } from '@/features/conversation/contexts/ConversationViewProvider';
import { GlobalConversationBody } from './GlobalConversationBody';

describe('<GlobalConversationBody />', () => {
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
            <GlobalConversationBody />,
          </ConversationViewProvider>
        </QueryClientProvider>
      </MockedProvider>,
    );
    expect(getByTestId('conversionbody-wrapper')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});
