import { ChargebeeAnchors, PlanPurchaseModal } from '@/features/money';
import { LinkNoumToSubscriptionModal } from '../ProjectCreate/LinkNoumToSubscriptionModal';
import { type ChamberUnarchiveModalProps } from './types';
import { useChamberUnarchiveV2 } from './useChamberUnarchiveV2';

export function ChamberUnarchiveV2({
  isOpen,
  spaceId,
  handleClose,
}: ChamberUnarchiveModalProps) {
  const { modalType, loading, data, handlers, state } = useChamberUnarchiveV2({
    spaceId,
    onSuccess: handleClose,
  });

  const { linkOption } = state;
  const { availableSlotsInExistingPlan, isLastPlanInHierarchy, anchors } = data;
  const { linkingNoum, payAsYouGoNoumsLoading, planSummaryLoading } = loading;

  if (!isOpen) return null;

  return (
    <>
      {modalType === 'link-noum' && (
        <LinkNoumToSubscriptionModal
          open={modalType === 'link-noum'}
          onClose={handleClose}
          availableSlotsinExistingPlan={availableSlotsInExistingPlan}
          isLastPlanInHierarchy={isLastPlanInHierarchy}
          onActionButtonClick={handlers.handleActionButtonClick}
          onUpdateLinkOption={handlers.updateLinkOption}
          linkOption={linkOption}
          loading={linkingNoum || payAsYouGoNoumsLoading || planSummaryLoading}
        />
      )}

      {modalType === 'plan-purchase' && (
        <PlanPurchaseModal
          open={modalType === 'plan-purchase'}
          onClose={handleClose}
          userAction="upgrade"
          existingPlan={data.existingPlan}
          chamberIdForUnarchive={spaceId}
        />
      )}

      <ChargebeeAnchors plans={anchors} />
    </>
  );
}
