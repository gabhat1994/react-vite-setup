import {
  ChargebeeAnchors,
  MembershipPlan,
  PayAsYouGo,
  PlanPurchaseModal,
  PlanSummaryHeader,
  UpgradeToPremium,
} from '@/features/money';
import { useBreakpoints } from '@/hooks';
import { Stack } from '@/layout';
import SinglePageLayout from '@/layout/SinglePageLayout';
import { usePlanSummary } from '@/features/money/components/plans/PlanSummary/hooks/usePlanSummary';
import { useModalManager } from '@/hooks/modal/useModalManager';
import useNoumPlanDetails from '@/features/money/components/plans/PlanDetails/hooks/useNoumPlanDetails';
import { useAuth } from '@/features/auth/contexts';
import { Plan_Category_Enum } from '@/apollo/generated/types';
import { Main } from './styles';

type ModalType = 'purchase-modal';

export const PlanSummary = () => {
  const { modalType, openModal, closeModal } = useModalManager<ModalType>();
  const { user } = useAuth();

  const { isSmallerThanLaptop } = useBreakpoints();
  const {
    plan: existingPlan,
    chargebee,
    isLastPlanInHierarchy,
  } = usePlanSummary({});
  const { noums, noDataFound } = useNoumPlanDetails({
    uid: user?._id,
    plan_category: Plan_Category_Enum.Payasgo,
  });

  return (
    <>
      <SinglePageLayout>
        <PlanSummaryHeader />
        <Main
          fullWidth
          vertical={isSmallerThanLaptop}
          gap={isSmallerThanLaptop ? 16 : 24}
        >
          <Stack vertical gap={isSmallerThanLaptop ? 16 : 24} fullWidth>
            <MembershipPlan plan={existingPlan} />
            <PayAsYouGo noums={noums} noDataFound={noDataFound} />
          </Stack>
          {!isLastPlanInHierarchy && (
            <UpgradeToPremium
              hasExistingPlan={!!existingPlan}
              onUpgradeClick={() => openModal('purchase-modal')}
            />
          )}
        </Main>
      </SinglePageLayout>
      {modalType === 'purchase-modal' && (
        <PlanPurchaseModal
          userAction="upgrade"
          open={modalType === 'purchase-modal'}
          onClose={closeModal}
          existingPlan={existingPlan}
        />
      )}

      <ChargebeeAnchors plans={chargebee.anchors} />
    </>
  );
};
