import { BrowserRouter } from 'react-router-dom';
// import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { cleanup, render, screen } from '@/test-utils';
import { type GetWalletQuery, GetWalletDocument } from '@/apollo/graphql';
import { CurrencyEnum } from '@/apollo/generated/types';
import Wallet from './Wallets';

const setUpWalletdata: GetWalletQuery = {
  getWalletBalance: {
    status: 'customer_not_created',
    total: {
      currency: CurrencyEnum.Usd,
      value: 36169.98,
      __typename: 'CurrencyData',
    },
    balance: {
      currency: CurrencyEnum.Usd,
      value: 34529.42,
      __typename: 'CurrencyData',
    },
    __typename: 'FundingSourceBalanceOutput',
  },
};

const inProcessWalletData: GetWalletQuery = {
  getWalletBalance: {
    status: 'customer_created',
    total: {
      currency: CurrencyEnum.Usd,
      value: 36169.98,
      __typename: 'CurrencyData',
    },
    balance: {
      currency: CurrencyEnum.Usd,
      value: 34529.42,
      __typename: 'CurrencyData',
    },
    __typename: 'FundingSourceBalanceOutput',
  },
};
const verificationWalletData: GetWalletQuery = {
  getWalletBalance: {
    status: 'customer_reverification_needed',
    total: {
      currency: CurrencyEnum.Usd,
      value: 36169.98,
      __typename: 'CurrencyData',
    },
    balance: {
      currency: CurrencyEnum.Usd,
      value: 34529.42,
      __typename: 'CurrencyData',
    },
    __typename: 'FundingSourceBalanceOutput',
  },
};
const activeWalletData: GetWalletQuery = {
  getWalletBalance: {
    status: 'customer_verified',
    total: {
      currency: CurrencyEnum.Usd,
      value: 36169.98,
      __typename: 'CurrencyData',
    },
    balance: {
      currency: CurrencyEnum.Usd,
      value: 34529.42,
      __typename: 'CurrencyData',
    },
    __typename: 'FundingSourceBalanceOutput',
  },
};

const setUpWalletMock: MockedResponse<GetWalletQuery> = {
  request: {
    query: GetWalletDocument,
  },
  result: () => ({ data: setUpWalletdata }),
};

const inProcessWalletMock: MockedResponse<GetWalletQuery> = {
  request: {
    query: GetWalletDocument,
  },
  result: () => ({ data: inProcessWalletData }),
};
const verificationWalletMock: MockedResponse<GetWalletQuery> = {
  request: {
    query: GetWalletDocument,
  },
  result: () => ({ data: verificationWalletData }),
};
const activeWalletMock: MockedResponse<GetWalletQuery> = {
  request: {
    query: GetWalletDocument,
  },
  result: () => ({ data: activeWalletData }),
};

const setUpWalletMockData = (): MockedResponse[] => [setUpWalletMock];
const inProgressWalletMockData = (): MockedResponse[] => [inProcessWalletMock];
const verificationWalletMockData = (): MockedResponse[] => [
  verificationWalletMock,
];
const activeWalletMockData = (): MockedResponse[] => [activeWalletMock];
describe('Wallet', () => {
  afterEach(() => {
    cleanup();
  });
  it('should render Setup Wallet Component', async () => {
    const { container } = render(
      <BrowserRouter>
        <MockedProvider addTypename={false} mocks={setUpWalletMockData()}>
          <Wallet />
        </MockedProvider>
      </BrowserRouter>,
    );
    expect(container).toBeTruthy();
    expect(
      await screen.findByTestId('money-wallet-setup-button'),
    ).toBeInTheDocument();
  });
  it('should render In Progress Wallet Component', async () => {
    const { container } = render(
      <BrowserRouter>
        <MockedProvider addTypename={false} mocks={inProgressWalletMockData()}>
          <Wallet />
        </MockedProvider>
      </BrowserRouter>,
    );
    expect(container).toBeTruthy();
    expect(
      await screen.findByText('Your Wallet application is being processed'),
    ).toBeInTheDocument();
  });
  it('should render Verification  Wallet Component', async () => {
    const { container } = render(
      <BrowserRouter>
        <MockedProvider
          addTypename={false}
          mocks={verificationWalletMockData()}
        >
          <Wallet />
        </MockedProvider>
      </BrowserRouter>,
    );
    expect(container).toBeTruthy();
    expect(
      await screen.findByText(
        'Please contact support@noumena.global for more information.',
      ),
    ).toBeInTheDocument();
  });
  it('should render Active  Wallet Component', async () => {
    const { container } = render(
      <BrowserRouter>
        <MockedProvider addTypename={false} mocks={activeWalletMockData()}>
          <Wallet />
        </MockedProvider>
      </BrowserRouter>,
    );
    expect(container).toBeTruthy();
    expect(await screen.findByTestId('active-wallet-pay')).toBeInTheDocument();
  });
});
