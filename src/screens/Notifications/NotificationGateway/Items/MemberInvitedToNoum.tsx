import { t } from 'i18next';
import { UserUtil } from '@/utils/user';
import { MemberUtils } from '@/features/noums/utils';
import NotificationItem, {
  NotificationButton,
  TranslatedBody,
} from '../../NotificationLayout';
import { type MemberInvitedToNoumProps } from './types';

const MemberInvitedToNoum = ({
  users,
  noumName,
  noumOwner,
  noumMember,
  status,
  onAccept,
  onReject,
  ...basicProps
}: MemberInvitedToNoumProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="MemberInvitedToNoum"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.member_invited_to_noum.body"
        values={{
          noumName,
          userName: UserUtil.renderFullName(users[0]),
        }}
      />
    }
    buttons={
      status &&
      MemberUtils.hasPendingInvitation({ status }) && (
        <>
          <NotificationButton variant="primary" onClick={onAccept}>
            {t('noumena.accept')}
          </NotificationButton>
          <NotificationButton variant="secondary" onClick={onReject} textOnly>
            {t('noumena.reject')}
          </NotificationButton>
        </>
      )
    }
    hideButtonsAfterAction
  />
);

export default MemberInvitedToNoum;
