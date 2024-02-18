import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render, screen, fireEvent } from '@/test-utils';
import { ElementTypeEnum } from '@/apollo/generated/types';
import { ElementDelete } from './Modal';

describe('<ElementDelete />', () => {
  test('renders', () => {
    const onClose = vi.fn();
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ElementDelete
          isOpen
          handleClose={onClose}
          spaceId="XXXXX"
          elementId="YYYYY"
          elementTitle="My Element"
          elementType={ElementTypeEnum.Message}
        />
      </ApolloProvider>,
    );

    const modal = screen.getByTestId('testElementDelete');
    expect(modal).toBeInTheDocument();

    const modalTitle = screen.getByTestId('testElementDelete');
    expect(modalTitle).toBeInTheDocument();

    const modalBody = screen.getByTestId('bodyElementDelete');
    expect(modalBody).toBeInTheDocument();

    const modalExtraBodyMsg = screen.getByTestId('extraBodyElementDelete');
    expect(modalExtraBodyMsg).toBeInTheDocument();

    const modalBtn1 = screen.getByTestId('confirmElementDelete');
    expect(modalBtn1).toBeInTheDocument();

    const modalBtn2 = screen.getByTestId('cancelElementDelete');
    expect(modalBtn2).toBeInTheDocument();
  });

  test('closes on `Escape` key press and backdrop click', () => {
    const onClose = vi.fn();
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ElementDelete
          isOpen
          handleClose={onClose}
          spaceId="XXXXX"
          elementId="YYYYY"
          elementTitle="My Element"
          elementType={ElementTypeEnum.Image}
        />
      </ApolloProvider>,
    );

    fireEvent.keyDown(screen.getByTestId('testElementDelete'), {
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
        <ElementDelete
          isOpen
          handleClose={onClose}
          spaceId="XXXXX"
          elementId="YYYYY"
          elementTitle="My Element"
          elementType={ElementTypeEnum.Image}
        />
      </ApolloProvider>,
    );

    const modalBtn1 = screen.getByTestId('confirmElementDelete');
    expect(modalBtn1).toBeInTheDocument();
  });
});
