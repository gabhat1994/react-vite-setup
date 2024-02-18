import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@/test-utils';
import StepOne from './index';
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
describe('Step One - Personal Information Form', () => {
  it('Should render the form', async () => {
    const { container } = render(
      <SetupWalletContext.Provider value={contextValue}>
        <MockedProvider>
          <StepOne />
        </MockedProvider>
      </SetupWalletContext.Provider>,
    );
    await waitFor(() => expect(container).toBeTruthy());
  });

  it('Continue button should be disabled by default for initial render', async () => {
    const { getByTestId } = render(
      <SetupWalletContext.Provider value={contextValue}>
        <MockedProvider>
          <StepOne />
        </MockedProvider>
      </SetupWalletContext.Provider>,
    );
    const submitButton = getByTestId('step-one-submit-button');
    await waitFor(() => expect(submitButton).toBeInTheDocument());
    await waitFor(() => expect(submitButton).toBeDisabled());
  });
});
