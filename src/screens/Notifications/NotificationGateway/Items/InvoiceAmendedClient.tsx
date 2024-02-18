import { useTranslation } from 'react-i18next';
import { NotificationButton, TranslatedBody } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type BaseInvoiceNotificationProps } from './types';

const InvoiceAmendedClient = ({
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
          i18nKey="noumena.notification_type.invoice_amended_client.body"
          values={{
            user: invoice?.invoiceFrom?.displayName,
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

export default InvoiceAmendedClient;
