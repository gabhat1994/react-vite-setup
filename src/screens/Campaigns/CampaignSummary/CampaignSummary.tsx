import SinglePageLayout from '@/layout/SinglePageLayout';
import { Stack } from '@/layout';
import { Spinner } from '@/components/Spinner';
import { useBreakpoints } from '@/hooks/useBreakpoints';

import S from './styles';
import { CampaignDetails } from './CampaignDetails';
import { Header, Actions } from '../components/CampaignHeader';

import {
  OffersAndReports as Offers,
  OffersAndReports as Reports,
} from './OffersAndReports';

import { Utils } from '../utils';
import { useCampaignSummary } from '../hooks/useCampaignSummary';
import { DeleteCampaignConfirmation } from '../components/DeleteCampaignConformation';

export function CampaignSummary() {
  const device = useBreakpoints();

  const { campaign, offers, reports, loading, modal } = useCampaignSummary();
  const { summary } = campaign;

  const hideStepper =
    summary?.status === 'LIVE' || summary?.status === 'COMPLETED';

  return (
    <SinglePageLayout>
      <Header
        heading={device.isMobile ? 'Campaign' : 'Campaign Summary'}
        isMobile={device.isMobile}
        isTablet={device.isTablet}
        currentStep={2}
        totalSteps={3}
        stepper={!hideStepper}
        onBack={campaign.handleBack}
        unsetMinWidth
        rightAction={
          <Actions.SummaryActions
            isMobile={device.isMobile}
            isTablet={device.isTablet}
            hideDelete={!Utils.canDelete(summary?.status || '')}
            onDelete={campaign.openDeleteConfirmationModal}
            onDuplicate={campaign.duplicate}
            deleteDisabled={false}
          />
        }
      />
      {loading.campaign || loading.offers || loading.reports ? (
        <Spinner />
      ) : (
        <div
          style={{
            alignSelf: 'center',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <S.Main>
            <CampaignDetails
              title={summary?.title}
              status={summary?.status}
              audience={summary?.audience}
              startDate={summary?.startDate}
              noumId={summary?.noumId}
              goals={summary?.goals}
              budgetAmount={summary?.budgetAmount}
              budgetType={summary?.budgetType}
              adId={summary?.adId}
              otherGoals={summary?.otherGoals}
            />
            <Stack
              vertical={device.isMobile || device.isTablet}
              fullWidth
              gap={16}
            >
              <Offers
                heading="Offers"
                type="offer"
                count={offers.count}
                noDataNote="Your offers will appear here soon."
                onView={campaign.viewOffer}
                list={offers.list}
                onToggleOldOffers={offers.toggleOldOffers}
              />

              <Reports
                type="report"
                count={reports.count}
                heading="Reports"
                noDataNote="Your reports will appear here soon."
                onView={campaign.viewReport}
                list={reports.list}
              />
            </Stack>
          </S.Main>
        </div>
      )}

      <DeleteCampaignConfirmation
        open={modal.modalType === 'delete-confirmation'}
        onClose={modal.closeModal}
        campaign={modal.contextData}
        onDelete={campaign.softDelete}
        actionButtonLoading={campaign.isDeleting}
      />
    </SinglePageLayout>
  );
}
