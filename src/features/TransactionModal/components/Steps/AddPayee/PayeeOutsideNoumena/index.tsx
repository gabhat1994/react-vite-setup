import { useState } from 'react';
import { Stack } from '@/layout';
import { EStates, type PayeeFormvalues } from './types';
import PayeeConfirm from './PayeeConfirm';
import PayeeForm from './PayeeForm';

const PayeeOutSideNoumena = () => {
  const [state, setState] = useState<EStates>(EStates.PAYEE_DETAILS);

  const [payeeDetails, setPayeeDetails] = useState<PayeeFormvalues>({
    name: '',
    routingNumber: '',
    accountNumber: '',
  });
  const handleNext = (_state: EStates) => {
    setState(_state);
  };

  const handlePayeeChange = (val: PayeeFormvalues) => {
    const { name, accountNumber, routingNumber } = val;
    setPayeeDetails((payee) => ({
      ...payee,
      name,
      accountNumber,
      routingNumber,
    }));
  };

  const getScreen = () => {
    switch (state) {
      case EStates.PAYEE_DETAILS:
        return (
          <PayeeForm
            handleNext={handleNext}
            handlePayeeChange={handlePayeeChange}
          />
        );
      case EStates.PAYEE_CONFRIM:
        return <PayeeConfirm payee={payeeDetails} handleNext={handleNext} />;
      default:
        return null;
    }
  };
  return (
    <Stack fullWidth vertical align="center" justify="center">
      {getScreen()}
    </Stack>
  );
};

export default PayeeOutSideNoumena;
