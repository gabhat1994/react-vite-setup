import { t } from 'i18next';
import { UserUtil } from '@/utils/user';
import NotificationItem, {
  NotificationButton,
  TranslatedBody,
} from '../../NotificationLayout';
import { type ConnectionInvitedProps } from './types';

const ConnectionInvited = ({
  noumName,
  noumOwner,
  message,
  onAccept,
  onReject,
  isReminder,
  ...basicProps
}: ConnectionInvitedProps) => (
  <NotificationItem
    {...basicProps}
    data-testid={isReminder ? 'ConnectionInvitedReminder' : 'ConnectionInvited'}
    body={
      <TranslatedBody
        i18nKey={
          isReminder
            ? 'noumena.notification_type.connection_invited_reminder.body'
            : 'noumena.notification_type.connection_invited.body'
        }
        values={{
          noumName,
          noumOwner: UserUtil.renderFullName(noumOwner),
        }}
      />
    }
    message={message}
    buttons={
      <>
        <NotificationButton variant="primary" onClick={onAccept}>
          {t('noumena.chamber.connect_button')}
        </NotificationButton>
        <NotificationButton variant="secondary" onClick={onReject} textOnly>
          {t('noumena.reject')}
        </NotificationButton>
      </>
    }
  />
);

export default ConnectionInvited;
