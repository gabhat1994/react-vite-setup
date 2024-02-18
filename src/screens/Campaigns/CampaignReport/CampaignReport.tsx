import SinglePageLayout from '@/layout/SinglePageLayout';
import { useBreakpoints } from '@/hooks/useBreakpoints';

import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Layout } from '../components/Layout/Layout';
import { ExpertMessage } from '../components/ExpertMessage';
import { Header } from '../components/CampaignHeader';
import { ReportSummary } from './ReportSummary';
import { useCampaignReport } from './useCampaignReport';
import { useDownloads } from '../hooks/useDownload';

function Download({
  onDownload,
  isMobile,
}: {
  onDownload: () => void;
  isMobile: boolean;
}) {
  return (
    <Button
      size="small"
      leftIcon={<Icon name="download_m" size={16} />}
      tertiary
      onClick={onDownload}
    >
      {isMobile ? '' : 'Download PDF'}
    </Button>
  );
}

export function CampaignReport() {
  const device = useBreakpoints();
  const { Ref, handleDownloadPdf } = useDownloads();
  const { report, campaign } = useCampaignReport({});

  if (!report) {
    return <></>;
  }

  return (
    <SinglePageLayout>
      <Header
        heading={`Report #${report.reportId}`}
        isMobile={device.isMobile}
        isTablet={device.isTablet}
        stepper={false}
        currentStep={0}
        totalSteps={0}
        rightAction={
          <Download
            onDownload={() =>
              handleDownloadPdf({
                document: 'report',
                documentId: report.reportId,
              })
            }
            isMobile={device.isMobile}
          />
        }
      />
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
            campaignCreatedBy={campaign.campaignCreatedBy}
            message={report.clientMessage}
            createdBy={report.createdBy}
          />
        </Layout.Main>
      </div>
    </SinglePageLayout>
  );
}
