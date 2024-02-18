import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render, waitFor } from '@/test-utils';
import * as Types from '@/apollo/generated/types';
import UnselectedAccount from './UnselectedAccount';
import { type TAccount } from '../../types';

describe('Selected Account Card', () => {
  it('should render the component', async () => {
    const account: TAccount = {
      id: '0',
      walletName: 'Main Wallet',
      accountType: Types.AccountType.Wallet,
      primary: true,
    };
    const { container, getByText } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <UnselectedAccount account={account} />,
      </ApolloProvider>,
    );
    expect(container).toBeTruthy();
    const accountNameElement = getByText(account.walletName!);
    await waitFor(() => expect(accountNameElement).toBeInTheDocument());
  });
});
