import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalSize,
  ModalFooter,
} from '@/components/ExtendedModal';
import { Button, Icon, TSpan } from '@/components';
import { useBreakpoints } from '@/hooks';
import { Stack } from '@/layout';
import { t } from 'i18next';
import { formatDateToMMDDYYYY } from '@/utils/date';
import { type IBillingHistoryModal } from './types';
import {
  BulletWrapper,
  HistoryCardStack,
  Information,
  InformationStack,
} from '../BillingSection/styles';
import { BillingUtil } from '../BillingSection/utils';
import useInvoiceDownlaod from '../hooks/useInvoiceDownlaod';

export function BillingHistoryModal({
  open,
  onClose,
  allInvoices,
}: IBillingHistoryModal) {
  const device = useBreakpoints();

  const { downlaodInvoice } = useInvoiceDownlaod();

  return (
    <Modal
      open={open}
      onClose={onClose}
      size={ModalSize.L}
      enableCloseButton
      isFullScreen={device.isMobile}
      disableBackdropClick
      disableEscapeKeyDown
      spacingMode="gap-content"
    >
      <ModalHeader topPadding={0}>
        {t('noumena.subscription.invoice.heading')}
      </ModalHeader>
      <ModalBody>
        <Stack fullWidth vertical>
          {allInvoices.map((invoice) => (
            <HistoryCardStack key={invoice.invoice_id}>
              <InformationStack>
                <TSpan font="body-m-bold">
                  {BillingUtil.generatePlanName(invoice.plan_name)}
                </TSpan>
                <Information>
                  <TSpan
                    font="footnote"
                    colorToken="--text-tablecell-body-neutral-default"
                  >
                    {`Paid ${BillingUtil.formatMoney(invoice.amount_paid)}`}
                  </TSpan>
                  <BulletWrapper>&#8226;</BulletWrapper>
                  {invoice.issue_date && (
                    <TSpan
                      font="footnote"
                      colorToken="--text-tablecell-body-neutral-disabled"
                    >
                      {formatDateToMMDDYYYY(invoice.issue_date)}
                    </TSpan>
                  )}
                </Information>
              </InformationStack>
              <Button
                primary
                textOnly
                leftIcon={<Icon name="download_m" size={24} />}
                onClick={() => downlaodInvoice(invoice?.external_invoice_id)}
              >
                {t('noumena.subscription.invoice.text')}
              </Button>
            </HistoryCardStack>
          ))}
        </Stack>
      </ModalBody>
      <ModalFooter flexDirection="column" gap={16}>
        <Button primary size="full" onClick={onClose}>
          {t('noumena.close')}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
