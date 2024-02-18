import { TranslatedBody } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type WalletRejectedProps } from './types';

const WalletRejected = ({ message, ...basicProps }: WalletRejectedProps) => (
  <AdminMessage
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.wallet.rejected.body"
        values={{
          message,
        }}
      />
    }
  />
);

export default WalletRejected;
