import { t } from 'i18next';
import { TranslatedBody } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type UserRejectedProps } from './types';

const UserRejected = ({ ...basicProps }: UserRejectedProps) => (
  <AdminMessage
    {...basicProps}
    data-testid="UserRejected"
    title={t('noumena.notification_type.user_rejected.title')}
    body={
      <TranslatedBody i18nKey="noumena.notification_type.user_rejected.body" />
    }
  />
);

export default UserRejected;
