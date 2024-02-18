import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render, screen, fireEvent } from '@/test-utils';
import { ChamberDiscardChange } from './Modal';

const onSuccess = vi.fn();
const onClose = vi.fn();
describe('<ChamberDiscardChange />', () => {
  test('renders', () => {
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ChamberDiscardChange isOpen handleClose={onClose} spaceId="XXXXX" handleSuccess={onSuccess} />
      </ApolloProvider>,
    );

    const modal = screen.getByTestId('testChamberDiscardChange');
    expect(modal).toBeInTheDocument();

    const modalTitle = screen.getByTestId('titleChamberDiscardChange');
    expect(modalTitle).toBeInTheDocument();

    const modalBody = screen.getByTestId('bodyChamberDiscardChange');
    expect(modalBody).toBeInTheDocument();

    const modalBtn1 = screen.getByTestId('confirmChamberDiscardChange');
    expect(modalBtn1).toBeInTheDocument();

    const modalBtn2 = screen.getByTestId('saveAsDraftChamberDiscardChange');
    expect(modalBtn2).toBeInTheDocument();

    const modalBtn3 = screen.getByTestId('continueEditingChamberDiscardChange');
    expect(modalBtn3).toBeInTheDocument();
  });

  test('closes on `Escape` key press and backdrop click', () => {
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ChamberDiscardChange isOpen handleClose={onClose} spaceId="XXXXX" handleSuccess={onSuccess}  />
      </ApolloProvider>,
    );

    fireEvent.keyDown(screen.getByTestId('testChamberDiscardChange'), {
      code: 'Escape',
    });
    expect(onClose).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalled();
  });

  test('closes confirm clicked', () => {
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ChamberDiscardChange isOpen handleClose={onClose} spaceId="XXXXX" handleSuccess={onSuccess} />
      </ApolloProvider>,
    );

    const modalBtn1 = screen.getByTestId('confirmChamberDiscardChange');
    expect(modalBtn1).toBeInTheDocument();
  });
});
