import { useMemo, useState } from 'react';
import { useAuth } from '@/features/auth/contexts';
import {
  useLinkNoumToSubscriptionMutation,
  usePayAsYouGoSetupCountersQuery,
} from '@/apollo/graphql';
import {
  Noum_Fee_Operation_Type,
  Plan_Category_Enum,
  SpaceStatusEnum,
} from '@/apollo/generated/types';
import { cleanList } from '@/utils/list';
import {
  useChangeProjectChamberStatusHelper,
  useCreateProjectChamberHelper,
} from '@/features/noums/hooks/noums';
import { useError } from '@/hooks';
import { type NoumData } from '@/screens/Chamber/components/modals/ProjectCreate/types';
import { type Maybe } from 'graphql/jsutils/Maybe';
import { usePlanSummary } from '../../components/plans/PlanSummary/hooks/usePlanSummary';
import { ChargebeeUtils } from '../../utils';

export type LinkOption = 'existing-pan' | 'pay-as-you-go';

type UseNoumForSubscription = {
  skipQueries?: boolean;
};

export function useNoumLinkToSubscription({
  skipQueries,
}: UseNoumForSubscription) {
  const { user } = useAuth();
  const { logError } = useError();

  const [linkOption, setLinkOption] = useState<LinkOption>();

  const {
    availableSlotsInExistingPlan,
    loading: planSummaryLoading,
    plan: existingPlan,
    chargebee: { anchors },
  } = usePlanSummary({
    skip: skipQueries,
    onCompleted: autoUpdateLinkOption,
  });

  const { data: payAsYouGoSubscriptionsData, loading: payAsYouGoNoumsLoading } =
    usePayAsYouGoSetupCountersQuery({
      skip: skipQueries,
      variables: {
        noumDetailInput: {
          uid: user?._id,
          plan_category: Plan_Category_Enum.Payasgo,
        },
      },
    });

  const { createProjectChamberHelper, loading: creatingNoum } =
    useCreateProjectChamberHelper();

  const { changeProjectChamberStatusHelper, loading: loadingChangeNoumStatus } =
    useChangeProjectChamberStatusHelper();

  const [linkNoumToSubscription, { loading: linkingNoum }] =
    useLinkNoumToSubscriptionMutation({
      onError: (error) => {
        logError(error, 'link-noum-to-subscription', true);
      },
    });

  const payAsYouGoSubscription = useMemo(
    () => cleanList(payAsYouGoSubscriptionsData?.getNoumTransactionFeeDetails),
    [payAsYouGoSubscriptionsData],
  );

  const payAsYouGoSubscriptionWithEmptySlot = useMemo(
    () =>
      payAsYouGoSubscription.find(
        (item) => item.subscription_id?.counters?.noumSetup.current === 0,
      ),
    [payAsYouGoSubscription],
  );

  const membershipAnchors = useMemo(
    () =>
      anchors.filter(
        (anchor) => anchor.category === Plan_Category_Enum.Membership,
      ),
    [anchors],
  );

  const isLastPlanInHierarchy = ChargebeeUtils.isLastPlanInHierarchy(
    existingPlan,
    membershipAnchors[membershipAnchors.length - 1],
  );

  async function createAndLinkNoum({
    noum,
    subscriptionId,
  }: {
    noum: NoumData;
    subscriptionId: number;
  }) {
    const { id } = await createProjectChamberHelper(noum);
    if (!id) return null;
    await linkNoumToSubscription({
      variables: {
        noumInput: {
          chamber_id: id,
          subscription_id: subscriptionId,
          operation_type: Noum_Fee_Operation_Type.Activation,
        },
      },
    });
    return id;
  }

  async function unArchiveAndLinkNoun(
    id?: Maybe<string>,
    subscriptionId?: number,
  ) {
    if (id && subscriptionId) {
      await linkNoumToSubscription({
        variables: {
          noumInput: {
            chamber_id: id,
            subscription_id: subscriptionId,
            operation_type: Noum_Fee_Operation_Type.Activation,
          },
        },
      });
      // TODO : remove below mutation when BE fixes SNS events. This is to sync the status across microservices
      await changeProjectChamberStatusHelper(id, SpaceStatusEnum.Published);
    }
  }

  function updateLinkOption(option?: LinkOption) {
    setLinkOption(option);
  }

  function autoUpdateLinkOption() {
    if (isLastPlanInHierarchy && availableSlotsInExistingPlan === 0) {
      setLinkOption('pay-as-you-go');
      return;
    }
    setLinkOption('existing-pan');
  }

  return {
    data: {
      existingPlan,
      isLastPlanInHierarchy,
      availableSlotsInExistingPlan,
      payAsYouGoSubscriptionWithEmptySlot,
    },

    state: {
      linkOption,
    },

    chargebee: {
      anchors,
    },

    loading: {
      linkingNoum,
      creatingNoum,
      planSummaryLoading,
      payAsYouGoNoumsLoading,
      loadingChangeNoumStatus,
    },

    handlers: {
      updateLinkOption,
    },

    actions: {
      createAndLinkNoum,
      unArchiveAndLinkNoun,
    },
  };
}
