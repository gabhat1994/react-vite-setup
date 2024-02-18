import { type FC, useState, useEffect, useMemo, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Spacer } from '@/layout';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import {
  EPinCodeStates,
  PIN_CODE_LENGTH,
  type PassCodeProps,
} from '@/screens/WalletSetup/Steps/StepFour/types';
import { useToast } from '@/hooks';
import { VALID_NUMBER_REGEX } from '@/constants/regex';
import { ModalFooter, ModalHeader } from '@/components/ExtendedModal';
import { ModalContent } from '../../styles';
import { FormHelperText, PinCode } from './style';

const PassCode: FC<PassCodeProps> = ({
  setupPinMainHeading,
  confirmPinMainHeading,
  subHeading,
  onBackButtonClick,
  onContinueButtonClick,
  onPassCodeConfirm,
  isMobile,
  loadingState,
}) => {
  const { t } = useTranslation();
  const [confirmedPin, setConfirmedPin] = useState<string | undefined>('');
  const [enteredPin, setEnteredPin] = useState<string | undefined>('');
  const { addToast } = useToast();
  const isValidNumber = useMemo(() => VALID_NUMBER_REGEX, []);
  const [internalStep, setInternalStep] = useState<EPinCodeStates>(
    EPinCodeStates.SETTING_THE_PIN,
  );

  useEffect(() => {
    if (
      enteredPin?.length === PIN_CODE_LENGTH &&
      confirmedPin?.length === PIN_CODE_LENGTH
    ) {
      if (enteredPin === confirmedPin) {
        onPassCodeConfirm(confirmedPin);
      } else {
        addToast('error', 'none', `${t('noumena.invalid.pin_code')}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmedPin, enteredPin, t, addToast]);

  const handleNext = () => {
    if (internalStep === EPinCodeStates.SETTING_THE_PIN) {
      if (isValidNumber.test(enteredPin!)) {
        setInternalStep(EPinCodeStates.CONFIRMING_THE_PIN);
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
  };

  const handleBack = () => {
    if (internalStep === EPinCodeStates.CONFIRMING_THE_PIN) {
      setConfirmedPin('');
      setEnteredPin('');
      setInternalStep(EPinCodeStates.SETTING_THE_PIN);
    } else {
      onBackButtonClick();
    }
  };
  const handlePinChange = (pin: string | undefined) => {
    if (internalStep === EPinCodeStates.SETTING_THE_PIN) {
      setEnteredPin(pin);
    } else {
      setConfirmedPin(pin);
    }
  };

  const shouldDisable =
    internalStep === EPinCodeStates.SETTING_THE_PIN
      ? !(enteredPin?.length === PIN_CODE_LENGTH)
      : !(confirmedPin?.length === PIN_CODE_LENGTH);

  return (
    <Fragment>
      <ModalHeader isFullScreen={isMobile || false}>
        {internalStep === EPinCodeStates.SETTING_THE_PIN
          ? setupPinMainHeading
          : confirmPinMainHeading}
      </ModalHeader>
      <ModalContent isFullScreen={isMobile || false}>
        <FormHelperText font="body-l" colorToken="--text-body-neutral-default">
          {subHeading}
        </FormHelperText>
        <Spacer height={32} />
        <PinCode
          width="44px"
          value={
            internalStep === EPinCodeStates.SETTING_THE_PIN
              ? enteredPin
              : confirmedPin
          }
          onChange={(val) => handlePinChange(val)}
          numInputs={6}
          isInputPassword={true}
          dataTestId="pin-code"
        />
      </ModalContent>
      <ModalFooter isFullScreen={isMobile || false} gap={10}>
        <Button
          style={{ width: '40%' }}
          data-testid="step-four-back-button"
          type="button"
          size="full"
          onClick={handleBack}
          leftIcon={
            <Icon
              name="arrow_left_m"
              size={24}
              color="--icon-button-neutral-default"
            />
          }
        >
          {t('noumena.back.text')}
        </Button>

        <Button
          data-testid="step-four-submit-button"
          type="submit"
          primary
          size="full"
          loading={loadingState}
          disabled={shouldDisable || loadingState}
          onClick={handleNext}
        >
          {t('noumena.continue')}
        </Button>
      </ModalFooter>
    </Fragment>
  );
};
export default PassCode;
