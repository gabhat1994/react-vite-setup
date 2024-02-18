import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { intersectionObserver } from '@/test-utils/stubs';
import { render } from '@/test-utils';
import { NewHomeConversationUserSelector } from './NewHomeConversationUserSelector';

describe('<AddNewConversatioin />', () => {
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
            <NewHomeConversationUserSelector />
          </QueryClientProvider>
        </MockedProvider>
      </MemoryRouter>,
    );

    expect(getByTestId('newhomeconversation')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});
