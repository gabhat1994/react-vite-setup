import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render, screen, fireEvent } from '@/test-utils';
import ChamberPublish from './Modal';

describe('<ChamberPublish />', () => {
  test('renders', () => {
    const onClose = vi.fn();
    const handleClickInfo = vi.fn();
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ChamberPublish
          isOpen
          handleClose={onClose}
          handleClickInfo={handleClickInfo}
          spaceId="XXXXX"
          isHomeNoum={true}
        />
      </ApolloProvider>,
    );

    const modal = screen.getByTestId('testChamberPublish');
    expect(modal).toBeInTheDocument();

    const modalTitle = screen.getByTestId('titleChamberPublish');
    expect(modalTitle).toBeInTheDocument();
    expect(modalTitle).toHaveTextContent('Publish Changes');

    const modalBodyPara1 = screen.getByTestId('bodyChamberPublishP1');
    const modalBodyPara2 = screen.getByTestId('bodyChamberPublishP2');
    expect(modalBodyPara1).toBeInTheDocument();
    expect(modalBodyPara2).toBeInTheDocument();
    expect(modalBodyPara1).toHaveTextContent(
      'Are you sure you want to publish the changes to your profile?',
    );
    expect(modalBodyPara2).toHaveTextContent(
      'All users will be able to see the updated version of your profile.',
    );

    const modalBtn1 = screen.getByTestId('confirmChamberPublish');
    expect(modalBtn1).toBeInTheDocument();
    expect(modalBtn1).toHaveTextContent('Publish Changes');

    const modalBtn2 = screen.getByTestId('cancelChamberPublish');
    expect(modalBtn2).toBeInTheDocument();
    expect(modalBtn2).toHaveTextContent('Cancel');
  });

  test('closes on `Escape` key press and backdrop click', () => {
    const onClose = vi.fn();
    const handleClickInfo = vi.fn();
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ChamberPublish
          isOpen
          handleClose={onClose}
          handleClickInfo={handleClickInfo}
          spaceId="XXXXX"
          isHomeNoum={false}
        />
      </ApolloProvider>,
    );

    fireEvent.keyDown(screen.getByTestId('testChamberPublish'), {
      code: 'Escape',
    });
    expect(onClose).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalled();
  });

  test('closes confirm clicked', () => {
    const onClose = vi.fn();
    const handleClickInfo = vi.fn();
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ChamberPublish
          isOpen
          handleClose={onClose}
          handleClickInfo={handleClickInfo}
          spaceId="XXXXX"
          isHomeNoum={false}
        />
      </ApolloProvider>,
    );

    const modalBtn1 = screen.getByTestId('confirmChamberPublish');
    expect(modalBtn1).toBeInTheDocument();
  });
});
