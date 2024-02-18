import React from 'react';
import { useTranslation } from 'react-i18next';

import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import type ChamberDisconnectProps from './types';

export const ChamberDisconnect: React.FC<ChamberDisconnectProps> = ({
  spaceName,
  onDisconnect,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      open
      testId="chamber-disconnect"
      onClose={onClose}
      size={ModalSize.S}
      disableBackdropClick
    >
      <ModalHeader>{t('noumena.chamber.disconnect')}</ModalHeader>
      <ModalBody align="center">
        <TSpan
          colorToken="--text-modal-neutral-default"
          font="body-l"
          textAlign="center"
        >
          {t('noumena.chamber.disconnect_message', { name: spaceName })}
        </TSpan>
      </ModalBody>
      <ModalFooter flexDirection="column" gap={16}>
        <Button
          testId="chamber-disconnect-button"
          intent="negative"
          align="center"
          size="full"
          onClick={onDisconnect}
        >
          {t('noumena.chamber.disconnect')}
        </Button>
        <Button
          testId="chamber-close-button"
          align="center"
          size="full"
          onClick={onClose}
        >
          {t('noumena.close')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ChamberDisconnect;
