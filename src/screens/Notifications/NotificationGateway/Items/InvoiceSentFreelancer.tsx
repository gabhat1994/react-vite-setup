import { TranslatedBody } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type BaseInvoiceNotificationProps } from './types';

const InvoiceSentFreelancer = ({
  invoice,
  ...basicProps
}: BaseInvoiceNotificationProps) => (
  <AdminMessage
    {...basicProps}
    data-testid="InvoiceSentFreelancer"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.invoice_sent_freelancer.body"
        values={{
          user: invoice?.invoiceTo?.displayName,
        }}
      />
    }
  />
);

export default InvoiceSentFreelancer;
