import { type CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { type ChamberUnarchiveModalProps } from './types';
import * as S from './styles';

const style = { maxWidth: '30em' } as CSSProperties;

export const ChamberUnarchive = memo(
  ({
    isOpen,
    handleClose,
    onUnarchive,
    loading,
  }: ChamberUnarchiveModalProps) => {
    const { t } = useTranslation();
    return (
      <Modal
        isFullScreen={false}
        testId="chamberUnarchiveModal"
        open={isOpen}
        onClose={handleClose}
        style={style}
        size={ModalSize.S}
      >
        <ModalHeader isFullScreen={false}>
          {t(`noumena.chamber_view.modal.unarchive.title`)}
        </ModalHeader>
        <ModalBody isFullScreen={false}>
          <TSpan
            font="body-l"
            colorToken="--text-modal-neutral-default"
            textAlign="center"
          >
            {t(`noumena.chamber_view.modal.unarchive.description`)}
          </TSpan>
        </ModalBody>
        <ModalFooter isFullScreen={false} flexDirection="column" gap={16}>
          <S.ModalButtons
            primary
            intent="positive"
            onClick={onUnarchive}
            loading={loading}
          >
            {t(`noumena.chamber_view.modal.unarchive.btn.publish`)}
          </S.ModalButtons>
          <S.ModalButtons tertiary onClick={handleClose}>
            {t(`noumena.close`)}
          </S.ModalButtons>
        </ModalFooter>
      </Modal>
    );
  },
);
