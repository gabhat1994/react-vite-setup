import { Button, Tag, TSpan } from '@/components';
import { useNavigate } from 'react-router';
import { useBreakpoints } from '@/hooks';
import { Stack } from '@/layout';
import { useTranslation } from 'react-i18next';
import { type Maybe } from '@/common/types';
import { Infobox } from '@/components/Infobox';
import { Plan_Category_Enum } from '@/apollo/generated/types';
import { format } from 'date-fns';
import { type SubscriptionFragment } from '@/apollo/graphql/fragments/subscription.generated';
import Progress from '../Progress';
import {
  Wrapper,
  SubHeadingWrapper,
  SlotWrapper,
  BulletWrapper,
} from './styles';
import ExpiryBox from '../ExpiryBox';
import { PlanUtil } from './util';
import { BillingPeriodUnitEnum } from './types';

type MembershipPlanProps = {
  plan?: SubscriptionFragment;
};

export const MembershipPlan = ({ plan }: MembershipPlanProps) => {
  const { t } = useTranslation();
  const navigateTo = useNavigate();
  const { isSmallerThanLaptop, isMobile } = useBreakpoints();

  const handleNavigation = (id: Maybe<number>) => {
    if (id) {
      navigateTo(`/noums/plan-details/${id}`);
    }
  };

  const isPlanExpired = PlanUtil.hasPlanExpired(plan?.status, plan?.valid_till);
  const isTrialExpired = PlanUtil.hasTrialExpired(
    plan?.status,
    plan?.valid_till,
  );
  const isPlanAboutToExpire = PlanUtil.isPlanAboutToExpire(
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
    <Wrapper
      fullWidth
      padding={isSmallerThanLaptop ? 16 : 24}
      gap={isSmallerThanLaptop ? 16 : 24}
    >
      <Stack fullWidth gap={8}>
        <TSpan
          font="heading-xs-bold"
          colorToken="--text-card-header-neutral-highlighted"
        >
          {t('noumena.plan_summary.membership_plan')}
        </TSpan>
      </Stack>
      {plan ? (
        <Stack fullWidth vertical gap={isSmallerThanLaptop ? 16 : 24}>
          {isPlanAboutToExpire && (
            <Infobox type="warning">
              <TSpan font="body-m" colorToken="--text-card-neutral-default">
                {t('noumena.plan_summary.membership_plan.waning')}
              </TSpan>
            </Infobox>
          )}
          {isTrialAboutToExpire && (
            <Infobox type="warning">
              <TSpan font="body-m" colorToken="--text-card-neutral-default">
                {t('noumena.plan_summary.membership_plan.trial_warning')}
              </TSpan>
            </Infobox>
          )}
          {isTrialExpired && (
            <Infobox type="negative">
              <TSpan font="body-m" colorToken="--text-card-neutral-default">
                {t('noumena.plan_summary.membership_plan.trial_expired')}
              </TSpan>
            </Infobox>
          )}
          {isPlanExpired && (
            <Infobox type="negative">
              <TSpan font="body-m" colorToken="--text-card-neutral-default">
                {t('noumena.plan_summary.membership_plan.expired')}
              </TSpan>
            </Infobox>
          )}
          <Stack fullWidth vertical>
            <SubHeadingWrapper fullWidth gap={8}>
              <Stack gap={4}>
                <TSpan
                  font="body-l-bold"
                  colorToken="--text-card-header-neutral-highlighted"
                >
                  {PlanUtil.generatePlanName(plan?.plan_name)}
                </TSpan>
                <>
                  <BulletWrapper>&#8226;</BulletWrapper>
                  <TSpan
                    font="body-l"
                    colorToken="--text-top-nav-neutral-default"
                  >
                    {plan.billing_period === 'forever'
                      ? 'Default'
                      : plan?.billing_period_unit?.toLowerCase() ===
                        BillingPeriodUnitEnum.MONTH.toLowerCase()
                      ? 'Monthly'
                      : 'Yearly'}
                  </TSpan>
                </>
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
            </SubHeadingWrapper>
            <SlotWrapper
              justify="space-between"
              vertical={
                isMobile && plan?.plan_category !== Plan_Category_Enum.Free
              }
              gap={16}
            >
              <Stack fullWidth gap={8}>
                <Progress
                  name={t('noumena.money.myplans.noumsetup')}
                  totalSlots={plan?.counters?.noumSetup.limit || 0}
                  usedSlots={plan?.counters?.noumSetup.current || 0}
                />
                {plan?.plan_category !== Plan_Category_Enum.Free &&
                  plan?.valid_till && (
                    <ExpiryBox
                      name={t('noumena.money.myplans.nextpayment')}
                      value={format(new Date(plan?.valid_till), 'dd/MM/yyyy')}
                    />
                  )}
              </Stack>
              <Button
                size={
                  plan?.plan_category !== Plan_Category_Enum.Free && isMobile
                    ? 'full_small'
                    : 'small'
                }
                secondary
                onClick={() => handleNavigation(plan?.subscription_id)}
              >
                {t('noumena.plan_summary.membership_plan.manage')}
              </Button>
            </SlotWrapper>
          </Stack>
        </Stack>
      ) : (
        <TSpan font="body-m" colorToken="--text-placeholder-neutral-default">
          {t('noumena.plan_summary.membership_plan.no_membership_plan')}
        </TSpan>
      )}
    </Wrapper>
  );
};
