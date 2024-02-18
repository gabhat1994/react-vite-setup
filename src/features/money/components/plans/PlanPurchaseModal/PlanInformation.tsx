import { useState } from 'react';
import { t } from 'i18next';
import { Swiper, SwiperSlide } from 'swiper/react';

import type SwiperCore from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import {
  type IModalBodyProps,
  ModalBody,
  ModalFooter,
} from '@/components/ExtendedModal';
import { useBreakpoints } from '@/hooks';

import { Stack } from '@/layout';
import { Button, Icon, Spinner } from '@/components';
import { type PlanSettingFragment } from '@/apollo/graphql/fragments/planSettingsForComparision.generated';
import { PlanCard } from '../PlanCard/PlanCard';
import {
  Indicator,
  SwiperContainer,
  ComparePlansButton,
  LoadingWrapper,
  SlidWrapper,
  LeftMask,
  RightMask,
  StyledModalBody,
} from './styles';
import { PLAN_DISPLAY_LIMIT } from './constants';
import { getPlanStepperArray } from '../../../utils/plans/stepper';
import { SwiperButton } from './SwiperButton';
import { type GlobalSettingObject, type UserAction } from './types';

type PlanInformationProps = {
  onCompareButtonClick: () => void;
  onPlanPurchase: (itemId: string) => void;
  planSetting: PlanSettingFragment[];
  userAction: UserAction;
  globalSettings?: GlobalSettingObject;
} & Pick<IModalBodyProps, 'loading'>;

export function PlanInformation({
  onCompareButtonClick,
  onPlanPurchase,
  planSetting,
  loading,
  userAction,
  globalSettings,
}: PlanInformationProps) {
  const device = useBreakpoints();
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();
  const [disablePreviousButton, setDisablePreviousButton] = useState(true);
  const [disableNextButton, setDisableNextButton] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const allowSwipeMode =
    planSetting.length > PLAN_DISPLAY_LIMIT && !device.isSmallerThanLaptop;

  const scrollToNextPlan = () => {
    swiperInstance?.slideNext();
    setDisablePreviousButton(false);
  };

  const scrollToPreviousPlan = () => {
    swiperInstance?.slidePrev();
    setDisableNextButton(false);
  };

  const steps = getPlanStepperArray(planSetting.length);
  const isFirstPage = activeIndex === 0;
  const isLastPage = activeIndex === steps.length - 1;
  const showCompareButton = planSetting.length > 1;

  if (loading && planSetting.length === 0)
    return (
      <LoadingWrapper>
        <Spinner />
      </LoadingWrapper>
    );

  return (
    <>
      {allowSwipeMode ? (
        <>
          <ModalBody
            noFooter
            flexDirection="column"
            gap={24}
            align="center"
            style={{ padding: allowSwipeMode ? 0 : undefined }}
          >
            {!isFirstPage && <LeftMask />}
            <SwiperContainer>
              <Swiper
                slidesPerView={3.3}
                onInit={(instance) => setSwiperInstance(instance)}
                onReachBeginning={() => setDisablePreviousButton(true)}
                onReachEnd={() => setDisableNextButton(true)}
                onSlideChangeTransitionStart={(instance) =>
                  setActiveIndex(instance.activeIndex)
                }
              >
                {planSetting.map((setting) => (
                  <SwiperSlide key={setting.item_id}>
                    <SlidWrapper>
                      <PlanCard
                        planSetting={setting}
                        globalSetting={globalSettings}
                        userAction={userAction}
                        itemId={setting.item_id}
                        plan_name={setting.plan_name}
                        description={setting.description}
                        spotlight={setting.spotlight}
                        onPlanPurchaseClick={onPlanPurchase}
                        plansWithFrequencies={setting.plans}
                        modalType="plan-information"
                      />
                    </SlidWrapper>
                  </SwiperSlide>
                ))}
              </Swiper>
            </SwiperContainer>
            {!isLastPage && <RightMask />}
          </ModalBody>
          <ModalFooter gap={14} flexDirection="row" justifyContent="center">
            <SwiperButton
              variant="previous"
              disable={disablePreviousButton}
              onClick={scrollToPreviousPlan}
            />
            <Stack align="center" gap={8}>
              {steps.map((value, index) => (
                <Indicator key={value} isActive={index === activeIndex} />
              ))}
            </Stack>
            <SwiperButton
              variant="next"
              disable={disableNextButton}
              onClick={scrollToNextPlan}
            />
            <ComparePlansButton
              rightIcon={<Icon size={24} name="chevron_small_right_m" />}
              onClick={onCompareButtonClick}
            >
              {t('noumena.plan.purchase.modal.compare.button.text')}
            </ComparePlansButton>
          </ModalFooter>
        </>
      ) : (
        <>
          <StyledModalBody
            noFooter
            flexDirection={device.isSmallerThanLaptop ? 'column' : 'row'}
            gap={16}
            loading={loading}
            shouldJustifyCenter={planSetting.length < 3}
          >
            {planSetting.map((setting) => (
              <PlanCard
                key={setting.item_id}
                planSetting={setting}
                globalSetting={globalSettings}
                userAction={userAction}
                itemId={setting.item_id}
                plan_name={setting.plan_name}
                description={setting.description}
                spotlight={setting.spotlight}
                onPlanPurchaseClick={onPlanPurchase}
                plansWithFrequencies={setting.plans}
                modalType="plan-information"
              />
            ))}
          </StyledModalBody>
          <ModalFooter justifyContent="center">
            {showCompareButton && (
              <Button
                textOnly
                rightIcon={<Icon size={24} name="chevron_small_right_m" />}
                onClick={onCompareButtonClick}
              >
                {t('noumena.plan.purchase.modal.compare.button.text')}
              </Button>
            )}
          </ModalFooter>
        </>
      )}
    </>
  );
}
