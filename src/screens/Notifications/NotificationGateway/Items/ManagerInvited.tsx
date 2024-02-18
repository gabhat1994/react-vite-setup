import { t } from 'i18next';
import { UserUtil } from '@/utils/user';
import { MemberUtils } from '@/features/noums/utils';
import NotificationItem, {
  NotificationButton,
  TranslatedBody,
} from '../../NotificationLayout';
import { type ManagerInvitedProps } from './types';
import { useNotificationHandlers } from '../../NotificationHandlersContext';

function ManagerInvited({
  users,
  noumName,
  noumId,
  noumOwner,
  noumMember,
  status,
  notification,
  ...basicProps
}: ManagerInvitedProps) {
  const {
    memberInvitations: {
      acceptRolePromotion,
      acceptInvitation,
      rejectInvitation,
      rejectRolePromotion,
    },
  } = useNotificationHandlers();

  return (
    <NotificationItem
      {...basicProps}
      data-testid="ManagerInvited"
      body={
        <TranslatedBody
          i18nKey="noumena.notification_type.manager.member_invited_to_noum.body"
          values={{
            noumName,
            userName: UserUtil.renderFullName(users[0]),
          }}
        />
      }
      buttons={
        MemberUtils.hasPendingManagerPromotion(noumMember) ? (
          <>
            <NotificationButton
              variant="primary"
              onClick={() => acceptRolePromotion(notification, noumId)}
            >
              {t('noumena.accept')}
            </NotificationButton>
            <NotificationButton
              variant="secondary"
              onClick={() => rejectRolePromotion(notification, noumId)}
              textOnly
            >
              {t('noumena.reject')}
            </NotificationButton>
          </>
        ) : status && MemberUtils.hasPendingInvitation({ status }) ? (
          <>
            <NotificationButton
              variant="primary"
              onClick={() => acceptInvitation(notification, noumId)}
            >
              {t('noumena.accept')}
            </NotificationButton>
            <NotificationButton
              variant="secondary"
              onClick={() => rejectInvitation(notification, noumId)}
              textOnly
            >
              {t('noumena.reject')}
            </NotificationButton>
          </>
        ) : null
      }
      hideButtonsAfterAction
    />
  );
}

export default ManagerInvited;
