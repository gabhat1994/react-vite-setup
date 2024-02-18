import { createContext, type FC, useMemo } from 'react';
import { useAuth } from '@/features/auth/contexts';
import { useError } from '@/hooks/useError';
import { useLaunchDarkly } from '@/hooks/launchDarkly';
import { useGetUserCustomerDetailsQuery } from '@/apollo/graphql';
import { type Customer } from '@/apollo/generated/types';

interface ChargeBeeContextType {
  customerDetails: Customer | null;
}

export const ChargeBeeContext = createContext<ChargeBeeContextType>({
  customerDetails: null,
});

export const ChargeBeeCustomerProvider: FC = ({ children }) => {
  const { flags } = useLaunchDarkly();
  const { user } = useAuth();
  const { logError } = useError();

  const isAuthenticated = useMemo(() => !!user?._id, [user?._id]);

  const { data } = useGetUserCustomerDetailsQuery({
    onError: (err) => {
      logError(err, 'gqlGetUserCustomer');
    },
    skip: !flags.paymentSubscriptions || !isAuthenticated,
  });

  const value: ChargeBeeContextType = useMemo(
    () => ({
      customerDetails: data?.getUserCustomerDetails ?? null,
    }),
    [data?.getUserCustomerDetails],
  );

  return (
    <ChargeBeeContext.Provider value={value}>
      {children}
    </ChargeBeeContext.Provider>
  );
};
