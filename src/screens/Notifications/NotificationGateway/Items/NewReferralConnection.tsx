import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { formatMultipleUserNames } from '../utils';
import { type NewReferralConnectionProps } from './types';

const NewReferralConnection = ({
  users,
  ...basicProps
}: NewReferralConnectionProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="NewReferralConnection"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.new_referral_connection.body"
        values={{
          usersList: formatMultipleUserNames(users),
        }}
      />
    }
  />
);

export default NewReferralConnection;
