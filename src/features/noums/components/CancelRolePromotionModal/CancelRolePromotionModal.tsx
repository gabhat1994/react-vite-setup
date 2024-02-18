import { Button } from '@/components/Button';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { useTranslation } from 'react-i18next';

interface CancelRolePromotionModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
}

export function CancelRolePromotionModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: CancelRolePromotionModalProps) {
  const { t } = useTranslation();

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size={ModalSize.S}
      spacingMode="gap-content"
    >
      <ModalHeader>
        {t('noumena.chamber.cancel_manager_invitation_modal.title')}
      </ModalHeader>
      <ModalBody gap={24}>
        <TSpan
          font="body-l"
          colorToken="--text-modal-neutral-default"
          textAlign="center"
        >
          {t('noumena.chamber.cancel_manager_invitation_modal.description')}
        </TSpan>
      </ModalBody>
      <ModalFooter flexDirection="column" gap={16}>
        <Button
          intent="negative"
          size="full"
          onClick={onConfirm}
          loading={isLoading}
        >
          {t('noumena.chamber.cancel_manager_invitation_modal.confirm')}
        </Button>
        <Button tertiary size="full" onClick={onClose}>
          {t('noumena.chamber.cancel_manager_invitation_modal.cancel')}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
