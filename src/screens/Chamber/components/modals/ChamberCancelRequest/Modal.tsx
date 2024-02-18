import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import type ChamberCancelRequestProps from './types';

export const ChamberCancelRequest: React.FC<ChamberCancelRequestProps> = ({
  spaceName,
  onCancelRequest,
  onClose,
  loading,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      open
      testId="chamber-cancel-request"
      onClose={onClose}
      size={ModalSize.S}
      disableBackdropClick
    >
      <ModalHeader>{t('noumena.chamber.cancel_request')}</ModalHeader>
      <ModalBody align="center">
        <TSpan
          colorToken="--text-modal-neutral-default"
          font="body-l"
          textAlign="center"
        >
          {t('noumena.chamber.cancel_request_message', { name: spaceName })}
        </TSpan>
      </ModalBody>
      <ModalFooter flexDirection="column" gap={16}>
        <Button
          testId="chamber-cancel-request-button"
          intent="negative"
          align="center"
          size="full"
          onClick={onCancelRequest}
          loading={loading}
        >
          {t('noumena.chamber.cancel_request')}
        </Button>
        <Button
          testId="chamber-close-button"
          align="center"
          size="full"
          tertiary
          onClick={onClose}
          disabled={loading}
        >
          {t('noumena.close')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ChamberCancelRequest;
