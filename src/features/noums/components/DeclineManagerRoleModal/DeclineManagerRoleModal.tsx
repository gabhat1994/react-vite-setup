import { Button } from '@/components/Button';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Trans, useTranslation } from 'react-i18next';

interface DeclineManagerRoleModalProps {
  isOpen: boolean;
  noumName: string;
  loading: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeclineManagerRoleModal({
  isOpen,
  noumName,
  loading,
  onClose,
  onConfirm,
}: DeclineManagerRoleModalProps) {
  const { t } = useTranslation();

  return (
    <Modal open={isOpen} onClose={onClose} size={ModalSize.S}>
      <ModalHeader topPadding={0}>
        {t('noumena.decline_manager_modal.title')}
      </ModalHeader>
      <ModalBody gap={32}>
        <TSpan
          font="body-l"
          textAlign="center"
          colorToken="--text-modal-neutral-default"
        >
          <Trans
            i18nKey="noumena.decline_manager_modal.description"
            components={{ b: <b /> }}
            values={{ noumName }}
          />
        </TSpan>
      </ModalBody>

      <ModalFooter flexDirection="column" gap={16}>
        <Button
          size="full"
          intent="negative"
          onClick={onConfirm}
          loading={loading}
        >
          {t('noumena.decline_manager_modal.confirm_button')}
        </Button>
        <Button size="full" tertiary onClick={onClose}>
          {t('noumena.decline_manager_modal.cancel_button')}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
