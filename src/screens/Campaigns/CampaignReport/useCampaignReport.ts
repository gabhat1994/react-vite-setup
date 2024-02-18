import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { useCampaignReportQuery } from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';
import { useError } from '@/hooks';
import { Utils } from '../utils';

type Params = {
  id?: string;
};

type UseCampaignReportProps = {
  campaignIdFromOps?: string;
  reportIdFromOps?: string;
};

export const useCampaignReport = ({
  campaignIdFromOps,
  reportIdFromOps,
}: UseCampaignReportProps) => {
  const { isOpsUser } = useAuth();
  const params = useParams<Params>();
  const logger = useError();
  const [searchParams] = useSearchParams();

  const campaignId = isOpsUser
    ? campaignIdFromOps
    : searchParams.get('campaignId');

  const reportId = isOpsUser ? reportIdFromOps : params.id;

  const reportSummary = useCampaignReportQuery({
    skip: !campaignId || !reportId,
    variables: {
      campaignId: campaignId ?? '',
      reportId: reportId ?? '',
    },

    onError: (error) => logger.logError(error, 'useCampaignReportQuery', true),
  });

  const report = reportSummary?.data?.report
    ? Utils.cleanReport(reportSummary?.data?.report)
    : null;

  return {
    report,
    campaign: {
      title: reportSummary?.data?.campaign?.title ?? '',
      createdBy: reportSummary?.data?.campaign?.createdAt
        ? Utils.formatDate(reportSummary?.data?.campaign?.createdAt)
        : '-',
      adId: reportSummary?.data?.campaign?.adId,
      campaignCreatedBy:
        reportSummary?.data?.campaign?.createdBy?.firstName ?? '',
    },
  };
};
