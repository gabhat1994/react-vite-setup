import { t } from 'i18next';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Spacer } from '@/layout';
import { type RevertModalProps } from './types';

export const RevertModal = ({
  isOpen,
  onClose,
  onConfirm,
  onCloseModal,
}: RevertModalProps) => (
  <Modal
    open={isOpen}
    size={ModalSize.S}
    onClose={onCloseModal}
    testId="default-theme-revert-modal"
  >
    <ModalHeader>{t('noumena.customize.theme.revert_title')}</ModalHeader>
    <ModalBody>
      <TSpan
        font="body-l"
        textAlign="center"
        colorToken="--text-modal-neutral-default"
        data-testid="theme-revert-confirmation-modal-description"
      >
        {t('noumena.customize.theme.revert_description')}
      </TSpan>
    </ModalBody>
    <Spacer height={16} />
    <ModalFooter
      isFullScreen={false}
      gap={16}
      flexDirection="column"
      marginTop={12}
    >
      <Button
        primary
        size="full"
        onClick={onConfirm}
        data-testid="confirm-button"
      >
        {t('noumena.customize.theme.revert_confirm')}
      </Button>
      <Button
        tertiary
        intent="negative"
        size="full"
        onClick={onClose}
        data-testid="cancel-button"
      >
        {t('noumena.customize.theme.revert_cancel')}
      </Button>
    </ModalFooter>
  </Modal>
);
