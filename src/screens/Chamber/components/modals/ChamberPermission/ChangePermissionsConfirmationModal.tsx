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
import { ModalButtons } from './styles';
import { type ChangePermissionsConfirmationModalProps } from './types';

export const ChangePermissionsConfirmationModal = ({
  isOpen,
  handleClose,
  handleConfirm,
  count,
}: ChangePermissionsConfirmationModalProps) => (
  <Modal
    testId="change-permissions-confirmation-modal"
    open={isOpen}
    onClose={handleClose}
    size={ModalSize.S}
  >
    <ModalHeader>
      {t(`noumena.link_noums.change_permissions_modal.title`)}
    </ModalHeader>
    <ModalBody>
      <TSpan
        font="body-l"
        textAlign="center"
        colorToken="--text-modal-neutral-default"
      >
        {t(`noumena.link_noums.change_permissions_modal.description`, {
          count,
        })}
      </TSpan>
    </ModalBody>
    <ModalFooter flexDirection="column" gap={16}>
      <ModalButtons primary onClick={handleConfirm}>
        {t(`noumena.link_noums.change_permissions_modal.button.text`)}
      </ModalButtons>
      <ModalButtons tertiary onClick={handleClose}>
        {t(`noumena.cancel`)}
      </ModalButtons>
    </ModalFooter>
  </Modal>
);
