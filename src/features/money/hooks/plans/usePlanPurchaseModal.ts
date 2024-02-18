import { useMemo, useState } from 'react';
import {
  type NoumTransactionFragment,
  useGetNoumTransactionFeeDetailsLazyQuery,
  useGlobalPlanSettingsQuery,
  usePlanSettingsQuery,
  useUpgradeAndDowngradeSubscriptionMutation,
} from '@/apollo/graphql';
import { cleanList } from '@/utils/list';
import { useBreakpoints, useError, useToast } from '@/hooks';

import {
  type PlanItemBasicFragment,
  type PlanSettingFragment,
} from '@/apollo/graphql/fragments/planSettingsForComparision.generated';

import {
  PlanPriceUtils,
  PlanFilerUtils,
  ChargebeeUtils,
} from '@/features/money/utils';
import { useChargebeeCheckout } from '@/features/money/hooks';
import {
  type SubscriptionAfterCreatePlanFragment,
  type SubscriptionFragment,
} from '@/apollo/graphql/fragments/subscription.generated';
import { formatDateToMMDDYYYY } from '@/utils/date';
import convertToCurrency from '@/utils/currencyToCurrency';
import {
  AllCurrencyEnum,
  type Maybe,
  Plan_Category_Enum,
  Status_Noum,
} from '@/apollo/generated/types';
import { difference } from 'lodash';
import { type NoumData } from '@/screens/Chamber/components/modals/ProjectCreate/types';
import {
  type UserAction,
  type ModalType,
  type GlobalSettingObject,
} from '../../components/plans/PlanPurchaseModal/types';
import { PLAN_DISPLAY_LIMIT } from '../../components/plans/PlanPurchaseModal/constants';
import {
  getModalSize,
  getModalTitle,
  isModalFullScreen,
} from '../../components/plans/PlanPurchaseModal/helpers';
import { PlanUtil } from '../../components/plans/PlanSummary/MembershipPlan/util';

type UsePlanPurchaseModalProps = {
  onCloseModal?: () => void;
  userAction: UserAction;
  existingPlan?: SubscriptionFragment;
  newNoumData?: NoumData;
  chamberIdForUnarchive?: Maybe<string>;
  onSucessFulPurchase?: (
    subscription: SubscriptionAfterCreatePlanFragment,
  ) => void;
};

export type PlanDifference = {
  priceDifference: string;
  url: string;
  startDate: string;
};

export const usePlanPurchaseModal = ({
  userAction,
  onCloseModal,
  existingPlan,
  newNoumData,
  onSucessFulPurchase,
  chamberIdForUnarchive,
}: UsePlanPurchaseModalProps) => {
  const logger = useError();
  const device = useBreakpoints();
  const { addPrimaryIconToast } = useToast();
  useChargebeeCheckout({ success: onSucessFulPurchase });
  const [modalType, setModalType] = useState<ModalType>('plan-information');
  const [selectedPlan, setSelectedPlan] = useState<PlanSettingFragment>();
  const [planFrequency, setPlanFrequency] = useState<PlanItemBasicFragment>();
  const [noumsToMove, setNoumsToMove] = useState<NoumTransactionFragment[]>([]);
  const [planDifference, setPlanDifference] = useState<PlanDifference>();

  const downgradeNoumLimit =
    selectedPlan?.noumSetting?.limits?.[0]?.settings?.[0].value || 0;

  const { data: planSettingsData, loading: planSettingsLoading } =
    usePlanSettingsQuery({
      variables: {
        forPurchase: true,
      },
      fetchPolicy: 'network-only',
      onError: (error) => {
        logger.logError(error, 'getAllPlansDetails', true);
        onCloseModal?.();
      },
    });

  const { data: globalSettingsData, loading: globalSettingsLoading } =
    useGlobalPlanSettingsQuery({
      fetchPolicy: 'cache-and-network',
      onError: (error) => {
        logger.logError(error, 'getPaymentSubscriptionSetting', true);
        onCloseModal?.();
      },
    });

  const [initiateChangePlan, { loading: fetchingPlanDifference }] =
    useUpgradeAndDowngradeSubscriptionMutation({
      onCompleted: ({ upgradeDowngradeSubscription }) => {
        setPlanDifference({
          priceDifference: convertToCurrency(
            PlanPriceUtils.convertCentsToDollars(
              (
                upgradeDowngradeSubscription.subscriptionEstimate
                  ?.invoice_estimate ||
                upgradeDowngradeSubscription.subscriptionEstimate
                  .next_invoice_estimate
              ).total,
            ),
            AllCurrencyEnum.Usd,
            2,
          ),
          url: upgradeDowngradeSubscription.callbackURL.url,
          startDate: formatDateToMMDDYYYY(
            (
              upgradeDowngradeSubscription.subscriptionEstimate
                ?.invoice_estimate ||
              upgradeDowngradeSubscription.subscriptionEstimate
                .next_invoice_estimate
            ).date * 1000,
          ),
        });

        switch (userAction) {
          case 'downgrade':
            setModalType('plan-downgrade');
            break;
          case 'upgrade':
            setModalType('plan-upgrade');
        }
      },
    });

  const [
    getNoumsLinkedWithExistingPlan,
    { data: noumsData, loading: fetchingNoums },
  ] = useGetNoumTransactionFeeDetailsLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: () => {
      setModalType('noum-selection');
    },
  });

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

  const planSetting = useMemo(() => {
    const planDetails = cleanList(planSettingsData?.getAllPlansDetails);
    const validSettings = PlanFilerUtils.filterAndSortValidPlans(planDetails);

    if (!existingPlan) {
      return validSettings;
    }

    const existingPlanIndex = validSettings.findIndex(
      (setting) =>
        setting.plan_setting_id === existingPlan.settings?.plan_setting_id,
    );

    switch (userAction) {
      case 'try':
        return PlanFilerUtils.filterForTrail(validSettings);
      case 'upgrade':
        // Show plans higher than existing plan
        return validSettings.slice(existingPlanIndex + 1);
      case 'downgrade':
        // Show plans lower than existing plan
        return validSettings.slice(0, existingPlanIndex);
      default:
        throw Error('Invalid user action');
    }
  }, [existingPlan, planSettingsData, userAction]);

  const updateModalContent = () => setModalType('plan-comparison');

  const updatePlanFrequency = (frequency: PlanItemBasicFragment) =>
    setPlanFrequency(frequency);

  const updateSelectedPlan = (itemId: string) => {
    const plan = planSetting.find((setting) => setting.item_id === itemId);
    if (!plan) return;
    const defaultFrequency = plan.plans
      .filter((freq) => freq.status === 'active')
      .sort(PlanPriceUtils.sortFrequencies)[0];
    setSelectedPlan(plan);
    setPlanFrequency(defaultFrequency);
    setModalType('plan-customization');
  };

  const updateNoumListToBeMoved = (noum: NoumTransactionFragment) => {
    const isNoumExists = noumsToMove.find(
      (alreadyAddedNoum) =>
        alreadyAddedNoum?.chamber_id?._id === noum?.chamber_id?._id,
    );
    if (isNoumExists) {
      const filteredNoum = noumsToMove.filter(
        (noumItems) => noumItems?.chamber_id?._id !== noum?.chamber_id?._id,
      );
      setNoumsToMove(filteredNoum);
      return;
    }
    if (noumsToMove.length > downgradeNoumLimit - 1) {
      addPrimaryIconToast(
        `You can select up to ${downgradeNoumLimit} Noums to move`,
      );
      return;
    }
    setNoumsToMove((alreadyAddedNoum) => [...alreadyAddedNoum, noum]);
  };

  const closeModal = () => {
    if (modalType === 'plan-comparison') {
      setModalType('plan-information');
      return;
    }
    onCloseModal?.();
  };

  const purchasePlan = () => {
    const domId = planFrequency?.plan_name_id;
    if (!domId || !existingPlan) return;

    const isExistingPlanISMembershipPlan =
      existingPlan?.plan_category === Plan_Category_Enum.Membership;

    if (userAction === 'downgrade') {
      getNoumsLinkedWithExistingPlan({
        variables: {
          noumDetailInput: {
            subscription_id: existingPlan.subscription_id,
            status: Status_Noum.Active,
          },
        },
      });

      return;
    }

    if (userAction === 'upgrade' && isExistingPlanISMembershipPlan) {
      const redirectURL = ChargebeeUtils.getRedirectionUrl(
        newNoumData,
        planFrequency?.plan_name_id,
        chamberIdForUnarchive,
      );
      initiateChangePlan({
        variables: {
          details: {
            redirectURL,
            subscription_id: existingPlan.subscription_id,
            plan_id: planFrequency?.plan_id!,
          },
        },
      });
      return;
    }
    const anchor = document.getElementById(domId);
    anchor?.click();
  };

  const allowSwipeMode =
    planSetting.length > PLAN_DISPLAY_LIMIT && !device.isSmallerThanLaptop;

  const modalSize = getModalSize(modalType, allowSwipeMode);
  const selectedPlanName = selectedPlan?.plan_name || '';
  const modalTitle = getModalTitle(
    modalType,
    PlanUtil.generatePlanName(selectedPlanName),
  );
  const isFullScreen = isModalFullScreen(modalType, device);

  const noumsWithExistingPlan = useMemo(
    () => cleanList(noumsData?.getNoumTransactionFeeDetails),
    [noumsData],
  );

  const getEstimates = () => {
    if (!existingPlan) return;
    // Filter noums to be archived
    const archivableNoumIds = difference(
      noumsWithExistingPlan,
      noumsToMove,
    ).map((archivableNoum) => archivableNoum?.chamber_id?._id);

    const redirectURL = ChargebeeUtils.getRedirectionUrl(
      newNoumData,
      planFrequency?.plan_name_id,
      chamberIdForUnarchive,
    );

    initiateChangePlan({
      variables: {
        details: {
          subscription_id: existingPlan.subscription_id,
          plan_id: planFrequency?.plan_id!,
          redirectURL,
          archivable_noums:
            userAction === 'downgrade'
              ? cleanList(archivableNoumIds)
              : undefined,
        },
      },
    });
  };

  const loadCheckoutUrl = () => {
    if (!planDifference?.url) return;
    window.location.assign(planDifference.url);
  };

  const updateContentToPlanInformation = () => setModalType('plan-information');

  return {
    modal: {
      modalSize,
      modalTitle,
      isFullScreen,
    },

    loading: {
      planSettingsLoading,
      globalSettingsLoading,
      fetchingNoums,
      fetchingPlanDifference,
    },

    state: {
      modalType,
      selectedPlan,
      noumsToMove,
      planDifference,
      planFrequency,
    },

    data: {
      planSetting,
      globalSettings,
      noumsWithExistingPlan,
      downgradeNoumLimit,
    },

    handlers: {
      updateModalContent,
      updateSelectedPlan,
      updatePlanFrequency,
      purchasePlan,
      closeModal,
      updateNoumListToBeMoved,
      getEstimates,
      loadCheckoutUrl,
      updateContentToPlanInformation,
    },
  };
};
