import { useState, useMemo, useEffect, useCallback } from 'react';
import { t } from 'i18next';
import { VALID_NUMBER_REGEX } from '@/constants/regex';
import { useToast } from '@/hooks';
import Otp from './Otp';
import Header from './Header';
import BackButton from './BackButton';
import ContinueButton from './ContinueButton';
import ShowPasswordButton from './ShowPasswordButton';
import HelperText from './HelperText';
import {
  EPinCodeStates,
  type TPinState,
  type TSetupPinProps,
  SetupPinContext,
} from './types';

const PIN_CODE_LENGTH = 6;

export const SetupPin = ({
  children,
  onPassCodeConfirm,
  onContinueButtonClick,
  handleBack,
}: TSetupPinProps) => {
  const { addToast } = useToast();
  const isValidNumber = useMemo(() => VALID_NUMBER_REGEX, []);
  const [pinState, setPinState] = useState<TPinState>({
    entered: '',
    confirmed: '',
  });
  const [componentState, setComponentState] = useState<EPinCodeStates>(
    EPinCodeStates.SETTING_THE_PIN,
  );
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (
      pinState?.entered?.length === PIN_CODE_LENGTH &&
      pinState?.confirmed?.length === PIN_CODE_LENGTH
    ) {
      if (pinState.entered === pinState.confirmed) {
        onPassCodeConfirm(pinState.confirmed);
      } else {
        addToast('error', 'none', 'PIN codes don’t match. Please try again.');
      }
    }
  }, [pinState, addToast, onPassCodeConfirm]);

  const handleBackClick = useCallback(() => {
    if (componentState === EPinCodeStates.CONFIRMING_THE_PIN) {
      setPinState({ entered: '', confirmed: '' });
      setComponentState(EPinCodeStates.SETTING_THE_PIN);
    } else {
      handleBack();
    }
  }, [componentState, handleBack]);

  const handleNext = useCallback(() => {
    if (componentState === EPinCodeStates.SETTING_THE_PIN) {
      if (pinState?.entered && isValidNumber.test(pinState.entered)) {
        setComponentState(EPinCodeStates.CONFIRMING_THE_PIN);
      } else {
        addToast(
          'error',
          'none',
          `${t('Invalid pincode, only numbers are allowed')}`,
        );
      }
    } else {
      onContinueButtonClick();
    }
  }, [
    setComponentState,
    componentState,
    addToast,
    isValidNumber,
    onContinueButtonClick,
    pinState?.entered,
  ]);

  const handlePinChange = useCallback(
    (pin: string | undefined) => {
      if (componentState === EPinCodeStates.SETTING_THE_PIN) {
        setPinState((prv) => ({ ...prv, entered: pin }));
      } else {
        setPinState((prv) => ({ ...prv, confirmed: pin }));
      }
    },
    [setPinState, componentState],
  );

  const shouldDisable =
    componentState === EPinCodeStates.SETTING_THE_PIN
      ? !(pinState?.entered?.length === PIN_CODE_LENGTH)
      : !(pinState.entered === pinState.confirmed);

  const SetupPinContextValue = useMemo(
    () => ({
      pinState,
      componentState,
      handleBack: handleBackClick,
      handleNext,
      shouldDisable,
      handlePinChange,
      showPassword,
      setShowPassword,
    }),
    [
      pinState,
      componentState,
      handleBackClick,
      handleNext,
      shouldDisable,
      handlePinChange,
      showPassword,
      setShowPassword,
    ],
  );

  return (
    <div style={{ width: '100%' }}>
      <SetupPinContext.Provider value={SetupPinContextValue}>
        {children}
      </SetupPinContext.Provider>
    </div>
  );
};

SetupPin.Otp = Otp;
SetupPin.ShowPasswordButton = ShowPasswordButton;
SetupPin.Header = Header;
SetupPin.HelperText = HelperText;
SetupPin.BackButton = BackButton;
SetupPin.ContinueButton = ContinueButton;
