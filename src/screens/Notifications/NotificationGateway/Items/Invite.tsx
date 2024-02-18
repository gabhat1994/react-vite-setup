import { t } from 'i18next';
import NotificationItem, {
  NotificationButton,
  TranslatedBody,
} from '../../NotificationLayout';
import { formatMultipleUserNames } from '../utils';
import { type InviteProps } from './types';
import { NotificationConnectionStatus } from '../../types';

const Invite = ({
  users,
  onAccept,
  onReject,
  invitationStatus,
  isReminder,
  ...basicProps
}: InviteProps) => (
  <NotificationItem
    {...basicProps}
    data-testid={isReminder ? 'InviteReminder' : 'Invite'}
    body={
      <TranslatedBody
        i18nKey={
          isReminder
            ? 'noumena.notification_type.invite_reminder.body'
            : 'noumena.notification_type.invite.body'
        }
        values={{
          usersList: formatMultipleUserNames(users),
        }}
      />
    }
    buttons={
      [
        NotificationConnectionStatus.INVITED,
        NotificationConnectionStatus.REQUESTED,
      ].includes(invitationStatus) && (
        <>
          <NotificationButton variant="primary" onClick={onAccept}>
            {t('noumena.chamber.connect_button')}
          </NotificationButton>
          <NotificationButton variant="secondary" onClick={onReject} textOnly>
            {t('noumena.reject')}
          </NotificationButton>
        </>
      )
    }
  />
);

export default Invite;
