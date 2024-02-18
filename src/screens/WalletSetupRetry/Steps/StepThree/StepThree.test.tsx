import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { fireEvent, render, waitFor } from '@/test-utils';
import StepThree from './index';
import {
  SetupWalletContext,
  initCurrentUser,
  initPayLoad,
} from '../../context';
import { type SetupWalletContextTypes } from '../../types';

const contextValue: SetupWalletContextTypes = {
  setPayLoad: null,
  payLoad: initPayLoad,
  currentUser: initCurrentUser,
  handleNextStep: vi.fn(),
  handlePreviousStep: vi.fn(),
  setPasscode: null,
  passCode: null,
  setState: Function,
};

describe('Render Email Form', () => {
  it('Should render the Email Form', async () => {
    const { container } = render(
      <SetupWalletContext.Provider value={contextValue}>
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <StepThree />
        </ApolloProvider>
      </SetupWalletContext.Provider>,
    );
    await waitFor(() => expect(container).toBeTruthy());
  });
  it('Back button should be enabled and Continue button should be disabled after the render', async () => {
    const { container, getByTestId } = render(
      <SetupWalletContext.Provider value={contextValue}>
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <StepThree />
        </ApolloProvider>
      </SetupWalletContext.Provider>,
    );
    await waitFor(() => expect(container).toBeTruthy());
    const backButton = getByTestId('step-three-back-button-sub-state-one');
    await waitFor(() => expect(backButton).toBeInTheDocument());
    expect(backButton).toBeEnabled();
    const continueButton = getByTestId('step-three-next-button-sub-state-one');
    await waitFor(() => expect(continueButton).toBeInTheDocument());
    expect(continueButton).toBeDisabled();
  });
});

describe('Email form user intractions', () => {
  it('should be able go back to previous screen when clicked on Back Button', async () => {
    const { container, getByTestId } = render(
      <BrowserRouter>
        <SetupWalletContext.Provider value={contextValue}>
          <ApolloProvider
            client={new ApolloClient({ cache: new InMemoryCache() })}
          >
            <StepThree />
          </ApolloProvider>
        </SetupWalletContext.Provider>
        ,
      </BrowserRouter>,
    );
    await waitFor(() => expect(container).toBeTruthy());
    const backButton = getByTestId('step-three-back-button-sub-state-one');
    await waitFor(() => expect(backButton).toBeInTheDocument());
    await waitFor(() => fireEvent.click(backButton));
    await waitFor(() =>
      expect(contextValue.handlePreviousStep).toHaveBeenCalled(),
    );
  });
  it('should enable the Continue button when user types valid email', async () => {
    const { container, getByTestId } = render(
      <BrowserRouter>
        <SetupWalletContext.Provider value={contextValue}>
          <ApolloProvider
            client={new ApolloClient({ cache: new InMemoryCache() })}
          >
            <StepThree />,
          </ApolloProvider>
          :w
        </SetupWalletContext.Provider>
      </BrowserRouter>,
    );
    await waitFor(() => expect(container).toBeTruthy());
    const emailInput = getByTestId('step-three-email');
    await waitFor(() => expect(emailInput).toBeInTheDocument());
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    const continueButton = getByTestId('step-three-next-button-sub-state-one');
    await waitFor(() => expect(continueButton).toBeEnabled());
  });
});
