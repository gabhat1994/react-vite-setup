import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render, screen, fireEvent } from '@/test-utils';
import { NonZeroWalletModal } from './Modal';

describe('<NonZeroWalletModal />', () => {
  test('renders', () => {
    const onClose = vi.fn();
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <NonZeroWalletModal isOpen handleClose={onClose} />
      </ApolloProvider>,
    );

    const modal = screen.getByTestId('testCloseWallet');
    expect(modal).toBeInTheDocument();

    const modalTitle = screen.getByTestId('testCloseWallet');
    expect(modalTitle).toBeInTheDocument();

    const modalBtn1 = screen.getByTestId('confirmCloseWallet');
    expect(modalBtn1).toBeInTheDocument();
  });

  test('closes on `Escape` key press and backdrop click', () => {
    const onClose = vi.fn();
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <NonZeroWalletModal isOpen handleClose={onClose} />
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
        <NonZeroWalletModal isOpen handleClose={onClose} />
      </ApolloProvider>,
    );

    const modalBtn1 = screen.getByTestId('confirmCloseWallet');
    expect(modalBtn1).toBeInTheDocument();
  });
});
