import { UserUtil } from '@/utils/user';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type InviteAcceptedProps } from './types';

const InviteAccepted = ({
  users,
  requestTo,
  ...basicProps
}: InviteAcceptedProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="InviteAccepted"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.invite_accepted.body"
        values={{
          requestTo: UserUtil.renderFullName(requestTo),
        }}
      />
    }
  />
);

export default InviteAccepted;
