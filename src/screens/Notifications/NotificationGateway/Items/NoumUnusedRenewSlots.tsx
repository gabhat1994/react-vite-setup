import { t } from 'i18next';
import { TranslatedBody } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type NoumUnusedRenewSlotsProps } from './types';

const NoumUnusedRenewSlots = ({
  message,
  ...basicProps
}: NoumUnusedRenewSlotsProps) => (
  <AdminMessage
    {...basicProps}
    data-testid="RiseApplicationSubmitted"
    title={t('noumena.notification_type.unused_renewal_slots.title')}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.unused_renewal_slots.body"
        values={{ message }}
      />
    }
  />
);

export default NoumUnusedRenewSlots;
