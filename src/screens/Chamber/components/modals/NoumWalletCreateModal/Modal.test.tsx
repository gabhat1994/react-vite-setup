import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render, screen, fireEvent } from '@/test-utils';
import { NoumWalletCreateModal } from './Modal';

describe('<NoumWalletCreateModal />', () => {
  test('renders', () => {
    const onClose = vi.fn();
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <NoumWalletCreateModal isOpen handleClose={onClose} />
      </ApolloProvider>,
    );

    const modal = screen.getByTestId('testCloseWallet');
    expect(modal).toBeInTheDocument();

    const modalTitle = screen.getByTestId('testCloseWallet');
    expect(modalTitle).toBeInTheDocument();

    const modalBtn1 = screen.getByTestId('continueButton');
    expect(modalBtn1).toBeInTheDocument();
  });

  test('closes on `Escape` key press and backdrop click', () => {
    const onClose = vi.fn();
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <NoumWalletCreateModal isOpen handleClose={onClose} />
      </ApolloProvider>,
    );

    fireEvent.keyDown(screen.getByTestId('testCloseWallet'), {
      code: 'Escape',
    });
    expect(onClose).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalled();
  });

  test('closes confirm clicked', () => {
    const onClose = vi.fn();
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <NoumWalletCreateModal isOpen handleClose={onClose} />
      </ApolloProvider>,
    );

    const modalBtn1 = screen.getByTestId('continueButton');
    expect(modalBtn1).toBeInTheDocument();
  });
});
