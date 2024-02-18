import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { intersectionObserver } from '@/test-utils/stubs';
import { cleanup, render, screen } from '@/test-utils';
import { NoumAdsModal } from './NoumAdsModal';

describe('<NoumAdsModal />', () => {
  beforeAll(() => intersectionObserver.mock());
  afterAll(() => {
    cleanup();
    intersectionObserver.restore();
  });

  it('renders', () => {
    const handleClose = vi.fn();
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <NoumAdsModal isOpen={true} onClose={handleClose} />
      </ApolloProvider>,
    );

    const modal = screen.getByTestId('noum-ads-modal');
    expect(modal).toBeInTheDocument();
  });
});
