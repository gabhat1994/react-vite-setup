import { fireEvent, render, waitFor } from '@/test-utils';
import StepFour from './index';
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

describe('Render Security Pin code form', () => {
  it('should render the Security pin code form', async () => {
    const { container } = render(
      <SetupWalletContext.Provider value={contextValue}>
        <StepFour />
      </SetupWalletContext.Provider>,
    );
    await waitFor(() => expect(container).toBeTruthy);
  });
  it('should disable the Continue button aftre render', async () => {
    const { getByTestId } = render(
      <SetupWalletContext.Provider value={contextValue}>
        <StepFour />
      </SetupWalletContext.Provider>,
    );
    const button = getByTestId('step-four-submit-button');
    await waitFor(() => expect(button).toBeDisabled());
  });
  it('Should go to preveious step when click on back button', async () => {
    const { getByTestId } = render(
      <SetupWalletContext.Provider value={contextValue}>
        <StepFour />
      </SetupWalletContext.Provider>,
    );
    const button = getByTestId('step-four-back-button');
    await waitFor(() => expect(button).toBeEnabled());
    fireEvent.click(button);
    await waitFor(() =>
      expect(contextValue.handlePreviousStep).toHaveBeenCalled(),
    );
  });
  it('Should able to fill the pin code inputs and move to confirm pin code stage', async () => {
    const { getByTestId } = render(
      <SetupWalletContext.Provider value={contextValue}>
        <StepFour />
      </SetupWalletContext.Provider>,
    );
    // const setUpPinCode = getByText('Set Up a PIN code');
    // await waitFor(() => expect(setUpPinCode).toBeInTheDocument);

    const inputOne = getByTestId('pin-code-0') as HTMLInputElement;
    const inputTwo = getByTestId('pin-code-1') as HTMLInputElement;
    const inputThree = getByTestId('pin-code-2') as HTMLInputElement;
    const inputFour = getByTestId('pin-code-3') as HTMLInputElement;
    const inputFive = getByTestId('pin-code-4') as HTMLInputElement;
    const inputSix = getByTestId('pin-code-5') as HTMLInputElement;

    await waitFor(() => {
      expect(inputOne).toBeInTheDocument();
      expect(inputTwo).toBeInTheDocument();
      expect(inputThree).toBeInTheDocument();
      expect(inputFour).toBeInTheDocument();
      expect(inputFive).toBeInTheDocument();
      expect(inputSix).toBeInTheDocument();
    });

    fireEvent.change(inputOne, { target: { value: 1 } });
    inputTwo.focus();
    fireEvent.change(inputTwo, { target: { value: 2 } });
    inputThree.focus();
    fireEvent.change(inputThree, { target: { value: 3 } });
    inputFour.focus();
    fireEvent.change(inputFour, { target: { value: 4 } });
    inputFive.focus();
    fireEvent.change(inputFive, { target: { value: 5 } });
    inputSix.focus();
    fireEvent.change(inputSix, { target: { value: 6 } });

    await waitFor(() => {
      expect(inputOne.value).toBe('1');
      expect(inputTwo.value).toBe('2');
      expect(inputThree.value).toBe('3');
      expect(inputFour.value).toBe('4');
      expect(inputFive.value).toBe('5');
      expect(inputSix.value).toBe('6');
    });

    const button = getByTestId('step-four-submit-button');
    await waitFor(() => expect(button).toBeEnabled());
    fireEvent.click(button);
    // const connfirmPinCode = getByText('Confirm PIN code');
    // await waitFor(() => expect(connfirmPinCode).toBeInTheDocument);

    await waitFor(() => {
      expect(inputOne.value).toBe('');
      expect(inputTwo.value).toBe('');
      expect(inputThree.value).toBe('');
      expect(inputFour.value).toBe('');
      expect(inputFive.value).toBe('');
      expect(inputSix.value).toBe('');
    });

    await waitFor(() => expect(button).toBeDisabled());
  });
});
