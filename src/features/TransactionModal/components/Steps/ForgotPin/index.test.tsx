import { render } from '@testing-library/react';
// import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import {
  PaymentStateContext,
  initPaymentStateContextValue,
} from '@/features/TransactionModal/contexts';
import ForotPin from './index';

describe('Forgot pin flow', () => {
  it('should render the component', () => {
    const { container } = render(
      <MockedProvider>
        {/* <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}> */}
        <PaymentStateContext.Provider value={initPaymentStateContextValue}>
          <ForotPin />
        </PaymentStateContext.Provider>
      </MockedProvider>,
    );
    expect(container).toBeTruthy();
  });
});
