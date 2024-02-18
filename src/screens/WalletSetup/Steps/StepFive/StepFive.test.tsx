import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { intersectionObserver } from '@/test-utils/stubs';
import { cleanup, fireEvent, render, waitFor } from '@/test-utils';
import {
  SetupWalletContext,
  initCurrentUser,
  initPayLoad,
} from '../../context';
import { type SetupWalletContextTypes } from '../../types';

import StepFive from './index';

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

const renderComponent = () =>
  render(
    <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
      <SetupWalletContext.Provider value={contextValue}>
        <StepFive />,
      </SetupWalletContext.Provider>
      ,
    </ApolloProvider>,
  );

describe('Setup Wallet Flow Security Question', () => {
  beforeEach(() => intersectionObserver.mock());
  afterEach(() => {
    cleanup();
    intersectionObserver.restore();
  });
  it('Should render the secrity form', async () => {
    const { container } = renderComponent();
    await waitFor(() => expect(container).toBeTruthy());
  });
  test('has "Continue" button disabled on render', async () => {
    const { container, getByTestId } = renderComponent();
    await waitFor(() => expect(container).toBeTruthy());
    const button = getByTestId('step-five-submit-button');
    await waitFor(() => expect(button).toBeDisabled());
  });
  it('should go back to previous setp when clicked on back button', async () => {
    const { getByTestId } = renderComponent();
    const backButton = getByTestId('step-five-back-button');
    await waitFor(() => expect(backButton).toBeEnabled());
    fireEvent.click(backButton);
    await waitFor(() =>
      expect(contextValue.handlePreviousStep).toHaveBeenCalled(),
    );
  });
});
