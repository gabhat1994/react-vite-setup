import { useTranslation } from 'react-i18next';
import { ModalHeader, ModalBody, ModalSize } from '@/components/ExtendedModal';
import { FormProvider } from 'react-hook-form';
import { useAddFundingSource } from '@/screens/MoneyDetails/LinkedAccounts/AddFundingSource/useAddFundingSource';
import { PaymentStateContext } from '@/features/TransactionModal/contexts/PaymentStateContext';
import { useContext } from 'react';
import { ComponentStates } from '@/features/TransactionModal/types';
import { Form } from './Form';

const AddFundingSource = () => {
  const { t } = useTranslation();
  const { isMobile, handleClose, setPaymentState, setModalSize } =
    useContext(PaymentStateContext);

  const handleSucess = () => {
    setPaymentState(ComponentStates.FUNDING_SOURCE_ADDED);
    setModalSize(ModalSize.M);
  };

  const { formMethods, handlers, loading } = useAddFundingSource(handleSucess);

  return (
    <>
      <ModalHeader isFullScreen={isMobile} topPadding={0}>
        {t(`noumena.money.money-detail.add_funding_source`)}
      </ModalHeader>
      <FormProvider {...formMethods}>
        <ModalBody isFullScreen={isMobile}>
          <Form
            onCloseModal={handleClose}
            addFundingSource={handlers.addFundingSource}
            loading={loading}
          />
        </ModalBody>
      </FormProvider>
    </>
  );
};

export default AddFundingSource;
