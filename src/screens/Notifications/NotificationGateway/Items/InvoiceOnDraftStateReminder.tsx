import { t } from 'i18next';
import { NotificationButton, TranslatedBody } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type BaseInvoiceNotificationProps } from './types';

const InvoiceOnDraftStateReminder = ({
  invoice,
  onClick,
  ...basicProps
}: BaseInvoiceNotificationProps) => (
  <AdminMessage
    {...basicProps}
    data-testid="InvoiceOnDraftStateReminder"
    body={
      <TranslatedBody i18nKey="noumena.notification_type.invoice_draft_reminder_freelancer.body" />
    }
    buttons={
      <>
        <NotificationButton variant="primary" onClick={onClick}>
          {t(
            'noumena.notification_type.invoice_view_invoice.go_back_to_invoice',
          )}
        </NotificationButton>
      </>
    }
  />
);

export default InvoiceOnDraftStateReminder;
