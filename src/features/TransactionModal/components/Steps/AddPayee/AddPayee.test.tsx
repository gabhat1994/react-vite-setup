// import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@/test-utils';
import PaymentDataProvider from '@/features/TransactionModal/contexts/PaymentDataProvider';
import {
  PaymentStateContext,
  initPaymentStateContextValue,
} from '@/features/TransactionModal/contexts';
import AddPayee from '.';

describe('Add Payee screen', () => {
  it('should render Add payee screen', () => {
    const handleClose = vi.fn();
    const { container } = render(
      <MockedProvider>
        {/* <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}> */}
        <PaymentDataProvider handleClose={handleClose}>
          <PaymentStateContext.Provider value={initPaymentStateContextValue}>
            <AddPayee />
          </PaymentStateContext.Provider>
        </PaymentDataProvider>
      </MockedProvider>,
    );
    expect(container).toBeTruthy();
  });
});
