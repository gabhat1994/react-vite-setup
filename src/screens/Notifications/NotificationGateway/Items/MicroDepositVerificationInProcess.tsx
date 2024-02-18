import { t } from 'i18next';
import NoumenaLogo from '@/assets/images/noumena-filled-logo.svg';
import NotificationItem, {
  NotificationButton,
  TranslatedBody,
} from '../../NotificationLayout';
import { type MicroDepositVerificationInProcessProps } from './types';

const MicroDepositVerificationInProcess = ({
  message,
  onGoToWallet,
  ...basicProps
}: MicroDepositVerificationInProcessProps) => (
  <NotificationItem
    {...basicProps}
    avatars={[NoumenaLogo]}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.campaing_report.body"
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

export default MicroDepositVerificationInProcess;
