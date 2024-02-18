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
import { Stack } from '@/layout';
import { Icon } from '@/components/Icon';
import { type NoumEditRestrictionModalProps } from './types';

export const NoumEditRestrictionModal = ({
  isOpen,
  onClose,
  isEditing,
}: NoumEditRestrictionModalProps) => (
  <Modal
    open={isOpen}
    size={ModalSize.S}
    onClose={onClose}
    testId="default-event-modal"
    disableBackdropClick
    style={{ padding: 24 }}
  >
    <ModalHeader>
      <Stack vertical gap={26} align="center">
        <Icon
          name="resize_xxl"
          color="--icon-card-danger-primary-default"
          size={52}
        />
        <TSpan font="heading-s-bold">
          {isEditing
            ? t('noumena.noum_editor.modal.edit_restriction.title')
            : t('noumena.noum_editor.modal.view_restriction.title')}
        </TSpan>
      </Stack>
    </ModalHeader>
    <ModalBody style={{ alignItems: 'center' }}>
      <TSpan
        font="body-l"
        textAlign="center"
        colorToken="--text-modal-neutral-default"
        data-testid="event-confirmation-modal-description"
      >
        {isEditing
          ? t('noumena.noum_editor.modal.edit_restriction.description')
          : t('noumena.noum_editor.modal.view_restriction.description')}
      </TSpan>
    </ModalBody>
    {!isEditing && (
      <ModalFooter
        isFullScreen={false}
        gap={16}
        flexDirection="column"
        marginTop={24}
      >
        <Button
          tertiary
          intent="negative"
          size="full"
          onClick={onClose}
          data-testid="cancel-button"
        >
          {t('noumena.close')}
        </Button>
      </ModalFooter>
    )}
  </Modal>
);

export default NoumEditRestrictionModal;
