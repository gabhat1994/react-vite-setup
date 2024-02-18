import { useTranslation } from 'react-i18next';
import { NotificationButton, TranslatedBody } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type BaseInvoiceNotificationProps } from './types';

const InvoicePartiallyPaidFreelancer = ({
  invoice,
  onClick,
  ...basicProps
}: BaseInvoiceNotificationProps) => {
  const { t } = useTranslation();

  return (
    <AdminMessage
      {...basicProps}
      data-testid="InvoicePartiallyPaidFreelancer"
      body={
        <TranslatedBody
          i18nKey="noumena.notification_type.invoice_partially_paid_freelancer.body"
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
};

export default InvoicePartiallyPaidFreelancer;