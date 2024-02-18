import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render, screen, fireEvent } from '@/test-utils';
import { CloseWallet } from './Modal';

describe('<CloseWallet />', () => {
  test('renders', () => {
    const onClose = vi.fn();
    const setShowNonZeroWalletModal = vi.fn();
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <CloseWallet
          isOpen
          handleClose={onClose}
          spaceId="XXXXX"
          elementId="YYYYY"
          setShowNonZeroWalletModal={setShowNonZeroWalletModal}
        />
      </ApolloProvider>,
    );

    const modal = screen.getByTestId('testCloseWallet');
    expect(modal).toBeInTheDocument();

    const modalTitle = screen.getByTestId('testCloseWallet');
    expect(modalTitle).toBeInTheDocument();

    const modalBtn1 = screen.getByTestId('cancelCloseWallet');
    expect(modalBtn1).toBeInTheDocument();
  });

  test('closes on `Escape` key press and backdrop click', () => {
    const onClose = vi.fn();
    const setShowNonZeroWalletModal = vi.fn();
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <CloseWallet
          isOpen
          handleClose={onClose}
          spaceId="XXXXX"
          elementId="YYYYY"
          setShowNonZeroWalletModal={setShowNonZeroWalletModal}
        />
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
    const setShowNonZeroWalletModal = vi.fn();
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <CloseWallet
          isOpen
          handleClose={onClose}
          spaceId="XXXXX"
          elementId="YYYYY"
          setShowNonZeroWalletModal={setShowNonZeroWalletModal}
        />
      </ApolloProvider>,
    );

    const modalBtn1 = screen.getByTestId('cancelCloseWallet');
    expect(modalBtn1).toBeInTheDocument();
  });
});
