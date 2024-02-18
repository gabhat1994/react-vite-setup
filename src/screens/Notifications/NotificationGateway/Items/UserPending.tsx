import { t } from 'i18next';
import { TranslatedBody } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type UserPendingProps } from './types';

const UserPending = ({ ...basicProps }: UserPendingProps) => (
  <AdminMessage
    {...basicProps}
    data-testid="UserPending"
    title={t('noumena.notification_type.user_pending.title')}
    body={
      <TranslatedBody i18nKey="noumena.notification_type.user_pending.body" />
    }
  />
);

export default UserPending;
