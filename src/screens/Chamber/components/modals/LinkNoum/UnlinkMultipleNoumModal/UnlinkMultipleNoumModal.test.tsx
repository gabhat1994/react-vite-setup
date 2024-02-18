import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { intersectionObserver } from '@/test-utils/stubs';
import { fireEvent, render, screen, cleanup } from '@/test-utils';
import { UnlinkMultipleNoumModal } from './UnlinkMultipleNoumModal';

describe('<UnlinkMultipleNoumModal />', () => {
  const handleClose = vi.fn();
  const acceptUnlinking = vi.fn();

  beforeAll(() => intersectionObserver.mock());
  afterAll(() => {
    cleanup();
    intersectionObserver.restore();
  });

  test('renders', () => {
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <UnlinkMultipleNoumModal
          isOpen={true}
          handleClose={handleClose}
          acceptUnlinking={acceptUnlinking}
          linkedNoums={[]}
        />
      </ApolloProvider>,
    );

    const modal = screen.getByTestId('unlink-multiple-noum-modal');
    expect(modal).toBeInTheDocument();
  });

  test('accept button works', () => {
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <UnlinkMultipleNoumModal
          isOpen={true}
          handleClose={handleClose}
          acceptUnlinking={acceptUnlinking}
          linkedNoums={[]}
        />
      </ApolloProvider>,
    );

    const linkNoumButton = screen.getByTestId('enable-linking');
    expect(linkNoumButton).toBeInTheDocument();

    fireEvent.click(linkNoumButton);
    expect(acceptUnlinking).toHaveBeenCalled();
  });

  test('cancel button works', () => {
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <UnlinkMultipleNoumModal
          isOpen={true}
          handleClose={handleClose}
          acceptUnlinking={acceptUnlinking}
          linkedNoums={[]}
        />
      </ApolloProvider>,
    );

    const cancelLinkNoumButton = screen.getByTestId('cancel-linking');
    expect(cancelLinkNoumButton).toBeInTheDocument();

    fireEvent.click(cancelLinkNoumButton);
    expect(handleClose).toHaveBeenCalled();
  });
});
