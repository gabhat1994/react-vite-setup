import { useContext, useEffect, useMemo } from 'react';
import { t } from 'i18next';
import { useCreateChargebeeSubscriptionMutation } from '@/apollo/graphql';
import { ChargeBeeContext } from '@/providers';
import { useError, useToast } from '@/hooks';
import { type SubscriptionAfterCreatePlanFragment } from '@/apollo/graphql/fragments/subscription.generated';

interface UseChargebeeCheckoutProps {
  success?: (subscriptionObject: SubscriptionAfterCreatePlanFragment) => void;
  error?: () => void;
  loaded?: () => void;
  close?: () => void;
  step?: (step: string) => void;
}

export const useChargebeeCheckout = (
  checkoutCallbacks?: UseChargebeeCheckoutProps,
) => {
  const { success, ...restCallbacks } = checkoutCallbacks || {};
  const { customerDetails } = useContext(ChargeBeeContext);
  const { logError } = useError();
  const { addSuccessIconToast } = useToast();
  const user = useMemo(
    () => ({
      first_name: customerDetails?.first_name || '',
      last_name: customerDetails?.last_name || '',
      email: customerDetails?.email || '',
    }),
    [customerDetails],
  );

  const [createSubscription, { loading }] =
    useCreateChargebeeSubscriptionMutation({
      onCompleted: (data) => {
        success?.(data.createSubscriptionAndInvoiceFromHostedPages);
        addSuccessIconToast(
          t('noumena.money.subscription.subscription.successful'),
        );
        const cbInstance = window.Chargebee.getInstance();
        cbInstance?.closeAll();
      },
      onError: (error) => {
        logError(error, 'createSubscriptionAndInvoiceFromHostedPages');
      },
    });

  useEffect(() => {
    window.Chargebee.registerAgain();
    const cbInstance = window.Chargebee.getInstance();
    if (cbInstance) {
      const cart = cbInstance.getCart();
      cart?.setCustomer(user);
      cbInstance?.setCheckoutCallbacks(() => ({
        success: (hostedPageId: string) => {
          createSubscription({ variables: { hosted_id: hostedPageId } });
        },
        ...restCallbacks,
      }));
    }
    return () => {
      if (cbInstance) {
        cbInstance.cart?.setCustomer(undefined);
        cbInstance?.setCheckoutCallbacks(() => ({}));
      }
    };
  }, [checkoutCallbacks, user, createSubscription, restCallbacks]);

  return { loading };
};
