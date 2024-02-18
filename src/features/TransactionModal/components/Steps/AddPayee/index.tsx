import { t } from 'i18next';
import { useState, useContext, Fragment } from 'react';
import { Icon } from '@/components/Icon';
import { ModalHeader } from '@/components/ExtendedModal';
import { PaymentStateContext } from '@/features/TransactionModal/contexts/PaymentStateContext';
import SelectPayee from './SelectPayee';
import PayeeInNoumena from './PayeeInNoumena';
import PaymenetOuuSideNoumena from './PayeeOutsideNoumena';
import { BackButton } from './styles';
import EAddPayeeStates from './types';
import { ComponentStates } from '../../../types';

const AddPayee = () => {
  const { setPaymentState } = useContext(PaymentStateContext);

  const [payeeState, setPayeeState] = useState<EAddPayeeStates>(
    EAddPayeeStates.SELECT_PAEE,
  );
  const handleStateChange = (value: EAddPayeeStates) => {
    setPayeeState(value);
  };

  const getScreen = () => {
    switch (payeeState) {
      case EAddPayeeStates.SELECT_PAEE:
        return <SelectPayee handleStateChange={handleStateChange} />;
      case EAddPayeeStates.PAYEE_NOUMENA:
        return <PayeeInNoumena />;
      case EAddPayeeStates.PAYEE_OUTSIDE_NOUMENA:
        return <PaymenetOuuSideNoumena />;
      default:
        return null;
    }
  };
  const getHeading = () => {
    switch (payeeState) {
      case EAddPayeeStates.SELECT_PAEE:
        return t('noumena.money.addPayee.heading');
      case EAddPayeeStates.PAYEE_NOUMENA:
        return t('noumena.money.addPayee.noumena.heading');
      case EAddPayeeStates.PAYEE_OUTSIDE_NOUMENA:
        return t('noumena.money.addPayee.out.of.noumena.heading');
      default:
        return '';
    }
  };

  const handleBack = () => {
    if (payeeState === EAddPayeeStates.SELECT_PAEE) {
      setPaymentState(ComponentStates.PAYMENT_SELECT);
    } else {
      setPayeeState(EAddPayeeStates.SELECT_PAEE);
    }
  };

  return (
    <Fragment>
      <ModalHeader isFullScreen={false} justifyContent="center">
        <BackButton
          data-testid="add-payee-back-button"
          size="small"
          leftIcon={
            <Icon
              color="--icon-button-neutral-default"
              name="arrow_left_m"
              size={24}
            />
          }
          onClick={handleBack}
        />
        {getHeading()}
      </ModalHeader>
      {getScreen()}
    </Fragment>
  );
};

export default AddPayee;
