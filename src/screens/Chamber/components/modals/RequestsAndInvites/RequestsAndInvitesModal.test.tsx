import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { intersectionObserver } from '@/test-utils/stubs';
import { cleanup, fireEvent, render, screen } from '@/test-utils';
import { AuthProvider } from '@/features/auth/contexts';
import { client } from '@/apollo/client';
import { RequestsAndInvitesModal } from './RequestsAndInvitesModal';

describe('<RequestsAndInvitesModal />', () => {
  beforeEach(() => intersectionObserver.mock());
  afterEach(() => {
    cleanup();
    intersectionObserver.restore();
  });
  test('renders', async () => {
    const onClose = vi.fn();
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <AuthProvider client={client}>
          <RequestsAndInvitesModal
            isChambersScreen
            isOpen
            handleClose={onClose}
          />
        </AuthProvider>
      </ApolloProvider>,
    );

    const modal = screen.getByTestId('testRequestsAndInvites');
    expect(modal).toBeInTheDocument();
  });

  test('closes on `Escape` key press and backdrop click', () => {
    const onClose = vi.fn();
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <RequestsAndInvitesModal isOpen handleClose={onClose} />
      </ApolloProvider>,
    );

    fireEvent.keyDown(screen.getByTestId('testRequestsAndInvites'), {
      code: 'Escape',
    });
    expect(onClose).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalled();
  });
});
