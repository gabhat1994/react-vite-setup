import { TSpan } from '@/components';
import { useBreakpoints } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { Stack } from '@/layout';
import { type SubscriptionFragment } from '@/apollo/graphql/fragments/subscription.generated';
import { PlanPriceUtils, getPlanBenefits } from '@/features/money/utils';
import { formatDateToMMDDYYYY } from '@/utils/date';
import { useMemo } from 'react';
import { isBefore } from 'date-fns';
import { Separator } from '@/components/Separator/Separator';
import {
  Wrapper,
  PlanSectionStack,
  Section,
  SectionInternalStack,
} from './styles';
import {
  CurrencySymbol,
  PlanDescription,
  PlanName,
  Price,
} from '../../planCommonStyles';
import { PlanBenefitList } from '../../PlanBenefitList/PlanBenefitList';
import { PlanUtil } from '../../PlanSummary/MembershipPlan/util';
import { type GlobalSettingObject } from '../../PlanPurchaseModal/types';

interface IPlanInformationCard {
  plan?: SubscriptionFragment;
  globalSetting?: GlobalSettingObject;
  isFreePlan: boolean;
}

export const PlanInformationCard = ({
  plan,
  globalSetting,
  isFreePlan,
}: IPlanInformationCard) => {
  const { t } = useTranslation();
  const { isSmallerThanLaptop } = useBreakpoints();
  const planPrice = PlanPriceUtils.convertCentsToDollars(plan?.plan_price || 0);
  const expiryDate = formatDateToMMDDYYYY(plan?.valid_till);
  const todaysDate = new Date();
  const isPlanExpired =
    !isFreePlan && isBefore(new Date(expiryDate), todaysDate);

  const listOfBenefits = useMemo(
    () => getPlanBenefits({ globalSetting, planSetting: plan?.settings }),
    [globalSetting, plan],
  );

  return (
    <Wrapper
      fullWidth
      padding={isSmallerThanLaptop ? 16 : 24}
      gap={isSmallerThanLaptop ? 16 : 24}
    >
      <TSpan
        font="heading-xs-bold"
        colorToken="--text-card-header-neutral-highlighted"
      >
        {t('noumena.plan_details.plan_info.Heading')}
      </TSpan>
      <PlanSectionStack>
        <Section rightBorder>
          <SectionInternalStack>
            <PlanName
              font="body-xl-bold"
              colorToken={
                isPlanExpired
                  ? '--text-card-header-neutral-default'
                  : '--text-card-brand-primary-default'
              }
            >
              {PlanUtil.generatePlanName(plan?.plan_name || '')}
            </PlanName>
            <PlanDescription>
              {plan?.settings?.description || ''}
            </PlanDescription>
            {!isFreePlan && (
              <Stack gap={2}>
                <CurrencySymbol>$</CurrencySymbol>
                <Stack gap={8} align="baseline">
                  <Price>{planPrice}</Price>
                  <TSpan
                    font="body-m"
                    colorToken="--text-card-neutral-highlighted"
                  >
                    / month
                  </TSpan>
                </Stack>
              </Stack>
            )}
          </SectionInternalStack>
          <Separator fullWidth noMargin />
          <SectionInternalStack>
            {isPlanExpired ? (
              <>
                <TSpan
                  font="footnote"
                  colorToken="--text-card-danger-primary-default"
                >
                  Expired
                </TSpan>
                <TSpan
                  font="body-m-bold"
                  colorToken="--text-card-danger-primary-default"
                >
                  {expiryDate}
                </TSpan>
              </>
            ) : (
              <>
                <TSpan font="footnote" colorToken="--text-card-neutral-default">
                  Expires
                </TSpan>
                <TSpan
                  font="body-m-bold"
                  colorToken="--text-card-neutral-highlighted"
                >
                  {isFreePlan ? '-' : expiryDate}
                </TSpan>
              </>
            )}
          </SectionInternalStack>
        </Section>
        <Section>
          <TSpan
            font="body-l-bold"
            colorToken="--text-card-header-neutral-highlighted"
          >
            Includes:
          </TSpan>
          <PlanBenefitList
            listOfBenefits={listOfBenefits}
            benefitsExpired={isPlanExpired}
          />
        </Section>
      </PlanSectionStack>
    </Wrapper>
  );
};
