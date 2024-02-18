import { useContext } from 'react';
import { OtpInput } from '@/components/Otp/OtpInput';
import { EPinCodeStates, SetupPinContext } from './types';

const Otp = () => {
  const { componentState, handlePinChange, pinState, showPassword } =
    useContext(SetupPinContext);

  const hanldeOnChange = (val: string | undefined) => {
    handlePinChange(val);
  };

  return (
    <OtpInput
      width="44px"
      value={
        componentState === EPinCodeStates.SETTING_THE_PIN
          ? pinState?.entered
          : pinState?.confirmed
      }
      onChange={hanldeOnChange}
      numInputs={6}
      isInputPassword={!showPassword}
      dataTestId="pin-code"
      color="var(--text-input-brand-primary-default)"
    />
  );
};

export default Otp;
