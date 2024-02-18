import { useTranslation } from 'react-i18next';
import { AllCurrencyEnum } from '@/apollo/generated/types';
import convertToCurrency from '@/utils/currencyToCurrency';
import { NotificationButton, TranslatedBody } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type BaseInvoiceNotificationProps } from './types';

const InvoicePaymentFailedClient = ({
  invoice,
  onClick,
  ...basicProps
}: BaseInvoiceNotificationProps) => {
  const { t } = useTranslation();

  return (
    <AdminMessage
      {...basicProps}
      data-testid="InvoiceAmended"
      body={
        <TranslatedBody
          i18nKey="noumena.notification_type.invoice_payment_failed_client.body"
          values={{
            user: invoice?.invoiceFrom?.displayName,
            invoiceNumber: invoice?.invoiceNumber,
            amount: convertToCurrency(
              invoice?.amount ?? 0,
              invoice?.currency ?? AllCurrencyEnum.Usd,
            ),
          }}
        />
      }
      buttons={
        <>
          <NotificationButton variant="primary" onClick={onClick}>
            {t('noumena.notification_type.invoice_view_invoice.button')}
          </NotificationButton>
        </>
      }
    />
  );
};

export default InvoicePaymentFailedClient;
