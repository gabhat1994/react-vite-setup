import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import type RiseProgramAlreadyCreatedProps from './types';

export const RiseProgramAlreadyCreated: React.FC<
  RiseProgramAlreadyCreatedProps
> = ({ onClose, riseApplicationNoumId, open }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCreateRiseApplication = useCallback(async () => {
    onClose();
    navigate(`/noum/${riseApplicationNoumId}`);
  }, [navigate, onClose, riseApplicationNoumId]);

  return (
    <Modal
      open={open}
      testId="rise-program-create-noum"
      onClose={onClose}
      size={ModalSize.S}
      disableBackdropClick
    >
      <ModalHeader>
        {t('noumena.chamber.riseprogram.already_created_modal_heading')}
      </ModalHeader>
      <ModalBody align="center">
        <TSpan
          colorToken="--text-modal-neutral-default"
          font="body-l"
          textAlign="center"
        >
          {t('noumena.chamber.riseprogram.already_created_modal_body')}
        </TSpan>
      </ModalBody>
      <ModalFooter flexDirection="column" gap={16}>
        <Button
          testId="chamber-disconnect-button"
          primary
          align="center"
          size="full"
          onClick={handleCreateRiseApplication}
        >
          {t('noumena.chamber.riseprogram.already_created.submitButton')}
        </Button>
        <Button
          testId="chamber-close-button"
          align="center"
          size="full"
          onClick={onClose}
        >
          {t('noumena.chamber.riseprogram.already_created.cancel')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
