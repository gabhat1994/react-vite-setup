import { Trans, useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import S from './styles';

interface DeclineDocumentConfirmationModalProps {
  isOpen: boolean;
  documentName: string;
  onDelete(): void;
  onCancel(): void;
}

export function DeclineDocumentConfirmationModal({
  isOpen,
  documentName,
  onDelete,
  onCancel,
}: DeclineDocumentConfirmationModalProps) {
  const { t } = useTranslation();

  return (
    <Modal
      testId="reference-delete-modal"
      open={isOpen}
      onClose={onCancel}
      size={ModalSize.S}
      disableBackdropClick
    >
      <ModalHeader>{t('noumena.contracts.decline_document.title')}</ModalHeader>
      <ModalBody>
        <Stack vertical align="center" gap={24}>
          <TSpan
            font="body-l"
            colorToken="--text-modal-neutral-default"
            textAlign="center"
          >
            <Trans
              i18nKey="noumena.contracts.decline_document.description"
              components={[<S.Title />]}
              values={{ documentName }}
            />
          </TSpan>
          <TSpan
            font="body-l"
            colorToken="--text-modal-neutral-default"
            textAlign="center"
          >
            {t('noumena.contracts.decline_document.description_note')}
          </TSpan>
        </Stack>
      </ModalBody>
      <ModalFooter flexDirection="column" gap={16}>
        <Button
          size="full"
          intent="negative"
          primary
          testId="delete-reference-btn"
          onClick={onDelete}
        >
          {t('noumena.contracts.decline_document.confirm')}
        </Button>
        <Button
          size="full"
          tertiary
          testId="delete-reference-no-btn"
          onClick={onCancel}
        >
          {t(`noumena.cancel`)}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
