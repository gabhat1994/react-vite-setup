import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type CampaignReportProps } from './types';

const CampaignReport = ({ message, ...basicProps }: CampaignReportProps) => (
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

export default CampaignReport;
