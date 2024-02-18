import { memo } from 'react';
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

interface DiscardChangesModalProps {
  isOpen: boolean;
  handleClose: (isSuccess?: boolean) => void;
}

export const DiscardChangesModal = memo((props: DiscardChangesModalProps) => {
  const { isOpen, handleClose } = props;
  const { t } = useTranslation();

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      size={ModalSize.S}
      disableBackdropClick
    >
      <>
        <ModalHeader>
          {t('noumena.file_manager.discard_changes_modal.title')}
        </ModalHeader>
        <ModalBody align="center">
          <TSpan
            colorToken="--text-modal-neutral-default"
            font="body-l"
            textAlign="center"
          >
            {t('noumena.file_manager.discard_changes_modal.description')}
          </TSpan>
        </ModalBody>
        <ModalFooter flexDirection="column" gap={16}>
          <Button
            primary
            intent="negative"
            size="full"
            onClick={() => handleClose(true)}
          >
            {t('noumena.file_manager.discard_changes_modal.confirm')}
          </Button>
          <Button tertiary size="full" onClick={() => handleClose(false)}>
            {t('noumena.file_manager.discard_changes_modal.cancel')}
          </Button>
        </ModalFooter>
      </>
    </Modal>
  );
});
