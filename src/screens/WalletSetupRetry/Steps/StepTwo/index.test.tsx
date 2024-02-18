import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@/test-utils';
import StepTwo from './index';
import {
  SetupWalletContext,
  initCurrentUser,
  initPayLoad,
} from '../../context';
import { type SetupWalletContextTypes } from '../../types';

describe('Step Two - Address Form', () => {
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
  it('Should render the form', async () => {
    const { container } = render(
      <SetupWalletContext.Provider value={contextValue}>
        <MockedProvider>
          <StepTwo />
        </MockedProvider>
      </SetupWalletContext.Provider>,
    );
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });
});
