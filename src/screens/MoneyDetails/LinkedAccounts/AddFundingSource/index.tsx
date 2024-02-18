import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { useBreakpoints } from '@/hooks';
import { FormProvider } from 'react-hook-form';
import { useAddFundingSource } from './useAddFundingSource';
import { Form } from './Form';
import { Success } from './Success';
import { type IAddFundingSource } from './type';

export const AddFundingSource = (props: IAddFundingSource) => {
  const { t } = useTranslation();
  const { isMobile } = useBreakpoints();
  const { open, onClose } = props;

  const { formMethods, handlers, step, loading } = useAddFundingSource();

  const handleClose = () => {
    onClose();
    props.refresh();
  };

  return (
    <Modal
      isFullScreen={step === 'enter-data' && isMobile}
      enableCloseButton={step === 'enter-data'}
      size={step === 'success' && isMobile ? ModalSize.S : ModalSize.M}
      disableBackdropClick
      disableEscapeKeyDown
      closeButtonStyles={{
        tertiary: true,
        enforceRight: !isMobile,
        enforceLeft: isMobile,
      }}
      onClose={() => onClose()}
      open={open}
      spacingMode="gap-content"
    >
      <ModalHeader
        isFullScreen={step === 'enter-data' && isMobile}
        topPadding={0}
      >
        {step === 'enter-data'
          ? t(`noumena.money.money-detail.add_funding_source`)
          : t(`noumena.money.money-detail.account_added`)}
      </ModalHeader>
      {step === 'enter-data' && (
        <FormProvider {...formMethods}>
          <ModalBody isFullScreen={isMobile}>
            <Form
              onCloseModal={onClose}
              addFundingSource={handlers.addFundingSource}
              loading={loading}
            />
          </ModalBody>
        </FormProvider>
      )}
      {step === 'success' && <Success onClose={handleClose} />}
    </Modal>
  );
};
