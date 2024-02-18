import { TranslatedBody } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type RiseApplicationStatusUpdateProps } from './types';

const RiseApplicationStatusConnectedUser = ({
  message,
  ...basicProps
}: RiseApplicationStatusUpdateProps) => (
  <AdminMessage
    {...basicProps}
    data-testid="RiseApplicationSubmitted"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.rise_application_submitted.body"
        values={{ message }}
      />
    }
  />
);

export default RiseApplicationStatusConnectedUser;
