import { TransactionModal } from '@/features/TransactionModal';
import { TransactionModalType } from '@/features/TransactionModal/types';

import { EnumAdCampaignOfferStatus } from '@/apollo/generated/types';
import { Icon } from '@/components/Icon';
import { Infobox } from '@/components/Infobox';
import { PDFDownloadLink } from '@react-pdf/renderer';
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import SinglePageLayout from '@/layout/SinglePageLayout';
import { Spinner } from '@/components/Spinner';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { Tag } from '@/components/Tag';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Utils } from '../utils';
import { PdfOffer } from './pdf';
import { OfferActions } from './OfferActions';
import { Layout } from '../components/Layout/Layout';
import { Goals } from './Goals';
import { ExpertMessage } from '../components/ExpertMessage';
import { CampaignOfferSummary } from './CampaignOfferSummary';
import { Actions, Header } from '../components/CampaignHeader';
import { useCampaignOffer } from './useCampaignOffer';

const renderLabel = (status: string, updatedAt: string) =>
  [
    EnumAdCampaignOfferStatus.Accepted,
    EnumAdCampaignOfferStatus.Rejected,
  ].includes(status as EnumAdCampaignOfferStatus) ? (
    <Tag tertiary>
      <TSpan font="body-m-bold" colorToken="text-tag-neutral-default">
        {status && Utils.capitalizeFirstLetter(status)} {':  '}{' '}
        {updatedAt && Utils.formatDate(updatedAt)}
      </TSpan>
    </Tag>
  ) : (
    <></>
  );
export function CampaignOffer() {
  const device = useBreakpoints();

  const {
    modal,
    userAction,
    campaign,
    offer,
    campaignAccount,
    button,
    refetch,
    loading,
    repayment,
    infobox,
  } = useCampaignOffer();
  // const { Ref, handleDownloadPdf } = useDownloads();
  return (
    <SinglePageLayout>
      {loading.page ? (
        <Spinner />
      ) : (
        <Header
          heading={`Offer #${offer.oid}`}
          label={renderLabel(offer.status, offer.updatedAt)}
          isMobile={device.isMobile}
          isTablet={device.isTablet}
          stepper={false}
          currentStep={0}
          totalSteps={0}
          wrap={true}
          rightAction={
            <Actions.OfferActions
              hideAcceptAndPay={button.hidePayment}
              hideRejectButton={button.hideRejected}
              disableButtons={loading.page}
              onAcceptAndPay={userAction.acceptAndPay}
              onDownload={() => {
                (
                  document?.getElementById('print')
                    ?.firstElementChild as HTMLAnchorElement
                ).click();
              }}
              onReject={userAction.reject}
            />
          }
        />
      )}

      {loading.page ? (
        <Spinner />
      ) : (
        <>
          <div
            // ref={Ref}
            style={{
              alignSelf: 'center',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Layout.Main>
              {repayment && infobox.open && (
                <div
                  style={{
                    width: device.isDesktop || device.isLaptop ? '100%' : '90%',
                    padding:
                      device.isMobile || device.isTablet ? '20px' : '0px',
                  }}
                >
                  <Infobox type="negative">
                    <Stack justify="space-between" align="center">
                      <div>
                        Payment verification failed. Please click “Accept and
                        Pay” to try again.
                      </div>
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={infobox.toggle}
                      >
                        <Icon
                          name="close_s"
                          size={24}
                          color="--border-infobox-danger-primary-default"
                        />
                      </div>
                    </Stack>
                  </Infobox>
                </div>
              )}
              {/* <div ref={Ref}> */}
              <CampaignOfferSummary
                title={campaign.title}
                startAt={offer.startAt}
                createdAt={offer.createdAt}
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
                isMobile={device.isMobile}
                estimatedDuration={offer.estimatedDuration}
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
              {/* </div> */}
            </Layout.Main>
          </div>
          <div id="print" style={{ display: 'none' }}>
            <PDFDownloadLink document={<PdfOffer />} fileName="offer.pdf">
              {() => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>
          </div>
        </>
      )}

      {(modal.modalType === 'accept' || modal.modalType === 'reject') && (
        <OfferActions
          open={!!modal.modalType}
          actionButtonLoading={
            loading.campaignAccount || loading.rejection || loading.wallet
          }
          onClose={modal.closeModal}
          action={modal.modalType ?? 'accept'}
          onAction={modal.handleModalAction}
        />
      )}

      {modal.modalType === 'pay' && (
        <TransactionModal
          open={modal.modalType === 'pay'}
          type={TransactionModalType.PAY}
          isDestinationDropdownDisabled
          defaultWalletPayee={campaignAccount}
          defaultAmount={offer.costTotal ?? 0}
          handleClose={refetch.onAccepted}
          disableAmountsField
          campaignId={campaign?.campaignId ?? ''}
          offerId={offer._id ?? ''}
          campaignRepayment={repayment}
        />
      )}
    </SinglePageLayout>
  );
}
