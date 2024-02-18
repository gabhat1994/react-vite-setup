import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { fireEvent, render, waitFor } from '@/test-utils';
import {
  SetupWalletContext,
  initCurrentUser,
  initPayLoad,
} from '../../context';
import { type SetupWalletContextTypes } from '../../types';

import StepSix from './index';

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
        <StepSix />,
      </SetupWalletContext.Provider>
      ,
    </ApolloProvider>,
  );

describe('Setup Wallet Flow Terms and Condition', () => {
  it('Should render the The Component', async () => {
    const { container } = renderComponent();
    await waitFor(() => expect(container).toBeTruthy());
  });
  it('Has "Agree and Apply" button disabled when component renders', async () => {
    const { getByTestId } = renderComponent();
    const button = getByTestId('step-six-submit-button');
    await waitFor(() => expect(button).toBeDisabled());
  });
  it('Should keep disable the "Agree and Apply" button when clicked on one of the check boxes', async () => {
    const { getAllByTestId, getByTestId } = renderComponent();
    const checkBoxes = getAllByTestId('checkbox');
    const button = getByTestId('step-six-submit-button');
    await waitFor(() => expect(button).toBeDisabled());
    const checkBoxOne = checkBoxes[0] as HTMLInputElement;
    fireEvent.click(checkBoxOne);
    await waitFor(() => expect(button).toBeDisabled());
  });
  it('Should able to agree both the terms and able to click on "Agree and Apply"', async () => {
    const { getAllByTestId, getByTestId } = renderComponent();
    const checkBoxes = getAllByTestId('checkbox');
    const button = getByTestId('step-six-submit-button');
    await waitFor(() => expect(button).toBeDisabled());
    const checkBoxOne = checkBoxes[0] as HTMLInputElement;
    const checkBoxTwo = checkBoxes[1] as HTMLInputElement;
    fireEvent.click(checkBoxOne);
    fireEvent.click(checkBoxTwo);
    await waitFor(() => expect(button).toBeEnabled());
    fireEvent.click(button);
  });
});
