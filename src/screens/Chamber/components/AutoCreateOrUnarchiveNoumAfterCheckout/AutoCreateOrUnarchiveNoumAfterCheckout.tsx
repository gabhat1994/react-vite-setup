import {
  Noum_Fee_Operation_Type,
  Plan_Category_Enum,
  SpaceStatusEnum,
} from '@/apollo/generated/types';
import {
  useLinkNoumToSubscriptionMutation,
  usePlanIdQuery,
} from '@/apollo/graphql';
import { Spinner } from '@/components';
import { useError, useLaunchDarkly } from '@/hooks';
import { cleanList } from '@/utils/list';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { generatePath, useNavigate, useSearchParams } from 'react-router-dom';
import {
  useChangeProjectChamberStatusHelper,
  useCreateProjectChamberHelper,
} from '@/features/noums/hooks/noums';
import { ROUTES } from '@/constants/routes';
import { type NoumData } from '../modals/ProjectCreate/types';

export function AutoCreateOrUnarchiveNoumAfterCheckout() {
  const { flags } = useLaunchDarkly();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { logError } = useError();
  const isNoumCreated = useRef(false);

  const noumDataFromParams = searchParams.get('newNoumData');

  const planNameIdFromParams = searchParams.get('planNameId') || '';

  const chamberIdForUnarchive = searchParams.get('chamberIdForUnarchive');

  const parsedNoumData = noumDataFromParams
    ? (JSON.parse(noumDataFromParams) as NoumData)
    : undefined;

  const { createProjectChamberHelper } = useCreateProjectChamberHelper();

  const { changeProjectChamberStatusHelper } =
    useChangeProjectChamberStatusHelper();

  const [linkNoumToSubscription] = useLinkNoumToSubscriptionMutation({
    onError: (error) => {
      logError(error, 'link-noum-to-subscription', true);
    },
  });

  const { data, startPolling, stopPolling } = usePlanIdQuery({
    fetchPolicy: 'cache-and-network',
    skip:
      !flags.paymentSubscriptions ||
      (!parsedNoumData && !chamberIdForUnarchive),
    onError: (error) => {
      logError(error, 'usePlanId', true);
      navigate(ROUTES.HOME);
    },
  });

  const existingPlan = useMemo(
    () =>
      cleanList(data?.getAvailableSubscriptions).find(
        (plan) => plan.plan_category !== Plan_Category_Enum.Payasgo,
      ),
    [data?.getAvailableSubscriptions],
  );

  const unArchiveAndLinkNoum = useCallback(async () => {
    if (!chamberIdForUnarchive) return;
    const { data: linkData } = await linkNoumToSubscription({
      variables: {
        noumInput: {
          chamber_id: chamberIdForUnarchive,
          subscription_id: existingPlan?.subscription_id,
          operation_type: Noum_Fee_Operation_Type.Activation,
        },
      },
    });

    // TODO : remove below mutation when BE fixes SNS events. This is to sync the status across microservices
    await changeProjectChamberStatusHelper(
      chamberIdForUnarchive,
      SpaceStatusEnum.Published,
    );
    if (linkData) {
      navigate(generatePath(ROUTES.NOUM, { id: chamberIdForUnarchive }));
    }
  }, [
    chamberIdForUnarchive,
    changeProjectChamberStatusHelper,
    existingPlan?.subscription_id,
    linkNoumToSubscription,
    navigate,
  ]);

  const createAndLinkNoum = useCallback(async () => {
    if (!planNameIdFromParams || !parsedNoumData) return;

    const { id } = await createProjectChamberHelper(parsedNoumData);
    if (!id) return;
    const { data: linkData } = await linkNoumToSubscription({
      variables: {
        noumInput: {
          chamber_id: id,
          subscription_id: existingPlan?.subscription_id,
          operation_type: Noum_Fee_Operation_Type.Activation,
        },
      },
    });

    if (linkData) {
      const redirectUrl = generatePath(ROUTES.EDIT_NOUM, { id: String(id) });
      navigate(redirectUrl);
    }
  }, [
    createProjectChamberHelper,
    existingPlan?.subscription_id,
    linkNoumToSubscription,
    navigate,
    parsedNoumData,
    planNameIdFromParams,
  ]);

  const handlePolling = useCallback(() => {
    if (
      (!parsedNoumData && !chamberIdForUnarchive) ||
      !planNameIdFromParams ||
      !flags.paymentSubscriptions
    ) {
      navigate(ROUTES.MY_PLAN);
      return;
    }
    // Compare the current plan id with params plan name id.
    // If it's equal, that means BE is in sync with chargebee
    if (
      existingPlan?.item_price_id === planNameIdFromParams &&
      !isNoumCreated.current
    ) {
      stopPolling();

      const linkFunction = chamberIdForUnarchive
        ? unArchiveAndLinkNoum
        : createAndLinkNoum;
      linkFunction();
      isNoumCreated.current = true;
      return;
    }

    startPolling(2000);
  }, [
    createAndLinkNoum,
    existingPlan?.item_price_id,
    flags.paymentSubscriptions,
    navigate,
    parsedNoumData,
    planNameIdFromParams,
    startPolling,
    stopPolling,
    unArchiveAndLinkNoum,
    chamberIdForUnarchive,
  ]);

  useEffect(() => {
    // Query BE to get updated plan after every 2 seconds
    // Webhook may trigger after sometime, we need to restrict noum to link to the previous plan
    handlePolling();
    return () => {
      stopPolling();
    };
  }, [handlePolling, stopPolling]);

  return <Spinner />;
}
