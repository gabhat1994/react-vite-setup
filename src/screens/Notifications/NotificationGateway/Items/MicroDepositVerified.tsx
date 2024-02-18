import NoumenaLogo from '@/assets/images/noumena-filled-logo.svg';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type MicroDepositVerifiedProps } from './types';

const MicroDepositVerified = ({
  message,
  ...basicProps
}: MicroDepositVerifiedProps) => (
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
  />
);

export default MicroDepositVerified;
