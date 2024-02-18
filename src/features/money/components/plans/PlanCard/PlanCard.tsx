import { useMemo } from 'react';
import { Stack } from '@/layout';
import { Button, TSpan, Tag } from '@/components';
import {
  type PlanSettingFragment,
  type PlanItemBasicFragment,
  type PlanSettingBasicFragment,
} from '@/apollo/graphql/fragments/planSettingsForComparision.generated';
import { PlanPriceUtils, getPlanBenefits } from '@/features/money/utils/plans';
import { PlanBenefitList } from '../PlanBenefitList/PlanBenefitList';
import * as S from '../planCommonStyles';
import {
  PlanCardStack,
  PlanInformationStack,
  PlanBenefitsStack,
} from './styles';
import {
  type UserAction,
  type ModalType,
  type GlobalSettingObject,
} from '../PlanPurchaseModal/types';
import { getButtonLabel } from './helper';

type PlanCardProps = {
  modalType: ModalType;
  itemId: string;
  plansWithFrequencies: PlanItemBasicFragment[];
  selectedPlanFrequency?: PlanItemBasicFragment;
  onPlanPurchaseClick?: (itemId: string) => void;
  userAction: UserAction;
  globalSetting?: GlobalSettingObject;
  planSetting?: PlanSettingFragment;
} & Pick<PlanSettingBasicFragment, 'spotlight' | 'plan_name' | 'description'>;

export function PlanCard({
  onPlanPurchaseClick,
  modalType,
  plan_name,
  itemId,
  plansWithFrequencies,
  selectedPlanFrequency,
  description,
  userAction,
  globalSetting,
  planSetting,
}: PlanCardProps) {
  const showPurchaseButton = modalType !== 'plan-customization';
  const showPlanDescription = modalType !== 'plan-comparison' && !!description;
  const showPlanStartLabel = modalType !== 'plan-customization';
  const showBenefitList = modalType !== 'plan-comparison';
  const buttonLabel = getButtonLabel(userAction, plan_name || '');
  const planPrice = selectedPlanFrequency
    ? PlanPriceUtils.getPlanPrice(selectedPlanFrequency)
    : PlanPriceUtils.getLowestPlanPrice(plansWithFrequencies);

  const listOfBenefits = useMemo(
    () => getPlanBenefits({ globalSetting, planSetting }),
    [globalSetting, planSetting],
  );

  return (
    <PlanCardStack>
      <PlanInformationStack>
        <Stack fullWidth vertical align="start" gap={4}>
          <Stack fullWidth align="center" justify="space-between">
            <S.PlanName
              colorToken="--text-card-brand-primary-default"
              font={
                modalType === 'plan-comparison'
                  ? 'body-m-bold'
                  : 'heading-xs-bold'
              }
            >
              {plan_name || ''}
            </S.PlanName>
            <Tag size="small" secondary contentFont="footnote-bold">
              Popular
            </Tag>
          </Stack>
          {showPlanDescription && (
            <S.PlanDescription>{description}</S.PlanDescription>
          )}
        </Stack>
        <Stack vertical align="start" justify="center">
          {showPlanStartLabel && (
            <TSpan colorToken="--text-card-neutral-default" font="footnote">
              Starts at
            </TSpan>
          )}
          <Stack gap={2}>
            <S.CurrencySymbol>$</S.CurrencySymbol>
            <Stack gap={8} align="baseline">
              <S.Price>
                {PlanPriceUtils.convertCentsToDollars(planPrice)}
              </S.Price>
              <TSpan font="body-m" colorToken="--text-card-neutral-highlighted">
                / month
              </TSpan>
            </Stack>
          </Stack>
        </Stack>

        {showPurchaseButton && (
          <Button
            size="full_small"
            secondary
            onClick={() => onPlanPurchaseClick?.(itemId)}
          >
            {buttonLabel}
          </Button>
        )}
      </PlanInformationStack>
      {showBenefitList && (
        <PlanBenefitsStack>
          <PlanBenefitList listOfBenefits={listOfBenefits} />
        </PlanBenefitsStack>
      )}
    </PlanCardStack>
  );
}
