import { t } from 'i18next';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import ROUTES from '@/constants/routes';
import { Spacer, Stack } from '@/layout';
import { TSpan } from '@/components';
import { CircleProgressBar } from '@/components/ProgressBar';
import { usePlanSummary } from '@/features/money/components/plans/PlanSummary/hooks/usePlanSummary';
import { PlanInfo, PlanInfoTile, PlanSelected } from './styles';
import * as Styles from '../styles';

const MyPlans = React.memo(() => {
  const navigateTo = useNavigate();

  const {
    usedNoumSetupSlots,
    totalNoumSetupSlots,
    loading,
    noPlanDataAvailable,
  } = usePlanSummary({});

  const hanldeNavigation = () => {
    navigateTo(ROUTES.MY_PLAN);
  };

  return (
    <>
      <Styles.CardWrapper>
        <Styles.CardHeader>
          <Styles.CardInformation
            font="body-l-bold"
            colorToken="--text-card-header-neutral-highlighted"
          >
            {t('noumena.money.myplans')}
          </Styles.CardInformation>
          <Button
            size="small"
            style={{ width: '40px', height: '40px' }}
            leftIcon={
              <Icon
                name="arrow_right_m"
                size={24}
                color="--icon-button-neutral-default"
              />
            }
            data-testid="stepTwoBackButton"
            tertiary
            onClick={hanldeNavigation}
          />
        </Styles.CardHeader>
        <Spacer height={16} />
        {loading && (
          <>
            <Stack justify="space-between">
              <Skeleton width={256} height={80} />
            </Stack>
            <Skeleton width={118} height={23} />
          </>
        )}
        {noPlanDataAvailable ? (
          <TSpan font="body-m" colorToken="--text-card-neutral-default">
            No Plans Available
          </TSpan>
        ) : (
          <PlanSelected>
            <PlanInfo>
              <PlanInfoTile>
                <CircleProgressBar
                  percentage={(usedNoumSetupSlots / totalNoumSetupSlots) * 100}
                  color={
                    (usedNoumSetupSlots / totalNoumSetupSlots) * 100 === 0
                      ? 'var(--bg-progressbar-neutral-default)'
                      : 'var(--bg-progressbar-brand-primary-default)'
                  }
                  barSize={3}
                  circleSize={48}
                />
                <Stack vertical gap={8}>
                  <TSpan
                    font="footnote"
                    colorToken="--text-card-neutral-default"
                  >
                    {t('noumena.money.myplans.noumsetup')}
                  </TSpan>
                  <TSpan
                    font="body-m"
                    colorToken="--text-card-header-neutral-highlighted"
                  >
                    {`${usedNoumSetupSlots} / ${totalNoumSetupSlots}`}
                  </TSpan>
                </Stack>
              </PlanInfoTile>
            </PlanInfo>
          </PlanSelected>
        )}
      </Styles.CardWrapper>
    </>
  );
});

export default MyPlans;
