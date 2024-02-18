import { useContext } from 'react';
import { TSpan } from '@/components/Typography';
import { type TProps } from '@/components/Typography/Typography';

import { EPinCodeStates, SetupPinContext } from './types';

const Header = (props: TProps) => {
  const { componentState } = useContext(SetupPinContext);
  return (
    <TSpan {...props}>
      {componentState === EPinCodeStates.SETTING_THE_PIN
        ? 'Set Up a PIN Code'
        : 'Confirm Your PIN Code'}
    </TSpan>
  );
};

export default Header;
