import { ModalBody, ModalFooter } from '@/components/ExtendedModal';
// import { Stack } from '@/layout';
import {
  type PlanItemBasicFragment,
  type PlanSettingFragment,
} from '@/apollo/graphql/fragments/planSettingsForComparision.generated';
import { Button } from '@/components';
import { useBreakpoints } from '@/hooks';
import {
  PlanCardStack,
  PlanCustomizationStack,
  PlanFrequencyStack,
} from './styles';
import { PlanCard } from '../PlanCard/PlanCard';
import { PlanFrequency } from './PlanFrequency';
import { type GlobalSettingObject, type UserAction } from './types';

type PlanPurchaseProps = {
  selectedPlan: PlanSettingFragment;
  selectedPlanFrequency?: PlanItemBasicFragment;
  updatePlanFrequency: (frequency: PlanItemBasicFragment) => void;
  onCancel: () => void;
  onConfirmAndPay: () => void;
  userAction: UserAction;
  loading: boolean;
  globalSetting?: GlobalSettingObject;
  onCheckOtherPlansClick: () => void;
};

export const PlanCustomization = ({
  selectedPlan,
  selectedPlanFrequency,
  updatePlanFrequency,
  onCancel,
  onConfirmAndPay,
  userAction,
  loading,
  globalSetting,
  onCheckOtherPlansClick,
}: PlanPurchaseProps) => {
  const devices = useBreakpoints();

  return (
    <>
      <ModalBody
        align={devices.isSmallerThanLaptop ? 'flex-start' : 'center'}
        flexDirection="row"
      >
        <PlanCustomizationStack
          align={devices.isSmallerThanLaptop ? 'start' : 'stretch'}
          vertical={devices.isMobile}
          justify="center"
        >
          <PlanCardStack>
            <PlanCard
              userAction={userAction}
              itemId={selectedPlan.item_id}
              spotlight={selectedPlan.spotlight}
              plan_name={selectedPlan.plan_name}
              description={selectedPlan.description}
              plansWithFrequencies={selectedPlan.plans}
              selectedPlanFrequency={selectedPlanFrequency}
              modalType="plan-customization"
              globalSetting={globalSetting}
              planSetting={selectedPlan}
            />
          </PlanCardStack>
          <PlanFrequencyStack>
            <PlanFrequency
              userAction={userAction}
              planWithFrequencies={selectedPlan.plans}
              onSelectFrequency={updatePlanFrequency}
              onCheckOtherPlansClick={onCheckOtherPlansClick}
            />
          </PlanFrequencyStack>
        </PlanCustomizationStack>
      </ModalBody>
      <ModalFooter gap={16}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          primary
          loading={loading}
          disabled={loading}
          onClick={onConfirmAndPay}
        >
          Confirm & Pay
        </Button>
      </ModalFooter>
    </>
  );
};
