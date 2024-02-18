import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';

interface ResendDocumentConfirmationModalProps {
  isOpen: boolean;
  onConfirm(): void;
  onCancel(): void;
}

export function ResendDocumentConfirmationModal({
  isOpen,

  onConfirm,
  onCancel,
}: ResendDocumentConfirmationModalProps) {
  const { t } = useTranslation();

  return (
    <Modal
      testId="contracts-document-resend-modal"
      open={isOpen}
      onClose={onCancel}
      size={ModalSize.M}
      disableBackdropClick
      enableCloseButton
    >
      <ModalHeader>{t('noumena.contracts.resend_document.title')}</ModalHeader>
      <ModalBody>
        <TSpan font="body-l" colorToken="--text-modal-neutral-default">
          {t('noumena.contracts.resend_document.description')}
        </TSpan>
      </ModalBody>
      <ModalFooter flexDirection="row" gap={16}>
        <Button
          size="full"
          tertiary
          testId="resend-reference-no-btn"
          onClick={onCancel}
        >
          {t(`noumena.cancel`)}
        </Button>
        <Button
          size="full"
          intent="positive"
          primary
          testId="resend-reference-btn"
          onClick={onConfirm}
        >
          {t('noumena.contracts.resend_document.confirm')}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
