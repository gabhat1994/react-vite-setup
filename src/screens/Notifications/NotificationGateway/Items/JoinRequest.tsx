import { t } from 'i18next';
import NotificationItem, {
  NotificationButton,
  TranslatedBody,
} from '../../NotificationLayout';
import { formatMultipleUserNames } from '../utils';
import { type JoinRequestProps } from './types';

const JoinRequest = ({ group, users, ...basicProps }: JoinRequestProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="JoinRequest"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.join_request.body"
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

export default JoinRequest;
