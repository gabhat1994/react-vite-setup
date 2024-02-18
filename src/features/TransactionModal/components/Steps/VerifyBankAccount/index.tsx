import { t } from 'i18next';
import { useContext, Fragment } from 'react';
import { Icon } from '@/components/Icon';
import { ModalBody, ModalHeader } from '@/components/ExtendedModal';
import { PaymentStateContext } from '@/features/TransactionModal/contexts/PaymentStateContext';
import { FormProvider } from 'react-hook-form';
import { TSpan } from '@/components';
import { useVerifyFundingSource } from '@/screens/MoneyDetails/LinkedAccounts/VerifyFundingSource/useVerifyFundingSource';
import { PaymentDataContext } from '@/features/TransactionModal/contexts/PaymentDataContext';
import { BackButton } from './styles';
import { ComponentStates } from '../../../types';
import { Form } from './Form';
import { Failure } from './Failure';

const VerifyBankAccount = () => {
  const { setPaymentState } = useContext(PaymentStateContext);
  const { bankAccountId, refetchPaymentData } = useContext(PaymentDataContext);

  const { formMethods, handlers, step, failureCount, loading } =
    useVerifyFundingSource(bankAccountId);

  const handleBack = () => {
    setPaymentState(ComponentStates.PAYMENT_SELECT);
  };

  const refreshData = async () => {
    refetchPaymentData();
    setPaymentState(ComponentStates.PAYMENT_SELECT);
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
        {step === 'verify-account'
          ? t(`noumena.money.money-detail.verify_bank_account`)
          : t(`noumena.money.money-detail.verification_failed`)}
      </ModalHeader>
      {step === 'verify-account' && (
        <FormProvider {...formMethods}>
          <ModalBody gap={16}>
            <TSpan font="body-l" colorToken="--text-modal-neutral-default">
              {t(`noumena.money-detail.verify_account.sub_heading`)}
            </TSpan>
            <Form
              verifyFundingSource={handlers.verifyFundingSource}
              bankAccountId={bankAccountId}
              refresh={refreshData}
              failureCount={failureCount}
              loading={loading}
            />
          </ModalBody>
        </FormProvider>
      )}
      {step === 'failure' && <Failure onClose={refreshData} />}
    </Fragment>
  );
};

export default VerifyBankAccount;
