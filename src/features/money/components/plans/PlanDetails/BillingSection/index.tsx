import { Button, Icon, TSpan } from '@/components';
import { useBreakpoints } from '@/hooks';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { Stack } from '@/layout';
import { t } from 'i18next';
import { formatDateToMMDDYYYY } from '@/utils/date';
import { type SubscriptionInvoicesFragment } from '@/apollo/graphql/fragments/subscription.generated';
import { BillingHistoryModal } from '../BillingHistoryModal';
import useInvoiceDownlaod from '../hooks/useInvoiceDownlaod';
import {
  Wrapper,
  HistoryCardStack,
  InformationStack,
  Information,
  BulletWrapper,
} from './styles';
import { BillingUtil } from './utils';

type ModalType = 'billing-history';

interface IBillingSection {
  allInvoices: SubscriptionInvoicesFragment[];
  recentInvoices: SubscriptionInvoicesFragment[];
}
export const BillingSection = ({
  allInvoices,
  recentInvoices,
}: IBillingSection) => {
  const { isSmallerThanLaptop } = useBreakpoints();
  const { modalType, openModal, closeModal, contextData } = useModalManager<
    ModalType,
    SubscriptionInvoicesFragment[]
  >();

  const { downlaodInvoice } = useInvoiceDownlaod();

  const showMoreButton = allInvoices.length > 5;

  const noDataFound = !allInvoices.length;

  return (
    <>
      <Wrapper
        padding={isSmallerThanLaptop ? 16 : 24}
        gap={isSmallerThanLaptop ? 16 : 24}
      >
        <TSpan
          font="heading-xs-bold"
          colorToken="--text-card-header-neutral-highlighted"
        >
          {t('noumena.subscription.invoice.heading')}
        </TSpan>
        {noDataFound && (
          <TSpan font="body-m" colorToken="--text-placeholder-neutral-default">
            {t('noumena.subscription.billing.history.no_data')}
          </TSpan>
        )}
        <Stack fullWidth vertical>
          {recentInvoices.map((invoice) => (
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
                      {formatDateToMMDDYYYY(Number(invoice.issue_date))}
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
        {showMoreButton && (
          <Button
            textOnly
            primary
            size="full"
            onClick={() => {
              openModal('billing-history', allInvoices);
            }}
          >
            {t('noumena.subscription.billing.history.button.text')}
          </Button>
        )}
      </Wrapper>
      {contextData && modalType === 'billing-history' && (
        <BillingHistoryModal
          open={modalType === 'billing-history'}
          onClose={closeModal}
          allInvoices={contextData}
        />
      )}
    </>
  );
};
