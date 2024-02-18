// import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@/test-utils';
import PaymentDataProvider from '@/features/TransactionModal/contexts/PaymentDataProvider';
import {
  PaymentStateContext,
  initPaymentStateContextValue,
} from '@/features/TransactionModal/contexts';
import PaymentDescription from './index';

describe('Transaction Description', () => {
  it('Should render the component', () => {
    const handleClose = vi.fn();
    const { container } = render(
      <MockedProvider>
        {/* <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}> */}
        <PaymentDataProvider handleClose={handleClose}>
          <PaymentStateContext.Provider value={initPaymentStateContextValue}>
            <PaymentDescription />
          </PaymentStateContext.Provider>
        </PaymentDataProvider>
      </MockedProvider>,
    );
    expect(container).toBeTruthy();
  });
});
