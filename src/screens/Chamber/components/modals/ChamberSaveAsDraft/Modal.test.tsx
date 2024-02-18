import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render, screen, fireEvent, waitFor } from '@/test-utils';
import ChamberSaveAsDraft from './Modal';

describe('<ChamberSaveAsDraft />', () => {
  test('renders', () => {
    const onClose = vi.fn();
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ChamberSaveAsDraft isOpen handleClose={onClose} spaceId="XXXXX" />
      </ApolloProvider>,
    );

    const modal = screen.getByTestId('testChamberSaveAsDraft');
    expect(modal).toBeInTheDocument();

    const modalTitle = screen.getByTestId('titleChamberSaveAsDraft');
    expect(modalTitle).toBeInTheDocument();
    expect(modalTitle).toHaveTextContent('Save as a draft');

    const modalBody = screen.getByTestId('bodyChamberSaveAsDraft');
    expect(modalBody).toBeInTheDocument();
    expect(modalBody).toHaveTextContent(
      'This version will be saved as a draft. It won’t be visible to others, until you publish your changes.',
    );

    const modalBtn1 = screen.getByTestId('confirmChamberSaveAsDraft');
    expect(modalBtn1).toBeInTheDocument();
    expect(modalBtn1).toHaveTextContent('Save as a Draft');

    const modalBtn2 = screen.getByTestId('cancelChamberSaveAsDraft');
    expect(modalBtn2).toBeInTheDocument();
    expect(modalBtn2).toHaveTextContent('Cancel');
  });

  test('closes on `Escape` key press and backdrop click', () => {
    const onClose = vi.fn();
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ChamberSaveAsDraft isOpen handleClose={onClose} spaceId="XXXXX" />
      </ApolloProvider>,
    );

    fireEvent.keyDown(screen.getByTestId('testChamberSaveAsDraft'), {
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
        <ChamberSaveAsDraft isOpen handleClose={onClose} spaceId="XXXXX" />
      </ApolloProvider>,
    );

    const modalBtn1 = screen.getByTestId('confirmChamberSaveAsDraft');
    expect(modalBtn1).toBeInTheDocument();

    fireEvent.click(modalBtn1);

    waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });
});
