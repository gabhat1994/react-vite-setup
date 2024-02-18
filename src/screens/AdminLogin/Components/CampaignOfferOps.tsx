import { memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Spinner } from '@/components/Spinner';
import OpsInvoiceSummaryLayout from '@/layout/OpsInvoiceSummaryLayout';
import { StickyFormHeader } from '@/components/FormHeader/StickyFormHeader/StickyFormHeader';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import S from '@/screens/InvoiceTool/styles';
import { CampaignOfferSummary } from '@/screens/Campaigns/CampaignOffer/CampaignOfferSummary';
import { Layout } from '@/screens/Campaigns/components/Layout/Layout';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { ExpertMessage } from '@/screens/Campaigns/components/ExpertMessage';
import { Goals } from '@/screens/Campaigns/CampaignOffer/Goals';
import {
  useCampaignForOfferQuery,
  useCampaignOfferByIdQuery,
} from '@/apollo/graphql';
import { useError } from '@/hooks';
import { Utils } from '@/screens/Campaigns/utils';
import { useDownloads } from '@/screens/Campaigns/hooks/useDownload';

type TCampaignOfferOps = {
  offeriD: string;
};

export const CampaignOfferOps = memo(({ offeriD }: TCampaignOfferOps) => {
  const device = useBreakpoints();
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get('campaignId') ?? undefined;
  const logger = useError();
  const { Ref, handleDownloadPdf } = useDownloads();

  const { data: campaignData, loading } = useCampaignForOfferQuery({
    variables: { campaignId: campaignId ?? '' },
    skip: !campaignId,
    fetchPolicy: 'cache-and-network',
    onError: (error) =>
      logger.logError(error, 'campaign-summary-in-offer', true),
  });

  const campaign = Utils.mapCampaignForOffer(
    campaignData?.getSelectedAdCampaignDetails,
  );

  const { data: offerData } = useCampaignOfferByIdQuery({
    skip: !offeriD,

    variables: {
      offerId: offeriD ?? '',
    },

    onError: (error) => logger.logError(error, 'offer-by-id', true),
  });

  const offer = Utils.cleanOffer(offerData?.getAdCampaignOfferOne);

  const Buttons = (
    <>
      <Button
        size="small"
        leftIcon={<Icon name="download_m" size={16} />}
        tertiary
        type="submit"
        onClick={() =>
          handleDownloadPdf({ document: 'offer', documentId: offer.oid })
        }
        disabled={!offeriD}
      >
        Download PDF
      </Button>
    </>
  );

  return (
    <OpsInvoiceSummaryLayout>
      {!campaignData?.getSelectedAdCampaignDetails && loading ? (
        <Spinner />
      ) : campaignData?.getSelectedAdCampaignDetails ? (
        <>
          <S.FormHeaderContainer>
            <StickyFormHeader
              title="Offer Details"
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
              <CampaignOfferSummary
                title={campaign.title}
                startAt={offer.startAt}
                endAt={offer.endAt}
                adId={campaign.adId}
                category={campaign.category}
                targetLanguage={campaign.targetLanguage}
                targetLocation={campaign.targetLocation}
                clicksWeekly={offer.clicksWeekly}
                costTotal={offer.costTotal}
                costWeekly={offer.costWeekly}
                reachTotal={offer.reachTotal}
                cpc={offer.cpc}
                noumId={campaign.noumId}
                estimatedDuration={offer.estimatedDuration}
                createdAt={offer.createdAt}
              />

              <ExpertMessage
                campaignCreatedBy={campaign.createdBy.firstName ?? ''}
                createdBy={offer.createdBy}
                message={offer.message}
              />

              <Goals
                isMobile={device.isMobile}
                goalConnectedUsers={offer.goalConnectedUsers}
                goalNoumVisibility={offer.goalNoumVisibility}
                status={offer.status}
                estimatedDuration={offer.estimatedDuration}
                isTablet={device.isTablet}
              />
            </Layout.Main>
          </div>
        </>
      ) : null}
    </OpsInvoiceSummaryLayout>
  );
});
