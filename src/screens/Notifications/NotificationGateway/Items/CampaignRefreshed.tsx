import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type CampaignRefreshedProps } from './types';

const CampaignRefreshed = ({
  noumName,
  ...basicProps
}: CampaignRefreshedProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.campaign_refreshed.body"
        values={{
          noumName,
        }}
      />
    }
  />
);

export default CampaignRefreshed;
