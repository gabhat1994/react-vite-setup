import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { useBreakpoints } from '@/hooks';
import { FormProvider } from 'react-hook-form';
import { TSpan } from '@/components';
import { useVerifyFundingSource } from './useVerifyFundingSource';
import { Form } from './Form';
import { type IVerifyFundingSource } from './type';
import { Failure } from './Failure';

export const VerifyFundingSource = (props: IVerifyFundingSource) => {
  const { t } = useTranslation();
  const { isMobile } = useBreakpoints();
  const { open, onClose, refresh } = props;

  const { formMethods, handlers, step, failureCount, loading } =
    useVerifyFundingSource(props.bankAccountId);

  const handleRefresh = () => {
    setTimeout(() => refresh(), 1500);
    onClose();
  };

  return (
    <Modal
      isFullScreen={step === 'verify-account' && isMobile}
      enableCloseButton={step === 'verify-account'}
      size={step === 'failure' && isMobile ? ModalSize.S : ModalSize.M}
      disableBackdropClick
      disableEscapeKeyDown
      closeButtonStyles={{
        tertiary: true,
        enforceRight: !isMobile,
        enforceLeft: isMobile,
      }}
      onClose={onClose}
      open={open}
      spacingMode="gap-content"
    >
      <ModalHeader
        isFullScreen={step === 'verify-account' && isMobile}
        topPadding={0}
      >
        {step === 'verify-account'
          ? t(`noumena.money.money-detail.verify_bank_account`)
          : t(`noumena.money.money-detail.verification_failed`)}
      </ModalHeader>
      {step === 'verify-account' && (
        <FormProvider {...formMethods}>
          <ModalBody isFullScreen={isMobile} gap={16}>
            <TSpan font="body-l" colorToken="--text-modal-neutral-default">
              {t(`noumena.money-detail.verify_account.sub_heading`)}
            </TSpan>
            <Form
              onCloseModal={onClose}
              verifyFundingSource={handlers.verifyFundingSource}
              bankAccountId={props.bankAccountId}
              handleRefresh={handleRefresh}
              failureCount={failureCount}
              loading={loading}
            />
          </ModalBody>
        </FormProvider>
      )}
      {step === 'failure' && <Failure onClose={handleRefresh} />}
    </Modal>
  );
};
