import { t } from 'i18next';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { type ReportSuccessModalProps } from './types';

export const ReportSuccessModal: React.FC<ReportSuccessModalProps> = ({
  onClose,
}) => (
  <Modal
    open
    testId="report_post_success"
    disableEscapeKeyDown
    disableBackdropClick
    onClose={onClose}
    size={ModalSize.S}
  >
    <ModalHeader data-testid="report_post_success_title">
      {t('noumena.chambers.element.posts.success.report.title')}
    </ModalHeader>
    <ModalBody>
      <TSpan
        textAlign="center"
        data-testid="report_post_success_description"
        font="body-l"
        colorToken="--text-modal-neutral-default"
      >
        {t('noumena.chambers.element.posts.success.report.description')}
      </TSpan>
    </ModalBody>
    <ModalFooter>
      <Button
        primary
        testId="report_post_success_close_btn"
        onClick={onClose}
        size="full"
      >
        {t('noumena.close')}
      </Button>
    </ModalFooter>
  </Modal>
);
