import { t } from 'i18next';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalSize,
} from '@/components/ExtendedModal';
import { Stack } from '@/layout';
import { TSpan, Tag } from '@/components';
import { useBreakpoints, useToast } from '@/hooks';
import { chunkStringWithoutWordBreaking } from '@/utils/strings';
import { type TransactionModalProps } from './type';
import { CopyTextTSpan } from '../styles';
import { getTagTypeAndTransactionStatus } from '../../utils/transactionStatus';

export function TransactionModal({
  open,
  onClose,
  paymentReferenceNumber,
  paymentStatus,
}: TransactionModalProps) {
  const { isMobile } = useBreakpoints();
  const { addSuccessIconToast } = useToast();
  const { tagType, status } = getTagTypeAndTransactionStatus(paymentStatus);

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentReferenceNumber);
    addSuccessIconToast(
      t('noumena.transaction.modal.reference.number.copy.success.message'),
    );
  };

  const chunkedReferenceNumber = chunkStringWithoutWordBreaking(
    paymentReferenceNumber,
    8,
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      size={isMobile ? ModalSize.S : ModalSize.M}
      enableCloseButton={!isMobile}
      isFullScreen={false}
    >
      <ModalHeader topPadding={0}>
        {t('noumena.transaction.modal.header')}
      </ModalHeader>
      <ModalBody align="center" gap={24} flexDirection="column" noFooter>
        <Stack fullWidth align="center" justify="space-between">
          <TSpan font="body-m-bold">
            {t('noumena.transaction.modal.status.label')}
          </TSpan>
          <Tag
            success={tagType === 'success'}
            danger={tagType === 'danger'}
            secondary={tagType === 'secondary'}
            tertiary={tagType === 'tertiary'}
            contentFont="footnote-bold"
          >
            {status}
          </Tag>
        </Stack>
        <Stack fullWidth align="center" justify="space-between">
          <TSpan font="body-m-bold" style={{ width: '50%' }}>
            {isMobile
              ? t('noumena.transaction.modal.reference.number.label.for.mobile')
              : t('noumena.transaction.modal.reference.number.label')}
          </TSpan>
          <Stack align="center" gap={4} style={{ maxWidth: '65%' }}>
            <TSpan font="body-m">{chunkedReferenceNumber}</TSpan>
            <CopyTextTSpan onClick={handleCopy}>Copy</CopyTextTSpan>
          </Stack>
        </Stack>
      </ModalBody>
    </Modal>
  );
}
