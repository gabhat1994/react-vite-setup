import { UserUtil } from '@/utils/user';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type ConnectionRequestDeclinedProps } from './types';

const ConnectionRequestDeclined = ({
  noumName,
  requestTo,
  ...basicProps
}: ConnectionRequestDeclinedProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.connection_request_declined.body"
        values={{
          noumName,
          requestTo: UserUtil.renderFullName(requestTo),
        }}
      />
    }
  />
);

export default ConnectionRequestDeclined;
