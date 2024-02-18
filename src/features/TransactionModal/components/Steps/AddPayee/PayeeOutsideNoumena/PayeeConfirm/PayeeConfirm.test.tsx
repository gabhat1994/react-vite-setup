// import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@/test-utils';
import PayeeConfirm from '.';
import { type PayeeFormvalues } from '../types';

describe('Payment Confirm Screen', () => {
  it('Should render the Payment confirm screen', () => {
    const payee: PayeeFormvalues = {
      name: 'Name',
      routingNumber: '12121212',
      accountNumber: '1212121212',
    };
    const handleNext = vi.fn();

    const { container, getByText } = render(
      <MockedProvider>
        {/* <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}> */}
        <PayeeConfirm payee={payee} handleNext={handleNext} />
      </MockedProvider>,
    );
    expect(container).toBeTruthy();
    const name = getByText(payee.name);
    expect(name).toBeInTheDocument();
  });
});
