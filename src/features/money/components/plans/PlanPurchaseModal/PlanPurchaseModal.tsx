import { Modal, ModalHeader } from '@/components/ExtendedModal';

import { type PlanPurchaseModalProps } from './types';
import { usePlanPurchaseModal } from '../../../hooks/plans';
import { PlanInformation } from './PlanInformation';
import { PlanComparison } from './PlanComparison';
import { PlanCustomization } from './PlanCustomization';
import { UpgradePlan } from './UpgradePlan';
import { DowngradePlan } from './DowngradePlan';
import { NoumSelection } from './NoumSelection';

export function PlanPurchaseModal({
  open,
  onClose,
  userAction,
  existingPlan,
  onSucessFulPurchase,
  newNoumData,
  chamberIdForUnarchive,
}: PlanPurchaseModalProps) {
  const { modal, handlers, state, data, loading } = usePlanPurchaseModal({
    userAction,
    existingPlan,
    newNoumData,
    chamberIdForUnarchive,
    onSucessFulPurchase,
    onCloseModal: onClose,
  });

  const { planSetting, globalSettings, noumsWithExistingPlan } = data;
  const { modalSize, modalTitle, isFullScreen } = modal;
  const { modalType, selectedPlan, planFrequency, noumsToMove } = state;

  return (
    <Modal
      open={open}
      onClose={handlers.closeModal}
      isFullScreen={isFullScreen}
      size={modalSize}
      enableCloseButton
      disableBackdropClick
      disableEscapeKeyDown
    >
      <ModalHeader topPadding={0}>{modalTitle}</ModalHeader>

      {modalType === 'plan-information' && (
        <PlanInformation
          userAction={userAction}
          loading={loading.planSettingsLoading || loading.planSettingsLoading}
          planSetting={planSetting}
          globalSettings={globalSettings}
          onPlanPurchase={handlers.updateSelectedPlan}
          onCompareButtonClick={handlers.updateModalContent}
        />
      )}

      {modalType === 'plan-comparison' && (
        <PlanComparison
          userAction={userAction}
          planSetting={planSetting}
          onPlanPurchase={handlers.updateSelectedPlan}
        />
      )}

      {modalType === 'plan-customization' && selectedPlan && (
        <PlanCustomization
          userAction={userAction}
          selectedPlan={selectedPlan}
          selectedPlanFrequency={planFrequency}
          updatePlanFrequency={handlers.updatePlanFrequency}
          onCancel={handlers.closeModal}
          onConfirmAndPay={handlers.purchasePlan}
          loading={loading.fetchingNoums || loading.fetchingPlanDifference}
          globalSetting={globalSettings}
          onCheckOtherPlansClick={handlers.updateContentToPlanInformation}
        />
      )}

      {modalType === 'plan-upgrade' && (
        <UpgradePlan
          onCancel={handlers.closeModal}
          existingPlan={existingPlan}
          selectedPlan={state.selectedPlan}
          planDifference={state.planDifference}
          onUpgrade={handlers.loadCheckoutUrl}
        />
      )}

      {modalType === 'plan-downgrade' && (
        <DowngradePlan
          onCancel={handlers.closeModal}
          existingPlan={existingPlan}
          selectedPlan={state.selectedPlan}
          planDifference={state.planDifference}
          onDowngrade={handlers.loadCheckoutUrl}
        />
      )}

      {modalType === 'noum-selection' && (
        <NoumSelection
          noumsWithExistingPlan={noumsWithExistingPlan}
          maxNoumSelectionLimit={data.downgradeNoumLimit}
          noumsToMove={noumsToMove}
          onSelectNoum={handlers.updateNoumListToBeMoved}
          onMoveNoum={handlers.getEstimates}
          loading={loading.fetchingPlanDifference}
        />
      )}
    </Modal>
  );
}
