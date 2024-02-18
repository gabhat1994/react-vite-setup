import React from 'react';
import { Modal } from '@/components/ExtendedModal/Modal';
import { Stack } from '@/layout';
import { Button } from '@/components/Button';
import { TextArea } from '@/components/TextArea';
import { type InvoiceOutputFragment } from '@/apollo/graphql';
import convertToCurrency from '@/utils/currencyToCurrency';
import { type Maybe } from '@/common/types';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import S from './styles';

type SendInvoiceReminderModalProps = {
  isOpenModal: boolean;
  invoice?: Maybe<InvoiceOutputFragment>;
  onClose: () => void;
  onConfirm: (message: string) => void;
};

const SendInvoiceReminderModal: React.FC<SendInvoiceReminderModalProps> = ({
  isOpenModal,
  invoice,
  onClose,
  onConfirm,
}) => {
  const [message, setMessage] = React.useState<string>('');
  const { isMobile } = useBreakpoints();

  return invoice ? (
    <Modal
      isFullScreen={isMobile}
      open={isOpenModal}
      testId="send_reminder_modal"
      onClose={onClose}
      disableBackdropClick
      enableCloseButton
      size={ModalSize.M}
    >
      <ModalHeader>Send Reminder</ModalHeader>
      <ModalBody>
        <Stack gap={16} vertical align="center" justify="center">
          <S.Text>
            Do you want to send the reminder about{' '}
            <S.Text bold>{invoice.invoiceNumber}</S.Text> for{' '}
            <S.Text bold>
              {convertToCurrency(
                invoice.amount ?? 0,
                invoice.currency ?? undefined,
              )}
            </S.Text>{' '}
            to <S.Text bold>{invoice.invoiceTo?.displayName}</S.Text>?
          </S.Text>
          <TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message (Optional)"
          />
        </Stack>
      </ModalBody>
      <ModalFooter>
        <Stack gap={16} fullWidth>
          <Button tertiary onClick={onClose} size="full" testId="cancel_btn">
            Cancel
          </Button>
          <Button
            primary
            size="full"
            testId="confirm_btn"
            grow
            onClick={() => onConfirm(message)}
          >
            Send reminder
          </Button>
        </Stack>
      </ModalFooter>
    </Modal>
  ) : null;
};

export default SendInvoiceReminderModal;
