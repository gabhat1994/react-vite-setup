import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type CampaignExpiredProps } from './types';

const CampaignExpired = ({ noumName, ...basicProps }: CampaignExpiredProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.campaign_expired.body"
        values={{
          noumName,
        }}
      />
    }
  />
);

export default CampaignExpired;
