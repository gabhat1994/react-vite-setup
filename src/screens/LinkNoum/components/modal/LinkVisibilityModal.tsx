import React from 'react';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';

export const LinkVisibilityModal: React.FC<{
  isOpen: boolean;
  visibility: string;
  handleAccept: () => void;
  handleClose: () => void;
}> = ({ isOpen, handleClose, visibility, handleAccept }) => (
  <Modal
    testId="link-visibility-modal"
    open={isOpen}
    onClose={handleClose}
    size={ModalSize.S}
  >
    <ModalHeader>
      {t('noumena.link_noums.visibility_modal.heading')}
    </ModalHeader>
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
        <Trans
          i18nKey="noumena.link_noums.visibility_modal.description"
          values={{ visibility }}
          components={{
            b: (
              <TSpan
                font="body-l"
                colorToken="--text-modal-neutral-highlighted"
                textAlign="center"
              />
            ),
          }}
        />
      </TSpan>
    </ModalBody>
    <ModalFooter flexDirection="column" gap={16}>
      <Button size="full" primary onClick={handleAccept}>
        {t('noumena.continue')}
      </Button>
      <Button size="full" onClick={handleClose}>
        {t('noumena.cancel')}
      </Button>
    </ModalFooter>
  </Modal>
);
