import { memo } from 'react';
import { ChargebeeAnchors, PlanPurchaseModal } from '@/features/money';
import { type ProjectCreateProps } from './types';
import { ProjectCreate } from './Modal';
import { LinkNoumToSubscriptionModal } from './LinkNoumToSubscriptionModal';
import { useNoumForSubscription } from './useNoumForSubscription';

export const ProjectCreateModal = memo((props: ProjectCreateProps) => {
  const { data, handlers, modalType, linkOption, loading } =
    useNoumForSubscription({
      onSuccess: props.handleSuccess,
    });

  const { planSummaryLoading, creatingNoum, linkingNoum } = loading;

  const handleClose = () => {
    handlers.setContentToCreateForm();
    handlers.updateLinkOption();
    props.handleClose();
  };

  if (!props.isOpen) return null;

  return (
    <>
      {modalType === 'create-noum-form' && (
        <ProjectCreate
          {...props}
          isOpen={modalType === 'create-noum-form'}
          handleClose={handleClose}
          onCreateNoum={(projectData) => {
            handlers.updateNoumData(projectData);
            handlers.setContentToLinkOption();
          }}
        />
      )}

      {modalType === 'link-noum-to-subscription' && (
        <LinkNoumToSubscriptionModal
          open={modalType === 'link-noum-to-subscription'}
          loading={creatingNoum || linkingNoum || planSummaryLoading}
          linkOption={linkOption}
          availableSlotsinExistingPlan={data.availableSlotsInExistingPlan}
          onClose={handleClose}
          onUpdateLinkOption={handlers.updateLinkOption}
          onActionButtonClick={handlers.handleActionButtonClick}
          isLastPlanInHierarchy={data.isLastPlanInHierarchy}
        />
      )}

      {modalType === 'plan-purchase' && (
        <PlanPurchaseModal
          open={modalType === 'plan-purchase'}
          onClose={handleClose}
          userAction="upgrade"
          existingPlan={data.existingPlan}
          onSucessFulPurchase={handlers.purchasePlanAndCreateLinkNoum}
          newNoumData={data.noumData}
        />
      )}

      <ChargebeeAnchors plans={data.anchors} />
    </>
  );
});
