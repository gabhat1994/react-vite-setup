import { t } from 'i18next';
import { NotificationButton, TranslatedBody } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type BaseInvoiceNotificationProps } from './types';

const InvoiceManualReminderFreelancer = ({
  invoice,
  onClick,
  ...basicProps
}: BaseInvoiceNotificationProps) => (
  <AdminMessage
    {...basicProps}
    data-testid="InvoiceManualReminder"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.invoice_manual_reminder_freelancer.body"
        values={{
          user: invoice?.invoiceTo?.displayName,
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

export default InvoiceManualReminderFreelancer;
