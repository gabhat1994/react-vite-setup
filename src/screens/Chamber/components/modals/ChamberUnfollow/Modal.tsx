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
import type ChamberUnfollowProps from './types';

export const ChamberUnfollow: React.FC<ChamberUnfollowProps> = ({
  spaceName,
  onUnfollow,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      open
      testId="chamber-unfollow"
      onClose={onClose}
      size={ModalSize.S}
      disableBackdropClick
    >
      <ModalHeader>{t('noumena.chamber.unfollow')}</ModalHeader>
      <ModalBody align="center">
        <TSpan
          colorToken="--text-modal-neutral-default"
          font="body-l"
          textAlign="center"
        >
          {t('noumena.chamber.unfollow_message', { name: spaceName })}
        </TSpan>
      </ModalBody>
      <ModalFooter flexDirection="column" gap={16}>
        <Button
          testId="chamber-unfollow-button"
          intent="negative"
          align="center"
          size="full"
          onClick={onUnfollow}
        >
          {t('noumena.chamber.unfollow')}
        </Button>
        <Button
          testId="chamber-close-button"
          align="center"
          size="full"
          onClick={onClose}
          tertiary
        >
          {t('noumena.close')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ChamberUnfollow;
