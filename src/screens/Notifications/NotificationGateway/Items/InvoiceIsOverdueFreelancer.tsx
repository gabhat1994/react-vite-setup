import { t } from 'i18next';
import { NotificationButton, TranslatedBody } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type BaseInvoiceNotificationProps } from './types';

const InvoiceIsOverdueFreelancer = ({
  invoice,
  onClick,
  ...basicProps
}: BaseInvoiceNotificationProps) => (
  <AdminMessage
    {...basicProps}
    data-testid="InvoiceIsOverdueFreelancer"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.invoice_is_overdue_freelancer.body"
        values={{
          user: invoice?.invoiceTo?.displayName,
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

export default InvoiceIsOverdueFreelancer;
