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

export const UnlinkSingleNoumModal: React.FC<{
  isOpen: boolean;
  handleClose: () => void;
  handleUnlinking: () => void;
  loading: boolean;
  description?: string;
}> = ({ isOpen, handleClose, handleUnlinking, loading, description }) => (
  <Modal
    testId="unlink-noum-modal"
    open={isOpen}
    onClose={handleClose}
    size={ModalSize.S}
  >
    <ModalHeader>{t('noumena.link_noums.unlink_noums')}</ModalHeader>
    <ModalBody
      style={{
        alignItems: 'center',
      }}
    >
      <TSpan
        font="body-l"
        textAlign="center"
        colorToken="--text-modal-neutral-default"
      >
        {description ||
          t(
            'noumena.link_noums.unlink_confirm_modal.description.multiple_noums',
          )}
      </TSpan>
    </ModalBody>
    <ModalFooter flexDirection="column" gap={16}>
      <Button
        testId="enable-linking"
        size="full"
        intent="negative"
        disabled={loading}
        loading={loading}
        onClick={handleUnlinking}
      >
        {t('noumena.link_noums.unlink_modal_confirm')}
      </Button>
      <Button
        size="full"
        testId="cancel-linking"
        tertiary
        disabled={loading}
        onClick={handleClose}
      >
        {t('noumena.link_noums.unlink_modal_cancel')}
      </Button>
    </ModalFooter>
  </Modal>
);
