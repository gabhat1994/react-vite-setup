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
import { type ChamberArchiveModalProps } from './types';
import * as S from './styles';

const style = { maxWidth: '30em' } as CSSProperties;

export const ChamberArchiveModal = memo(
  ({
    noumName,
    isOpen,
    handleClose,
    onArchive,
    loading,
  }: ChamberArchiveModalProps) => {
    const { t } = useTranslation();
    return (
      <Modal
        isFullScreen={false}
        testId="chamberArchiveModal"
        open={isOpen}
        onClose={handleClose}
        style={style}
        size={ModalSize.S}
        disableBackdropClick
      >
        <ModalHeader isFullScreen={false}>
          {t(`noumena.chamber_edit.archive.title`)}
        </ModalHeader>
        <ModalBody isFullScreen={false}>
          <TSpan
            colorToken="--text-modal-neutral-default"
            font="body-l"
            textAlign="center"
          >
            {t(`noumena.chamber.edit.archive_description`).replace(
              '{0}',
              noumName,
            )}
          </TSpan>
        </ModalBody>
        <ModalFooter isFullScreen={false} flexDirection="column" gap={16}>
          <S.ModalButtons
            primary
            intent="negative"
            onClick={onArchive}
            loading={loading}
          >
            {t(`noumena.chamber_edit.archive`)}
          </S.ModalButtons>
          <S.ModalButtons tertiary onClick={handleClose}>
            {t(`noumena.close`)}
          </S.ModalButtons>
        </ModalFooter>
      </Modal>
    );
  },
);

export default ChamberArchiveModal;
