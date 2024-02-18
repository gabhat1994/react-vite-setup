import { useTranslation } from 'react-i18next';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@/components/ExtendedModal';
import { PaymentStateContext } from '@/features/TransactionModal/contexts/PaymentStateContext';
import { useContext } from 'react';
import { ComponentStates } from '@/features/TransactionModal/types';
import { PaymentDataContext } from '@/features/TransactionModal/contexts/PaymentDataContext';
import { Button, TSpan } from '@/components';

const AddedFundingSource = () => {
  const { t } = useTranslation();
  const { isMobile, setPaymentState } = useContext(PaymentStateContext);

  const { refetchPaymentData } = useContext(PaymentDataContext);

  const handleSucess = () => {
    refetchPaymentData();
    setPaymentState(ComponentStates.PAYMENT_SELECT);
  };

  return (
    <>
      <ModalHeader isFullScreen={isMobile} topPadding={0}>
        {t(`noumena.money.money-detail.account_added`)}
      </ModalHeader>
      <ModalBody>
        <TSpan
          font="body-l"
          colorToken="--text-modal-neutral-default"
          textAlign="center"
        >
          {t(`noumena.money.money-detail.account_added_sub_heading`)}
        </TSpan>
      </ModalBody>
      <ModalFooter>
        <Button size="full" tertiary onClick={handleSucess}>
          {t(`noumena.okClose`)}
        </Button>
      </ModalFooter>
    </>
  );
};

export default AddedFundingSource;
