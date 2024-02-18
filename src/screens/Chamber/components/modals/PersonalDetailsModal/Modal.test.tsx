import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render, screen } from '@/test-utils';
import { PersonalDetailsModal } from './Modal';

describe('<PersonalDetailsModal />', () => {
  test('renders', () => {
    const onClose = vi.fn();
    const onSuccess = vi.fn();
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <PersonalDetailsModal
          isOpen
          handleClose={onClose}
          spaceId="XXXXX"
          handleSuccess={onSuccess}
        />
      </ApolloProvider>,
    );

    const modal = screen.getByTestId('testPersonalDetailsModal');
    expect(modal).toBeInTheDocument();
  });
});
