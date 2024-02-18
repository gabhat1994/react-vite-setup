import { UserUtil } from '@/utils/user';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type ConnectionRequestAcceptedProps } from './types';

const ConnectionRequestAccepted = ({
  noumName,
  requestTo,
  ...basicProps
}: ConnectionRequestAcceptedProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.connection_request_accepted.body"
        values={{
          noumName,
          requestTo: UserUtil.renderFullName(requestTo),
        }}
      />
    }
  />
);

export default ConnectionRequestAccepted;
