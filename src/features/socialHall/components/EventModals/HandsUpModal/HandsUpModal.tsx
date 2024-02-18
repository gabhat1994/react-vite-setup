import { t } from 'i18next';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { HandIconWrapper } from './styles';
import { type HandsUpModalProps } from './types';

export const HandsUpModal = ({
  isOpen,
  onClose,
  onConfirm,
}: HandsUpModalProps) => (
  <Modal
    open={isOpen}
    testId="hands-up-modal"
    size={ModalSize.S}
    disableBackdropClick
  >
    <HandIconWrapper>
      <Icon imageIconName="raise_hand_m" size={48} />
    </HandIconWrapper>
    <ModalHeader flexDirection="column">
      {t('noumena.social_hall.hands_up.modal.title')}
    </ModalHeader>
    <ModalBody>
      <TSpan
        font="body-l"
        textAlign="center"
        colorToken="--text-modal-neutral-default"
        data-testid="event-confirmation-modal-description"
      >
        {t('noumena.social_hall.hands_up.modal.description')}
      </TSpan>
    </ModalBody>
    <Spacer height={16} />
    <ModalFooter gap={16} flexDirection="column" marginTop={12}>
      <Button
        primary
        size="full"
        onClick={onConfirm}
        data-testid="confirm-button"
      >
        {t('noumena.social_hall.hands_up.modal.btn_confirm')}
      </Button>
      <Button
        tertiary
        intent="negative"
        size="full"
        onClick={onClose}
        data-testid="cancel-button"
      >
        {t('noumena.social_hall.hands_up.modal.btn_cancel')}
      </Button>
    </ModalFooter>
  </Modal>
);
