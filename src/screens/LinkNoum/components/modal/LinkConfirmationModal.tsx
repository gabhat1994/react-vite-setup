import React from 'react';
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

export const LinkConfirmationModal: React.FC<{
  isOpen: boolean;
  noumsCount: number;
  handleConfirm: () => void;
  handleClose: () => void;
  loading: boolean;
}> = ({ isOpen, handleClose, noumsCount, handleConfirm, loading }) => (
  <Modal
    testId="link-confirmation-modal"
    open={isOpen}
    onClose={handleClose}
    size={ModalSize.S}
  >
    <ModalHeader>{t('noumena.noum_link.link_noums')}</ModalHeader>
    <ModalBody
      style={{
        alignItems: 'center',
      }}
    >
      <TSpan
        colorToken="--text-modal-neutral-default"
        textAlign="center"
        font="body-l"
      >
        {t('noumena.link_noums.confirmation_modal.description')}
      </TSpan>
    </ModalBody>
    <ModalFooter marginTop={28} flexDirection="column" gap={16}>
      <Button size="full" primary onClick={handleConfirm} loading={loading}>
        {t('noumena.link_noums.confirmation_modal.button', { noumsCount })}
      </Button>
      <Button size="full" onClick={handleClose}>
        {t('noumena.cancel')}
      </Button>
    </ModalFooter>
  </Modal>
);
