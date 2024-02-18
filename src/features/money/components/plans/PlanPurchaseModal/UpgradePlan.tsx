import { ModalBody, ModalFooter } from '@/components/ExtendedModal';
import { Stack } from '@/layout';
import { Button, TSpan } from '@/components';
import { type SubscriptionFragment } from '@/apollo/graphql/fragments/subscription.generated';
import { type PlanSettingFragment } from '@/apollo/graphql/fragments/planSettingsForComparision.generated';
import { type PlanDifference } from '@/features/money/hooks';
import { t } from 'i18next';
import { PlanUtil } from '../PlanSummary/MembershipPlan/util';

type UpgradePlanProps = {
  onCancel: () => void;
  existingPlan?: SubscriptionFragment;
  selectedPlan?: PlanSettingFragment;
  planDifference?: PlanDifference;
  onUpgrade: () => void;
};

export const UpgradePlan = ({
  onCancel,
  existingPlan,
  selectedPlan,
  planDifference,
  onUpgrade,
}: UpgradePlanProps) => {
  const existingPlanName = PlanUtil.generatePlanName(existingPlan?.plan_name);
  const nextPlanName = PlanUtil.generatePlanName(selectedPlan?.plan_name);

  return (
    <>
      <ModalBody align="center" flexDirection="row">
        <Stack fullWidth gap={16} vertical>
          <TSpan font="body-l" colorToken="--text-modal-neutral-default">
            {t('noumena.plans.upgrade.modal.description', {
              existingPlanName,
              nextPlanName,
            })}
          </TSpan>
          <Stack vertical align="start" gap={4} fullWidth>
            <Stack fullWidth justify="space-between" padding={8}>
              <TSpan font="footnote" colorToken="--text-input-neutral-default">
                Price Difference:
              </TSpan>
              <TSpan
                font="body-m-bold"
                colorToken="--text-input-neutral-filled"
              >
                {planDifference?.priceDifference}
              </TSpan>
            </Stack>
            <Stack fullWidth justify="space-between" padding={8}>
              <TSpan font="footnote" colorToken="--text-input-neutral-default">
                New Subscription Start Date:
              </TSpan>
              <TSpan
                font="body-m-bold"
                colorToken="--text-input-neutral-filled"
              >
                {planDifference?.startDate}
              </TSpan>
            </Stack>
          </Stack>
        </Stack>
      </ModalBody>
      <ModalFooter gap={16}>
        <Button size="full" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="full" primary onClick={onUpgrade}>
          Upgrade
        </Button>
      </ModalFooter>
    </>
  );
};
