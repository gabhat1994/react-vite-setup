import { createContext, type Dispatch, type SetStateAction } from 'react';

export enum EPinCodeStates {
  SETTING_THE_PIN = 'SETTING_THE_PIN',
  CONFIRMING_THE_PIN = 'CONFIRMING_THE_PIN',
}

export type TPinState = {
  entered: string | undefined;
  confirmed: string | undefined;
};

type TSetupPinContext = {
  pinState: TPinState | undefined;
  componentState: EPinCodeStates;
  shouldDisable: boolean;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>> | null;
  handlePinChange: (pin: string | undefined) => void | null;
  handleBack: () => void | null;
  handleNext: () => void | null;
};

export type TSetupPinProps = {
  children: React.ReactNode;
  handleBack: () => void | null;
  onPassCodeConfirm: (pin: string) => void;
  onContinueButtonClick: () => void;
};

export const SetupPinContext = createContext<TSetupPinContext>({
  pinState: { entered: '', confirmed: '' },
  componentState: EPinCodeStates.SETTING_THE_PIN,
  shouldDisable: true,
  showPassword: false,
  setShowPassword: null,
  handlePinChange: () => null,
  handleBack: () => null,
  handleNext: () => null,
});
