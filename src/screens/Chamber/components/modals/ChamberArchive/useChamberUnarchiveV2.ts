import { useState } from 'react';
import { Plan_Category_Enum } from '@/apollo/generated/types';
import {
  useChargebeeCheckout,
  useNoumLinkToSubscription,
} from '@/features/money/hooks';
import { type Maybe } from 'graphql/jsutils/Maybe';

type UseChamberUnarchiveV2 = {
  spaceId?: Maybe<string>;
  onSuccess?: () => void;
};

type ModalType = 'link-noum' | 'plan-purchase';

export function useChamberUnarchiveV2({
  spaceId,
  onSuccess,
}: UseChamberUnarchiveV2) {
  const [modalType, setModalType] = useState<ModalType>('link-noum');

  useChargebeeCheckout({});

  const { data, state, actions, chargebee, loading, handlers } =
    useNoumLinkToSubscription({});

  const {
    existingPlan,
    isLastPlanInHierarchy,
    availableSlotsInExistingPlan,
    payAsYouGoSubscriptionWithEmptySlot,
  } = data;

  const { anchors } = chargebee;
  const { linkOption } = state;
  const { unArchiveAndLinkNoun } = actions;
  const { updateLinkOption } = handlers;

  // async function purchasePlanAndUnarchiveNoum(
  //   subscription: SubscriptionAfterCreatePlanFragment,
  // ) {
  //   await unArchiveAndLinkNoun(spaceId, subscription.subscription_id);
  //   onSuccess?.();
  // }

  async function handleActionButtonClick() {
    if (!linkOption) return;
    if (linkOption === 'existing-pan' && existingPlan) {
      if (availableSlotsInExistingPlan === 0 && !isLastPlanInHierarchy) {
        setModalType('plan-purchase');
        return;
      }

      await unArchiveAndLinkNoun(spaceId, existingPlan.subscription_id);
      onSuccess?.();
      return;
    }

    // Check if exiting pay as you go subscriptions are having available slot
    // If available then  unarchive noum and add to existing slot
    if (payAsYouGoSubscriptionWithEmptySlot) {
      await unArchiveAndLinkNoun(
        spaceId,
        payAsYouGoSubscriptionWithEmptySlot?.subscription_id?.subscription_id,
      );
      // TODO: handle sucess
      return;
    }

    // Open chargebee checkout modal for pay as you go
    const setting = anchors.find(
      ({ category }) => category === Plan_Category_Enum.Payasgo,
    );
    const settingId = setting?.plans?.[0]?.plan_name_id;
    if (settingId) {
      const payAsYouGoAnchor = document.getElementById(settingId);
      payAsYouGoAnchor?.click();
    }
  }

  return {
    modalType,
    loading,

    state: {
      linkOption,
    },

    data: {
      anchors,
      existingPlan,
      isLastPlanInHierarchy,
      availableSlotsInExistingPlan,
    },

    handlers: {
      handleActionButtonClick,
      updateLinkOption,
    },
  };
}
