import { t } from 'i18next';
import { TranslatedBody } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type SubscriptionUpcomingPaymentProps } from './types';

const SubscriptionUpcomingPayment = ({
  planName,
  message,
  ...basicProps
}: SubscriptionUpcomingPaymentProps) => (
  <AdminMessage
    {...basicProps}
    data-testid="RiseApplicationSubmitted"
    title={t('noumena.notification_type.upcoming_payment.title', { planName })}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.upcoming_payment.body"
        values={{ message }}
      />
    }
  />
);

export default SubscriptionUpcomingPayment;
