import { useTranslation } from 'react-i18next';
import { NotificationButton, TranslatedBody } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type BaseInvoiceNotificationProps } from './types';

const InvoicePartiallyPaidClient = ({
  invoice,
  onClick,
  ...basicProps
}: BaseInvoiceNotificationProps) => {
  const { t } = useTranslation();

  return (
    <AdminMessage
      {...basicProps}
      data-testid="InvoicePartiallyPaidClient"
      body={
        <TranslatedBody
          i18nKey="noumena.notification_type.invoice_partially_paid_client.body"
          values={{
            user: invoice?.invoiceFrom?.displayName,
            invoiceNumber: invoice?.invoiceNumber,
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

export default InvoicePartiallyPaidClient;
