import { UserUtil } from '@/utils/user';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type ConnectedProps } from './types';

const Connected = ({
  noumName,
  requestFrom,
  ...basicProps
}: ConnectedProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.connected.body"
        values={{
          noumName,
          requestFrom: UserUtil.renderFullName(requestFrom),
        }}
      />
    }
  />
);

export default Connected;
