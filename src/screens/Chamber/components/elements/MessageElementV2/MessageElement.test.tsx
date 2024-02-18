import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { intersectionObserver } from '@/test-utils/stubs';
import { render } from '@/test-utils';
import { MessageElement } from './MessageElement';

const spaceId = '';
const element = {
  __typename: undefined,
  _id: undefined,
};
const queryClient = new QueryClient();

describe('<MessageElement />', () => {
  beforeEach(() => intersectionObserver.mock());
  afterEach(() => {
    intersectionObserver.restore();
  });

  test('edit mode render test', () => {
    const { container, getByTestId } = render(
      <MockedProvider>
        <QueryClientProvider client={queryClient}>
          <MessageElement spaceId={spaceId} element={element} isEditing />
        </QueryClientProvider>
      </MockedProvider>,
    );
    expect(getByTestId('wrapper')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });

  test('view mode render test', () => {
    const { container, getByTestId } = render(
      <MemoryRouter>
        <MockedProvider>
          <QueryClientProvider client={queryClient}>
            <MessageElement spaceId={spaceId} element={element}>
              <>content</>
            </MessageElement>
          </QueryClientProvider>
        </MockedProvider>
      </MemoryRouter>,
    );
    expect(getByTestId('mew-wrapper')).toBeInTheDocument();
    expect(getByTestId('mew-main-wrapper')).toBeInTheDocument();
    expect(getByTestId('mew-conversation-wrapper')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});
