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

export const UnlinkOnArchiveNoumModal: React.FC<{
  isOpen: boolean;
  handleClose: () => void;
  handleUnlinking: () => void;
  loading: boolean;
}> = ({ isOpen, handleClose, handleUnlinking, loading }) => (
  <Modal
    testId="unlink-archive-noum-modal"
    open={isOpen}
    onClose={handleClose}
    size={ModalSize.S}
    disableBackdropClick
  >
    <ModalHeader>{t('noumena.link_archive_noums.Noum_is_linked')}</ModalHeader>
    <ModalBody
      isFullScreen={false}
      style={{
        alignItems: 'center',
      }}
    >
      <TSpan
        font="body-l"
        textAlign="center"
        colorToken="--text-modal-neutral-default"
      >
        {t('noumena.link_archive_noums.description')}
      </TSpan>
    </ModalBody>
    <ModalFooter flexDirection="column" gap={16}>
      <Button
        testId="enable-linking"
        size="full"
        intent="negative"
        disabled={loading}
        onClick={handleUnlinking}
      >
        {t('noumena.link_archive_noums.Noum_unlink')}
      </Button>{' '}
      <Button
        tertiary
        size="full"
        testId="cancel-linking"
        disabled={loading}
        onClick={handleClose}
      >
        {t('noumena.link_archive_noums.Noum_cancel')}
      </Button>
    </ModalFooter>
  </Modal>
);
