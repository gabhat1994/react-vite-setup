import {
  PlanDetailsHeader,
  PlanInformationCard,
  Banner,
  NoumsSection,
  PaymentSection,
  BillingSection,
  ChargebeeAnchors,
  PlanPurchaseModal,
} from '@/features/money';
import { useNavigate, useParams, generatePath } from 'react-router';
import { type UserAction } from '@/features/money/components/plans/PlanPurchaseModal/types';
import { useBreakpoints } from '@/hooks';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { Stack } from '@/layout';
import SinglePageLayout from '@/layout/SinglePageLayout';
import { usePlanDetails } from '@/features/money/components/plans/PlanDetails/hooks/usePlanDetails';
import { PlanUtil } from '@/features/money/components/plans/PlanSummary/MembershipPlan/util';
import ProjectCreate from '@/screens/Chamber/components/modals/ProjectCreate';
import { Spinner } from '@/components';
import routes from '@/constants/routes';
import { Main } from './styles';

type ModalType = 'purchase-modal' | 'create-noum';
export const PlanDetails = () => {
  const { isSmallerThanLaptop } = useBreakpoints();
  const { id } = useParams();
  const navigate = useNavigate();

  const { modalType, openModal, closeModal, contextData } = useModalManager<
    ModalType,
    UserAction
  >();

  const { planDetails, loading, globalSettings, invoices, chargebee } =
    usePlanDetails(id);

  const {
    existingPlan,
    isFirstPlanInHierarchy,
    isLastPlanInHierarchy,
    isFreePlan,
  } = planDetails;

  const showTryPremiumBanner = PlanUtil.showTryPremiumBanner(
    existingPlan?.plan_category,
  );

  const isTrialExpired = PlanUtil.hasTrialExpired(
    existingPlan?.status,
    existingPlan?.valid_till,
  );

  const isTrialAboutToExpire = PlanUtil.isTrialAboutToExpire(
    existingPlan?.status,
    existingPlan?.valid_till,
  );

  const handleSuccessfulPlanPurchase = () => navigate(routes.MY_PLAN);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <ChargebeeAnchors plans={chargebee.anchors} />
      <SinglePageLayout>
        <PlanDetailsHeader
          plan={existingPlan}
          isFirstPlanInHierarchy={isFirstPlanInHierarchy}
          isLastPlanInHierarchy={isLastPlanInHierarchy}
          isFreePlan={isFreePlan}
          onSucessFulPurchase={handleSuccessfulPlanPurchase}
        />
        <Main
          fullWidth
          vertical={isSmallerThanLaptop}
          gap={isSmallerThanLaptop ? 16 : 24}
        >
          <Stack
            vertical
            gap={isSmallerThanLaptop ? 16 : 24}
            fullWidth
            maxWidth={isSmallerThanLaptop ? undefined : 840}
          >
            <PlanInformationCard
              plan={existingPlan}
              globalSetting={globalSettings}
              isFreePlan={isFreePlan}
            />
            <NoumsSection
              planId={id}
              usedSetupSlots={existingPlan?.counters?.noumSetup.current}
              totalSetupSlots={existingPlan?.counters?.noumSetup.limit}
              onAddNoum={() => openModal('create-noum')}
              allowNoumCreate={!planDetails.isPayAsYouGoPlan}
            />
          </Stack>
          <Stack
            vertical
            gap={isSmallerThanLaptop ? 16 : 24}
            fullWidth
            maxWidth={isSmallerThanLaptop ? undefined : 437}
          >
            {showTryPremiumBanner && (
              <Banner
                label="Try Our Membership Plan"
                description="Explore exciting features exclusive to our higher plans with a
              14-day trial of our Membership Plan."
                buttonName="Start Trial"
                onClickHandler={() => openModal('purchase-modal', 'try')}
              />
            )}
            {!isFreePlan && (
              <PaymentSection
                plan={existingPlan}
                latestInvoiceId={invoices.latestInvoice?.invoice_id}
                latestInvoiceStatus={invoices.latestInvoice?.status}
              />
            )}
            {!isFreePlan && (
              <BillingSection
                allInvoices={invoices.allInvoices}
                recentInvoices={invoices.recentInvoices}
              />
            )}
            {isTrialAboutToExpire && (
              <Banner
                label="Trial Expires Soon!"
                description="Don't miss out on our premium features. Upgrade now to keep enjoying all the benefits of our Membership Plan."
                buttonName="Upgrade Now"
                onClickHandler={() => openModal('purchase-modal', 'upgrade')}
              />
            )}
            {isTrialExpired && (
              <Banner
                label="Trial Expired"
                description="Don't let the benefits slip away. Renew your Membership Plan now to regain access to our exclusive features."
                buttonName="Upgrade Now"
                onClickHandler={() => openModal('purchase-modal', 'upgrade')}
              />
            )}
          </Stack>
        </Main>
      </SinglePageLayout>
      {contextData && modalType === 'purchase-modal' && (
        <PlanPurchaseModal
          userAction={contextData}
          open={modalType === 'purchase-modal'}
          onClose={closeModal}
          existingPlan={existingPlan}
          onSucessFulPurchase={handleSuccessfulPlanPurchase}
        />
      )}

      <ProjectCreate
        isOpen={modalType === 'create-noum'}
        handleClose={closeModal}
        handleSuccess={(noumId) => {
          navigate(generatePath(routes.EDIT_NOUM, { id: noumId }));
          closeModal();
        }}
      />
    </>
  );
};

export default PlanDetails;
