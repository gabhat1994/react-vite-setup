import {
  createContext,
  type FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { loadStripe, type Stripe } from '@stripe/stripe-js';
import { useGetStripeTokenLazyQuery } from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';

interface TStripeContext {
  stripeInstance: Stripe | null;
}

export const StripeContext = createContext<TStripeContext>({
  stripeInstance: null,
});

export const StripeProvider: FC = ({ children }) => {
  const [promise, setPromise] = useState<Stripe | null>(null);
  const [gqlGetStripeToken] = useGetStripeTokenLazyQuery();
  const { user } = useAuth();

  const fetchPromise = useCallback(async () => {
    const config = await gqlGetStripeToken();

    if (config.data?.getConfig?.stripe?.publishableKey) {
      const stripePromise = await loadStripe(
        config.data?.getConfig?.stripe?.publishableKey,
        {
          betas: ['server_side_confirmation_beta_1'],
        },
      );
      setPromise(stripePromise);
    }
  }, [gqlGetStripeToken]);

  useEffect(() => {
    if (user?._id) {
      fetchPromise();
    }
  }, [fetchPromise, user?._id]);

  const instance: TStripeContext = useMemo(
    () => ({
      stripeInstance: promise,
    }),
    [promise],
  );

  return (
    <StripeContext.Provider value={instance}>{children}</StripeContext.Provider>
  );
};
