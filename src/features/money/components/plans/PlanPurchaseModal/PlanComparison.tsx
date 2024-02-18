import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Controller } from 'swiper';
import 'swiper/components/controller';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { ModalBody } from '@/components/ExtendedModal';
import { useEffect, useState } from 'react';
import { Spacer, Stack } from '@/layout';
import { type PlanSettingFragment } from '@/apollo/graphql/fragments/planSettingsForComparision.generated';
import {
  MainTable,
  CommonFeatures,
  PlanLevelFeatures,
  SlidWrapper,
  SwiperContainer,
  Indicator,
  PreviousButtonWrapper,
  NextButtonWrapper,
} from './styles';
import { FeatureGroup } from './FeatureGroup';
import { PropertyGroup } from './PropertyGroup';
import { PlanCard } from '../PlanCard/PlanCard';
import { getPlanStepperArray } from '../../../utils/plans/stepper';
import { SwiperButton } from './SwiperButton';
import { type UserAction } from './types';

SwiperCore.use([Controller]);

type PlanComparisonProps = {
  onPlanPurchase: (itemId: string) => void;
  planSetting: PlanSettingFragment[];
  userAction: UserAction;
};

export function PlanComparison({
  planSetting,
  onPlanPurchase,
  userAction,
}: PlanComparisonProps) {
  const [featureSwiper, setFeatureSwiper] = useState<SwiperCore>();
  const [planSwiper, setPlanSwiper] = useState<SwiperCore>();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (planSwiper?.controller && featureSwiper?.controller) {
      planSwiper.controller.control = featureSwiper;
      featureSwiper.controller.control = planSwiper;
    }
  }, [planSwiper, featureSwiper]);

  const featureList = planSetting[0];
  const { menuItems, financialProducts, learningProducts, noumSetting } =
    featureList || {};

  const { limits, tools } = noumSetting || {};

  const scrollToNextPlan = () => {
    planSwiper?.slideNext();
  };

  const scrollToPreviousPlan = () => {
    planSwiper?.slidePrev();
  };

  const steps = getPlanStepperArray(planSetting.length);

  return (
    <ModalBody align="center" isFullScreen>
      <MainTable>
        <CommonFeatures>
          {menuItems && <FeatureGroup menuName="Access to" items={menuItems} />}
          {limits && <FeatureGroup menuName="Noums" items={limits} />}
          {tools && <FeatureGroup menuName="Tools" items={tools} />}
          {financialProducts && (
            <FeatureGroup
              menuName="Financial Products"
              items={financialProducts}
            />
          )}
          {learningProducts && (
            <FeatureGroup
              menuName="Financial Products"
              items={learningProducts}
            />
          )}
        </CommonFeatures>
        <PlanLevelFeatures>
          <PreviousButtonWrapper>
            <SwiperButton
              variant="previous"
              onClick={scrollToPreviousPlan}
              disable={false}
            />
          </PreviousButtonWrapper>
          <NextButtonWrapper>
            <SwiperButton
              variant="next"
              onClick={scrollToNextPlan}
              disable={false}
            />
          </NextButtonWrapper>
          <Stack fullWidth vertical align="center">
            <SwiperContainer>
              <Swiper
                slidesPerView={3}
                onInit={(instance) => setPlanSwiper(instance)}
                controller={{ control: featureSwiper }}
                onSlideChangeTransitionEnd={(instance) =>
                  setActiveIndex(instance.activeIndex)
                }
              >
                {planSetting.map((setting) => (
                  <SwiperSlide key={setting.item_id}>
                    <SlidWrapper>
                      <PlanCard
                        userAction={userAction}
                        itemId={setting.item_id}
                        plan_name={setting.plan_name}
                        description={setting.description}
                        spotlight={setting.spotlight}
                        modalType="plan-comparison"
                        plansWithFrequencies={setting.plans}
                        onPlanPurchaseClick={onPlanPurchase}
                      />
                    </SlidWrapper>
                  </SwiperSlide>
                ))}
              </Swiper>
            </SwiperContainer>
            <Spacer height={24} />
            <Stack align="center" gap={8}>
              {steps.map((value, index) => (
                <Indicator key={value} isActive={index === activeIndex} />
              ))}
            </Stack>
            <Spacer height={24} />
          </Stack>
          <SwiperContainer>
            <Swiper
              slidesPerView={3}
              onInit={(instance) => setFeatureSwiper(instance)}
              controller={{ control: planSwiper }}
            >
              {planSetting?.map((setting) => {
                const {
                  menuItems: planLevelMenuItems,
                  financialProducts: planLevelFinancialProducts,
                  learningProducts: planLevelLeaningProducts,
                  noumSetting: {
                    limits: planLevelLimits,
                    tools: planLevelTools,
                  },
                } = setting;

                return (
                  <SwiperSlide key={setting.item_id}>
                    <SlidWrapper>
                      {planLevelMenuItems && (
                        <PropertyGroup items={planLevelMenuItems} />
                      )}
                      {planLevelLimits && (
                        <PropertyGroup items={planLevelLimits} />
                      )}
                      {planLevelTools && (
                        <PropertyGroup items={planLevelTools} />
                      )}
                      {planLevelFinancialProducts && (
                        <PropertyGroup items={planLevelFinancialProducts} />
                      )}
                      {planLevelLeaningProducts && (
                        <PropertyGroup items={planLevelLeaningProducts} />
                      )}
                    </SlidWrapper>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </SwiperContainer>
        </PlanLevelFeatures>
      </MainTable>
    </ModalBody>
  );
}
