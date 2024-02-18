/* eslint-disable no-console */
import { memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import OpsInvoiceSummaryLayout from '@/layout/OpsInvoiceSummaryLayout';
import { StickyFormHeader } from '@/components/FormHeader/StickyFormHeader/StickyFormHeader';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import S from '@/screens/InvoiceTool/styles';
import { Layout } from '@/screens/Campaigns/components/Layout/Layout';
import { ExpertMessage } from '@/screens/Campaigns/components/ExpertMessage';
import { ReportSummary } from '@/screens/Campaigns/CampaignReport/ReportSummary';
import { useCampaignReport } from '@/screens/Campaigns/CampaignReport/useCampaignReport';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { useDownloads } from '@/screens/Campaigns/hooks/useDownload';

type TCampaignReportsOps = {
  reportId: string;
};

export const CampaignReportOps = memo(({ reportId }: TCampaignReportsOps) => {
  const [searchParams] = useSearchParams();
  const device = useBreakpoints();
  const { Ref, handleDownloadPdf } = useDownloads();
  const campaignId = searchParams.get('campaignId') ?? undefined;

  const { report, campaign } = useCampaignReport({
    campaignIdFromOps: campaignId,
    reportIdFromOps: reportId,
  });

  const Buttons = (
    <>
      <Button
        size="small"
        leftIcon={<Icon name="download_m" size={16} />}
        onClick={() =>
          handleDownloadPdf({
            document: 'report',
            documentId: report?.reportId ?? '',
          })
        }
        tertiary
        type="submit"
        disabled={!reportId}
      >
        Download PDF
      </Button>
    </>
  );

  if (!report) {
    return null;
  }

  return (
    <OpsInvoiceSummaryLayout>
      <>
        <S.FormHeaderContainer>
          <StickyFormHeader
            title="Report Details"
            buttons={Buttons}
            showBackButton={false}
          />
        </S.FormHeaderContainer>
        <div
          ref={Ref}
          style={{
            alignSelf: 'center',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Layout.Main>
            <ReportSummary
              metrics={report.metrics}
              createdAt={report.createdAt}
              title={campaign.title}
              campaignCreatedAt={campaign?.createdBy || ''}
              adId={campaign.adId ?? ''}
              isMobile={device.isMobile}
              isTablet={device.isTablet}
            />

            <ExpertMessage
              message={report.clientMessage}
              createdBy={report.createdBy}
              campaignCreatedBy={campaign.campaignCreatedBy ?? ''}
            />
          </Layout.Main>
        </div>
      </>
    </OpsInvoiceSummaryLayout>
  );
});
