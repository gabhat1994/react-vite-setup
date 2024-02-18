import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render, screen, fireEvent } from '@/test-utils';
import { RiseProgramCreateNoum } from './Modal';

const onClose = vi.fn();
const setRiseApplicationNoumId = vi.fn();
const setOpenAlreadyCreated = vi.fn();

describe('<RiseProgramCreateNoum />', () => {
  test('renders', () => {
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <BrowserRouter>
          <RiseProgramCreateNoum
            onClose={onClose}
            setRiseApplicationNoumId={setRiseApplicationNoumId}
            setOpenAlreadyCreated={setOpenAlreadyCreated}
          />
        </BrowserRouter>
      </ApolloProvider>,
    );

    const modal = screen.getByTestId('rise-program-create-noum');
    expect(modal).toBeInTheDocument();

    const disconnectBtn = screen.getByTestId('chamber-disconnect-button');
    expect(disconnectBtn).toBeInTheDocument();

    const closeBtn = screen.getByTestId('chamber-close-button');
    expect(closeBtn).toBeInTheDocument();
  });

  test('closes on `Escape` key press and backdrop click', () => {
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <BrowserRouter>
          <RiseProgramCreateNoum
            onClose={onClose}
            setRiseApplicationNoumId={setRiseApplicationNoumId}
            setOpenAlreadyCreated={setOpenAlreadyCreated}
          />
        </BrowserRouter>
      </ApolloProvider>,
    );

    fireEvent.keyDown(screen.getByTestId('rise-program-create-noum'), {
      code: 'Escape',
    });
    expect(onClose).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalled();
  });

  test('closes confirm clicked', () => {
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <BrowserRouter>
          <RiseProgramCreateNoum
            onClose={onClose}
            setRiseApplicationNoumId={setRiseApplicationNoumId}
            setOpenAlreadyCreated={setOpenAlreadyCreated}
          />
        </BrowserRouter>
      </ApolloProvider>,
    );

    const disconnectBtn = screen.getByTestId('chamber-disconnect-button');
    expect(disconnectBtn).toBeInTheDocument();

    fireEvent.click(disconnectBtn);
    expect(onClose).toHaveBeenCalled();
  });
});
