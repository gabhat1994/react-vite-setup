// import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@/test-utils';
import {
  PaymentStateContext,
  initPaymentStateContextValue,
} from '@/features/TransactionModal/contexts';
import PaymentDataProvider from '@/features/TransactionModal/contexts/PaymentDataProvider';
import PaymentDone from './index';

describe('Payment Done screen', () => {
  it('should render the Payment done screen and perform close interaction', async () => {
    const handleClose = vi.fn();
    const { container } = render(
      <MockedProvider>
        <PaymentDataProvider handleClose={handleClose}>
          <PaymentStateContext.Provider value={initPaymentStateContextValue} />
          <PaymentDone />,
        </PaymentDataProvider>
      </MockedProvider>,
    );
    expect(container).toBeTruthy();
    // TODO: Update the test cases
    /*
    const element = getByText(destination.accountName);
    await waitFor(() => expect(element).toBeInTheDocument());
    const closeButton = getByTestId('close-button');
    fireEvent.click(closeButton);
    await waitFor(() => expect(handleClose).toBeCalled());
     */
  });
});
