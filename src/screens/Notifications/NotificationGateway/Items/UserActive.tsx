import { t } from 'i18next';
import { NotificationButton, TranslatedBody } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type UserActiveProps } from './types';

const UserActive = ({
  isUserPending,
  onRefresh,
  ...basicProps
}: UserActiveProps) => (
  <AdminMessage
    {...basicProps}
    data-testid="UserActive"
    title={t('noumena.notification_type.user_active.title')}
    body={
      <TranslatedBody i18nKey="noumena.notification_type.user_active.body" />
    }
    buttons={
      isUserPending ? (
        <NotificationButton variant="primary" onClick={onRefresh}>
          {t('noumena.notifications.refresh_my_status')}
        </NotificationButton>
      ) : null
    }
  />
);

export default UserActive;
