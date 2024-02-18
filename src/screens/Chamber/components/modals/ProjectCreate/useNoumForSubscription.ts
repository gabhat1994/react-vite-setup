import { useState } from 'react';
import {
  useChargebeeCheckout,
  useNoumLinkToSubscription,
} from '@/features/money/hooks';
import { Plan_Category_Enum } from '@/apollo/generated/types';
import { type SubscriptionAfterCreatePlanFragment } from '@/apollo/graphql/fragments/subscription.generated';
import { type NoumData } from './types';

type UseNoumForSubscription = {
  onSuccess?: (id: string) => void;
};

type ModalType =
  | 'create-noum-form'
  | 'link-noum-to-subscription'
  | 'plan-purchase';

export function useNoumForSubscription({ onSuccess }: UseNoumForSubscription) {
  const [modalType, setModalType] = useState<ModalType>('create-noum-form');
  const [noumData, setNoumData] = useState<NoumData>();

  const { data, loading, chargebee, handlers, state, actions } =
    useNoumLinkToSubscription({
      skipQueries: modalType === 'create-noum-form',
    });

  const {
    existingPlan,
    isLastPlanInHierarchy,
    availableSlotsInExistingPlan,
    payAsYouGoSubscriptionWithEmptySlot,
  } = data;

  const {
    planSummaryLoading,
    payAsYouGoNoumsLoading,
    linkingNoum,
    creatingNoum,
  } = loading;

  const { linkOption } = state;
  const { anchors } = chargebee;
  const { createAndLinkNoum } = actions;
  const { updateLinkOption } = handlers;

  const updateNoumData = (projectData: NoumData) => setNoumData(projectData);

  const setContentToCreateForm = () => setModalType('create-noum-form');

  const setContentToPlanPurchase = () => setModalType('plan-purchase');

  const setContentToLinkOption = () =>
    setModalType('link-noum-to-subscription');

  useChargebeeCheckout({
    success: purchasePlanAndCreateLinkNoum,
  });

  async function purchasePlanAndCreateLinkNoum(
    subscription: SubscriptionAfterCreatePlanFragment,
  ) {
    if (!noumData) return;
    const id = await createAndLinkNoum({
      noum: noumData,
      subscriptionId: subscription.subscription_id,
    });
    onSuccess?.(id || '');
  }

  const handleActionButtonClick = async () => {
    if (!noumData || !linkOption) return;

    if (linkOption === 'existing-pan' && existingPlan) {
      if (availableSlotsInExistingPlan === 0 && !isLastPlanInHierarchy) {
        setContentToPlanPurchase();
        return;
      }
      const id = await createAndLinkNoum({
        noum: noumData,
        subscriptionId: existingPlan.subscription_id,
      });
      onSuccess?.(id || '');
      return;
    }

    if (linkOption === 'pay-as-you-go') {
      // Check if exiting pay as you go subscriptions are having available slot
      // If available then  create new noum and add to existing slot
      if (payAsYouGoSubscriptionWithEmptySlot) {
        const id = await createAndLinkNoum({
          noum: noumData,
          subscriptionId:
            payAsYouGoSubscriptionWithEmptySlot.subscription_id
              ?.subscription_id || 0,
        });
        onSuccess?.(id || '');
        return;
      }

      const setting = anchors.find(
        ({ category }) => category === Plan_Category_Enum.Payasgo,
      );
      const settingId = setting?.plans?.[0]?.plan_name_id;
      if (settingId) {
        const payAsYouGoAnchor = document.getElementById(settingId);
        payAsYouGoAnchor?.click();
      }
    }
  };

  return {
    modalType,
    linkOption,

    data: {
      anchors,
      existingPlan,
      availableSlotsInExistingPlan,
      payAsYouGoSubscriptionWithEmptySlot,
      noumData,
      isLastPlanInHierarchy,
    },

    loading: {
      payAsYouGoNoumsLoading,
      creatingNoum,
      linkingNoum,
      planSummaryLoading,
    },

    handlers: {
      updateLinkOption,
      updateNoumData,
      handleActionButtonClick,
      setContentToCreateForm,
      setContentToPlanPurchase,
      setContentToLinkOption,
      purchasePlanAndCreateLinkNoum,
    },
  };
}
