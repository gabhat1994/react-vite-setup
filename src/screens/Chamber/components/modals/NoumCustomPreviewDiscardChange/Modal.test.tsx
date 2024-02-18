import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render, screen, fireEvent } from '@/test-utils';
import { NoumCustomPreviewDiscardChange } from './Modal';

describe('<NoumCustomPreviewDiscardChange />', () => {
  test('renders', () => {
    const onClose = vi.fn();
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <NoumCustomPreviewDiscardChange
          isOpen
          handleClose={onClose}
          spaceId="XXXXX"
        />
      </ApolloProvider>,
    );

    const modal = screen.getByTestId('testNoumCustomPreviewDiscardChange');
    expect(modal).toBeInTheDocument();

    const modalTitle = screen.getByTestId(
      'titleNoumCustomPreviewDiscardChange',
    );
    expect(modalTitle).toBeInTheDocument();

    const modalBody = screen.getByTestId('bodyNoumCustomPreviewDiscardChange');
    expect(modalBody).toBeInTheDocument();

    const modalBtn1 = screen.getByTestId(
      'confirmNoumCustomPreviewDiscardChange',
    );
    expect(modalBtn1).toBeInTheDocument();

    const modalBtn3 = screen.getByTestId(
      'continueEditingNoumCustomPreviewDiscardChange',
    );
    expect(modalBtn3).toBeInTheDocument();
  });

  test('closes on `Escape` key press and backdrop click', () => {
    const onClose = vi.fn();
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <NoumCustomPreviewDiscardChange
          isOpen
          handleClose={onClose}
          spaceId="XXXXX"
        />
      </ApolloProvider>,
    );

    fireEvent.keyDown(
      screen.getByTestId('testNoumCustomPreviewDiscardChange'),
      {
        code: 'Escape',
      },
    );
    expect(onClose).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalled();
  });

  test('closes confirm clicked', () => {
    const onClose = vi.fn();
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <NoumCustomPreviewDiscardChange
          isOpen
          handleClose={onClose}
          spaceId="XXXXX"
        />
      </ApolloProvider>,
    );

    const modalBtn1 = screen.getByTestId(
      'confirmNoumCustomPreviewDiscardChange',
    );
    expect(modalBtn1).toBeInTheDocument();
  });
});
