import { t } from 'i18next';
import { NotificationButton, TranslatedBody } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type BaseInvoiceNotificationProps } from './types';

const InvoiceFullyPaidClient = ({
  invoice,
  onClick,
  ...basicProps
}: BaseInvoiceNotificationProps) => (
  <AdminMessage
    {...basicProps}
    data-testid="InvoiceFullyPaidClient"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.invoice_fully_paid_client.body"
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

export default InvoiceFullyPaidClient;
