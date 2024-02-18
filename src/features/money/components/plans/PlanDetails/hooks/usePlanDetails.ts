import {
  useChargebeeAnchorsQuery,
  useGetInvoicesFromSubscriptionIdQuery,
  useGetSubscriptionByIdQuery,
  useGlobalPlanSettingsQuery,
} from '@/apollo/graphql';
import { type Maybe } from '@/common/types';
import { ChargebeeUtils, PlanFilerUtils } from '@/features/money/utils';
import { useError, useLaunchDarkly } from '@/hooks';
import { useCallback, useMemo } from 'react';
import { cleanList } from '@/utils/list';
import { Plan_Category_Enum } from '@/apollo/generated/types';
import { type GlobalSettingObject } from '../../PlanPurchaseModal/types';

const INVOICE_LIMIT = 5;

export const usePlanDetails = (planId: Maybe<string>) => {
  const { flags } = useLaunchDarkly();
  const { logError } = useError();
  const {
    data,
    loading: planLoading,
    refetch,
  } = useGetSubscriptionByIdQuery({
    fetchPolicy: 'cache-and-network',
    skip: !flags.paymentSubscriptions || !planId,
    variables: {
      subscription_id: Number(planId),
    },
    onError: (err) => {
      logError(err, 'GetSubscriptionById');
    },
  });

  const { data: globalSettingsData, loading: globalSettingsLoading } =
    useGlobalPlanSettingsQuery({
      fetchPolicy: 'cache-and-network',
      onError: (error) => {
        logError(error, 'getPaymentSubscriptionSetting', true);
      },
    });

  const { data: invoicesData, loading: invoicesLoading } =
    useGetInvoicesFromSubscriptionIdQuery({
      skip: !flags.paymentSubscriptions || !planId,
      variables: {
        input: {
          subscription_id: Number(planId),
        },
      },
      onError: (err) => {
        logError(err, 'GetInvoices');
      },
    });

  const { data: anchorsData, loading: chargebeeAnchorsLoading } =
    useChargebeeAnchorsQuery({
      variables: {
        forPurchase: true,
      },
      fetchPolicy: 'cache-and-network',
      onError: (error) => {
        logError(error, 'getAllPlanDetails-chargebee-anchor', true);
      },
    });

  const allInvoices = useMemo(
    () => cleanList(invoicesData?.getInvoices),
    [invoicesData?.getInvoices],
  );

  const recentInvoices = allInvoices.slice(0, INVOICE_LIMIT);

  const latestInvoice = allInvoices[0];

  const globalSettings = useMemo(() => {
    const planGlobalSettings = PlanFilerUtils.getGlobalSettings(
      globalSettingsData?.getPaymentSubscriptionSetting,
    );

    if (planGlobalSettings) {
      const setting = JSON.parse(planGlobalSettings.setting_value);
      return setting as GlobalSettingObject;
    }

    return planGlobalSettings;
  }, [globalSettingsData?.getPaymentSubscriptionSetting]);

  const existingPlan = data?.getSubscriptionById;

  const anchors = useMemo(
    () => ChargebeeUtils.getEnabledAndSortedAnchors(anchorsData),
    [anchorsData],
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

  const isFirstPlanInHierarchy = ChargebeeUtils.isFirstPlanInHierarchy(
    existingPlan,
    membershipAnchors[0],
  );

  const isPayAsYouGoPlan = ChargebeeUtils.isPayAsYouGoPlan(existingPlan);

  const isFreePlan = ChargebeeUtils.isFreePlan(existingPlan);

  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const loading =
    (planLoading && !existingPlan) ||
    (globalSettingsLoading && !globalSettings) ||
    (invoicesLoading && !allInvoices.length) ||
    (chargebeeAnchorsLoading && !anchors.length);

  return {
    loading,
    globalSettings,

    planDetails: {
      existingPlan,
      isLastPlanInHierarchy,
      isFirstPlanInHierarchy,
      isPayAsYouGoPlan,
      isFreePlan,
    },

    invoices: {
      allInvoices,
      recentInvoices,
      latestInvoice,
    },

    chargebee: {
      anchors,
    },

    handlers: {
      refresh,
    },
  };
};
