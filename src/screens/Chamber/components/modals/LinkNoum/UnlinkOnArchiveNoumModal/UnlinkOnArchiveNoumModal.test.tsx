import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { intersectionObserver } from '@/test-utils/stubs';
import { fireEvent, render, screen, cleanup } from '@/test-utils';
import { UnlinkOnArchiveNoumModal } from './UnlinkOnArchiveNoumModal';

describe('<UnlinkOnArchiveNoumModal />', () => {
  const handleClose = vi.fn();
  const handleUnlinking = vi.fn();

  beforeAll(() => intersectionObserver.mock());
  afterAll(() => {
    cleanup();
    intersectionObserver.restore();
  });

  test('renders', () => {
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <UnlinkOnArchiveNoumModal
          isOpen={true}
          handleClose={handleClose}
          handleUnlinking={handleUnlinking}
          loading={false}
        />
      </ApolloProvider>,
    );

    const modal = screen.getByTestId('unlink-archive-noum-modal');
    expect(modal).toBeInTheDocument();
  });

  test('accept button works', () => {
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <UnlinkOnArchiveNoumModal
          isOpen={true}
          handleClose={handleClose}
          handleUnlinking={handleUnlinking}
          loading={false}
        />
      </ApolloProvider>,
    );

    const linkNoumButton = screen.getByTestId('enable-linking');
    expect(linkNoumButton).toBeInTheDocument();

    fireEvent.click(linkNoumButton);
    expect(handleUnlinking).toHaveBeenCalled();
  });

  test('cancel button works', () => {
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <UnlinkOnArchiveNoumModal
          isOpen={true}
          handleClose={handleClose}
          handleUnlinking={handleUnlinking}
          loading={false}
        />
      </ApolloProvider>,
    );

    const cancelLinkNoumButton = screen.getByTestId('cancel-linking');
    expect(cancelLinkNoumButton).toBeInTheDocument();

    fireEvent.click(cancelLinkNoumButton);
    expect(handleClose).toHaveBeenCalled();
  });
});
