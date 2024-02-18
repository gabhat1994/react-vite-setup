import { QueryClient, QueryClientProvider } from 'react-query';
import { MockedProvider } from '@apollo/client/testing';
import { intersectionObserver } from '@/test-utils/stubs';
import { render } from '@/test-utils';
import { ConversationBody } from './ConversationBody';
import { MessageElementProvider } from '../contexts/MessageElementProvider';

describe('<ConversationBody />', () => {
  const queryClient = new QueryClient();

  beforeEach(() => intersectionObserver.mock());
  afterEach(() => {
    intersectionObserver.restore();
  });

  test('render test', () => {
    const { container, getByTestId } = render(
      <MockedProvider>
        <QueryClientProvider client={queryClient}>
          <MessageElementProvider>
            <ConversationBody />,
          </MessageElementProvider>
        </QueryClientProvider>
      </MockedProvider>,
    );
    expect(getByTestId('conversionbody-wrapper')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});
