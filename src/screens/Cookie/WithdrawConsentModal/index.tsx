import React, { useCallback } from 'react';
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
import { useCookieConsent } from '@/providers/CookieProvider/context';

export const WithdrawConsentModal: React.FC<{
  isOpen: boolean;
  handleClose: () => void;
}> = ({ isOpen, handleClose }) => {
  const { withdraw } = useCookieConsent();

  const onContinue = useCallback(async () => {
    await withdraw();
    handleClose();
  }, [handleClose, withdraw]);

  return (
    <Modal
      isFullScreen={false}
      open={isOpen}
      onClose={handleClose}
      disableBackdropClick
      size={ModalSize.S}
    >
      <ModalHeader>{t('noumena.withdraw-consent-modal.title')}</ModalHeader>
      <ModalBody>
        <TSpan
          colorToken="--text-modal-neutral-default"
          textAlign="center"
          font="body-l"
        >
          {t('noumena.withdraw-consent-modal.body')}
        </TSpan>
      </ModalBody>
      <ModalFooter gap={16} flexDirection="column">
        <Button size="full" primary onClick={onContinue}>
          {t('noumena.continue')}
        </Button>
        <Button tertiary size="full" onClick={handleClose}>
          {t('noumena.cancel')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
