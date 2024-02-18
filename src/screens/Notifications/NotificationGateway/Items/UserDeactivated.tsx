import { t } from 'i18next';
import { TranslatedBody } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type UserDeactivatedProps } from './types';

const UserDeactivated = ({ ...basicProps }: UserDeactivatedProps) => (
  <AdminMessage
    {...basicProps}
    data-testid="UserDeactivated"
    title={t('noumena.notification_type.user_deactivated.title')}
    body={
      <TranslatedBody i18nKey="noumena.notification_type.user_deactivated.body" />
    }
  />
);

export default UserDeactivated;
