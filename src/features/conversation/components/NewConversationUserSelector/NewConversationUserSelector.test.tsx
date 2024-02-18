import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { intersectionObserver } from '@/test-utils/stubs';
import { render } from '@/test-utils';
import { NewConversationUserSelector } from './NewConversationUserSelector';

describe('<NewConversationUserSelector />', () => {
  const queryClient = new QueryClient();

  beforeEach(() => intersectionObserver.mock());
  afterEach(() => {
    intersectionObserver.restore();
  });

  test('render test', () => {
    const { container, getByTestId } = render(
      <MemoryRouter>
        <MockedProvider>
          <QueryClientProvider client={queryClient}>
            <NewConversationUserSelector />
          </QueryClientProvider>
        </MockedProvider>
      </MemoryRouter>,
    );

    expect(getByTestId('newconversation')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});
