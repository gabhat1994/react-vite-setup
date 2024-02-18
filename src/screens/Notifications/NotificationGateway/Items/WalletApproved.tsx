import { t } from 'i18next';
import { TranslatedBody, NotificationButton } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type WalletApprovedProps } from './types';

const WalletApproved = ({
  message,
  onGoToWallet,
  ...basicProps
}: WalletApprovedProps) => (
  <AdminMessage
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.wallet.approved.body"
        values={{
          message,
        }}
      />
    }
    buttons={
      <NotificationButton variant="primary" onClick={onGoToWallet}>
        {t('noumena.notifications.go_to_wallet')}
      </NotificationButton>
    }
  />
);

export default WalletApproved;
