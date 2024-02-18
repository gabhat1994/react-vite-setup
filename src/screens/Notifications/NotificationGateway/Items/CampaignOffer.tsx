import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type CampaignOfferProps } from './types';

const CampaignOffer = ({ message, ...basicProps }: CampaignOfferProps) => (
  <NotificationItem
    {...basicProps}
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

export default CampaignOffer;
