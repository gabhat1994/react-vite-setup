import { type FC } from 'react';
// import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import PaymentDataProvider from '@/features/TransactionModal/contexts/PaymentDataProvider';
import { render } from '@/test-utils';
import {
  PaymentStateContext,
  initPaymentStateContextValue,
} from '@/features/TransactionModal/contexts';
import PaymentSelect from './index';

describe('Transaction Select Componnet', () => {
  it('should render the component', () => {
    const handleClose = vi.fn();
    const Wrapper: FC = () => (
      <MockedProvider>
        <PaymentDataProvider handleClose={handleClose}>
          <PaymentStateContext.Provider value={initPaymentStateContextValue}>
            <PaymentSelect />
          </PaymentStateContext.Provider>
        </PaymentDataProvider>
      </MockedProvider>
    );
    const { container } = render(<Wrapper />);
    expect(container).toBeTruthy();
  });
});
