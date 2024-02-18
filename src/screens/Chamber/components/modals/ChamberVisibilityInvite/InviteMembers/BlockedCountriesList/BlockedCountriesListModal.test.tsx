import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { intersectionObserver } from '@/test-utils/stubs';
import { render, screen, cleanup } from '@/test-utils';
import { BlockedCountriesListModal } from './BlockedCountriesListModal';

describe('<BlockedCountriesListModal />', () => {
  const onClose = vi.fn();

  beforeAll(() => intersectionObserver.mock());
  afterAll(() => {
    cleanup();
    intersectionObserver.restore();
  });

  test('renders', () => {
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <BlockedCountriesListModal isOpen={true} onClose={onClose} />
      </ApolloProvider>,
    );

    const modal = screen.getByTestId('chamber-blocked-countries-modal');
    expect(modal).toBeInTheDocument();
  });
});
