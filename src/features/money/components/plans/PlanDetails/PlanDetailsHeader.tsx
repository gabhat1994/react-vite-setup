import { useCallback } from 'react';
import {
  Dropdown,
  DropdownPicker,
  type DropdownValueType,
  type DropdownTargetProps,
} from '@/components/Dropdown';
import { Icon, Tag, TSpan } from '@/components';
import { useBreakpoints, useToast } from '@/hooks';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { type SubscriptionFragment } from '@/apollo/graphql/fragments/subscription.generated';
import { Stack } from '@/layout';
import { Header } from '@/components/Header';
import { t } from 'i18next';
import * as PlanDetailsHeaderButton from './PlanDetailsHeaderButton';
import { PlanPurchaseModal } from '../PlanPurchaseModal/PlanPurchaseModal';
import { CancelPlanModal } from './CancelPlanModal';
import { options, optionsMobile } from './helper';
import { type UserAction } from '../PlanPurchaseModal/types';
import { BulletWrapper } from '../../styles';
import { PlanUtil } from '../PlanSummary/MembershipPlan/util';
import { BillingPeriodUnitEnum } from '../PlanSummary/MembershipPlan/types';

type ModalType = 'cancel' | 'plan-purchase-modal';

interface IPlanDetailsHeader {
  plan?: SubscriptionFragment;
  isLastPlanInHierarchy: boolean;
  isFirstPlanInHierarchy: boolean;
  isFreePlan: boolean;
  onSucessFulPurchase: () => void;
}
export const PlanDetailsHeader = ({
  plan,
  isLastPlanInHierarchy,
  isFirstPlanInHierarchy,
  isFreePlan,
  onSucessFulPurchase,
}: IPlanDetailsHeader) => {
  const { isMobile } = useBreakpoints();
  const { addPrimaryIconToast } = useToast();
  const { modalType, openModal, closeModal, contextData } = useModalManager<
    ModalType,
    UserAction
  >();

  const handleSelction = useCallback(
    (e: DropdownValueType<string>) => {
      if (e.key === 'cancel') {
        openModal('cancel');
      } else if (e.key === 'upgrade') {
        if (isLastPlanInHierarchy) {
          addPrimaryIconToast('You are already subscribed to highest plan');
          return;
        }
        openModal('plan-purchase-modal', 'upgrade');
      } else {
        if (isFirstPlanInHierarchy) {
          addPrimaryIconToast('You are already subscribed to lowest plan');
          return;
        }
        openModal('plan-purchase-modal', 'downgrade');
      }
    },
    [
      addPrimaryIconToast,
      isFirstPlanInHierarchy,
      isLastPlanInHierarchy,
      openModal,
    ],
  );

  const isPlanExpired = PlanUtil.hasPlanExpired(plan?.status, plan?.valid_till);
  const isTrialExpired = PlanUtil.hasTrialExpired(
    plan?.status,
    plan?.valid_till,
  );
  const isTrialAboutToExpire = PlanUtil.isTrialAboutToExpire(
    plan?.status,
    plan?.valid_till,
  );

  const daysLeftWithTrail = plan?.valid_till
    ? PlanUtil.countDaysToExpire(plan?.valid_till)
    : 0;

  return (
    <>
      <Header isBorderRadius={false}>
        <Stack gap={8} align="center">
          <Stack gap={4} align="center">
            <TSpan
              font="body-l-bold"
              colorToken="--text-card-header-neutral-highlighted"
            >
              {PlanUtil.generatePlanName(plan?.plan_name)}
            </TSpan>
            {PlanUtil.showBillingFrequency(plan?.plan_category) && (
              <>
                <BulletWrapper>&#8226;</BulletWrapper>
                <TSpan
                  font="body-l"
                  colorToken="--text-top-nav-neutral-default"
                >
                  {plan?.billing_period_unit?.toLowerCase() ===
                  BillingPeriodUnitEnum.MONTH.toLowerCase()
                    ? 'Monthly'
                    : 'Yearly'}
                </TSpan>
              </>
            )}
          </Stack>
          {isPlanExpired && (
            <Tag size="medium" danger>
              {t('noumena.money.myplans.expired')}
            </Tag>
          )}
          {isTrialExpired && (
            <Tag size="medium" danger>
              {t('noumena.money.myplans.trial_expired')}
            </Tag>
          )}
          {isTrialAboutToExpire && (
            <Tag size="medium" warning>
              {t(
                daysLeftWithTrail > 1
                  ? 'noumena.money.myplans.trial_about_to_expire'
                  : 'noumena.money.myplans.trial_about_to_expire_for_one_day',
                {
                  daysLeftWithTrail,
                },
              )}
            </Tag>
          )}
        </Stack>
        <Stack gap={12} align="center">
          {isFreePlan || (
            <Dropdown
              hideIcons
              options={isMobile ? optionsMobile : options}
              usePortal={true}
              containerWidth="200px"
              onSelectOption={handleSelction}
              placement="auto-start"
              calRefTop={false}
              usePopStyle={true}
            >
              {({
                targetProps,
                targetRef,
                toggle,
              }: DropdownTargetProps<HTMLDivElement>) => (
                <>
                  <DropdownPicker
                    ref={targetRef}
                    {...targetProps}
                    onClick={toggle}
                  >
                    <Icon
                      name="more_m"
                      color="--icon-button-neutral-default"
                      size={24}
                    />
                  </DropdownPicker>
                </>
              )}
            </Dropdown>
          )}
          {!isMobile && (
            <PlanDetailsHeaderButton.UpgradeButton
              onClick={() => {
                if (isLastPlanInHierarchy) {
                  addPrimaryIconToast(
                    'You are already subscribed to highest plan',
                  );
                  return;
                }
                openModal('plan-purchase-modal', 'upgrade');
              }}
            />
          )}
        </Stack>
      </Header>
      {contextData && modalType === 'plan-purchase-modal' && (
        <PlanPurchaseModal
          userAction={contextData}
          open={modalType === 'plan-purchase-modal'}
          onClose={closeModal}
          existingPlan={plan}
          onSucessFulPurchase={onSucessFulPurchase}
        />
      )}
      {modalType === 'cancel' && (
        <CancelPlanModal
          open={modalType === 'cancel'}
          onClose={closeModal}
          planId={plan?.subscription_id}
        />
      )}
    </>
  );
};
