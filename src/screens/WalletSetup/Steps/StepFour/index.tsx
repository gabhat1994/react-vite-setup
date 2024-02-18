import { type FC, useContext, useCallback } from 'react';
import { Spacer, Stack } from '@/layout';
import { SetupPin } from '@/features/TransactionModal/components/Steps/PlaidFlow/SetupPin/SetupPin';
import { FormWrapper } from '../styles';
import { SetupWalletContext } from '../../context';

const FormPinCode: FC = () => {
  const { handlePreviousStep, handleNextStep, setPasscode } =
    useContext(SetupWalletContext);

  const onPassCodeConfirm = useCallback(
    (pincode: string) => {
      if (setPasscode) {
        setPasscode(pincode);
      }
    },
    [setPasscode],
  );

  return (
    <FormWrapper>
      <SetupPin
        onContinueButtonClick={handleNextStep}
        onPassCodeConfirm={onPassCodeConfirm}
        handleBack={handlePreviousStep}
      >
        <Stack align="center" vertical justify="center">
          <SetupPin.Header
            font="heading-s-bold"
            colorToken="--text-body-header-neutral-default"
          />
          <Spacer height={16} />
          <SetupPin.HelperText />
          <Spacer height={64} />
          <SetupPin.Otp />
          <Spacer height={32} />
          <SetupPin.ShowPasswordButton />
          <Spacer height={32} />
          <Stack
            fullWidth
            style={{ justifyContent: 'space-between', gap: '16px' }}
          >
            <div style={{ width: '30%' }}>
              <SetupPin.BackButton />
            </div>
            <div style={{ width: '70%' }}>
              <SetupPin.ContinueButton />
            </div>
          </Stack>
        </Stack>
      </SetupPin>
    </FormWrapper>
  );
};
export default FormPinCode;
