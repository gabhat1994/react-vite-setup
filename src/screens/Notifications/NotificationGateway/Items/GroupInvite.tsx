import { t } from 'i18next';
import NotificationItem, {
  NotificationButton,
  TranslatedBody,
} from '../../NotificationLayout';
import { formatMultipleUserNames } from '../utils';
import { type GroupInviteProps } from './types';

const GroupInvite = ({ group, users, ...basicProps }: GroupInviteProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="GroupInvite"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.group_invite.body"
        values={{
          usersList: formatMultipleUserNames(users),
          groupName: group?.name,
        }}
      />
    }
    buttons={
      <>
        <NotificationButton variant="primary">
          {t('noumena.Accept')}
        </NotificationButton>
        <NotificationButton variant="secondary">
          {t('noumena.reject')}
        </NotificationButton>
      </>
    }
  />
);

export default GroupInvite;
