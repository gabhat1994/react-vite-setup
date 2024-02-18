import { Plan_Category_Enum } from '@/apollo/generated/types';
import {
  useChargebeeAnchorsQuery,
  useGetAvailableSubscriptionsQuery,
} from '@/apollo/graphql';
import { ChargebeeUtils } from '@/features/money/utils';
import { useError, useLaunchDarkly } from '@/hooks';
import { cleanList } from '@/utils/list';
import { useCallback, useMemo } from 'react';

type UsePlanSummary = {
  skip?: boolean;
  onCompleted?: () => void;
};

export const usePlanSummary = ({ skip, onCompleted }: UsePlanSummary) => {
  const { flags } = useLaunchDarkly();

  const { logError } = useError();

  const {
    data,
    loading: subscriptionLoading,
    refetch,
  } = useGetAvailableSubscriptionsQuery({
    fetchPolicy: 'cache-and-network',
    skip: !flags.paymentSubscriptions || !!skip,
    variables: {},
    onError: (err) => {
      logError(err, 'GetAvailableSubscriptions');
    },
  });

  const { data: anchorsData, loading: chargebeeAnchorsLoading } =
    useChargebeeAnchorsQuery({
      variables: {
        forPurchase: true,
      },
      skip: !flags.paymentSubscriptions || !!skip,
      fetchPolicy: 'cache-and-network',
      onCompleted,
      onError: (error) => {
        logError(error, 'getAllPlanDetails-chargebee-anchor', true);
      },
    });

  const plans = useMemo(
    () => cleanList(data?.getAvailableSubscriptions),
    [data?.getAvailableSubscriptions],
  );

  const plan = plans?.find(
    (obj) => obj.plan_category !== Plan_Category_Enum.Payasgo,
  );

  const noPlanDataAvailable = data?.getAvailableSubscriptions.length === 0;

  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const usedNoumSetupSlots = (plans || []).reduce(
    (acc, obj) =>
      acc +
      (obj?.counters?.noumSetup.current ? obj.counters.noumSetup.current : 0),
    0,
  );
  const totalNoumSetupSlots = (plans || []).reduce(
    (acc, obj) =>
      acc + (obj?.counters?.noumSetup.limit ? obj.counters.noumSetup.limit : 0),
    0,
  );

  const availableSlotsInExistingPlan = totalNoumSetupSlots - usedNoumSetupSlots;

  const anchors = useMemo(
    () => ChargebeeUtils.getEnabledAndSortedAnchors(anchorsData),
    [anchorsData],
  );

  const isLastPlanInHierarchy = ChargebeeUtils.isLastPlanInHierarchy(
    plan,
    anchors[anchors.length],
  );

  return {
    loading: subscriptionLoading || chargebeeAnchorsLoading,
    refresh,
    usedNoumSetupSlots,
    totalNoumSetupSlots,
    noPlanDataAvailable,
    availableSlotsInExistingPlan,
    plan,
    isLastPlanInHierarchy,

    chargebee: {
      anchors,
    },
  };
};
