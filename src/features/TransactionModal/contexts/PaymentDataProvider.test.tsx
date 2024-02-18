import { type MockedResponse, MockedProvider } from '@apollo/client/testing';
import { render } from '@/test-utils';
import { AccountType } from '@/apollo/generated/types';
import {
  type GetPaymentProviderDataQuery,
  GetPaymentProviderDataDocument,
} from '@/apollo/graphql';
import PaymentSelect from '@/features/TransactionModal/components/Steps/PaymentSelect';
import PaymentDataProvider from './PaymentDataProvider';

const getAccountList: GetPaymentProviderDataQuery['getAccountList'] = [
  {
    id: 'f01a232c-f8e7-432e-8bc4-1a4b373aa9c6',
    chamberId: null,
    accountName: 'Plaid Checking',
    maskAccountNumber: '0000',
    accountType: AccountType.Bank,
    walletName: null,
    masterWalletId: null,
    customerName: 'Amit Kumar',
    balance: null,
    createdAt: '1663678375258',
    __typename: 'AccountListOutput',
    primary: true,
  },
  {
    id: 'abcc777a-910e-4261-8c1b-5b4c09c42ff9',
    chamberId: null,
    accountName: null,
    maskAccountNumber: null,
    accountType: AccountType.Wallet,
    walletName: 'Main Wallet',
    masterWalletId: null,
    customerName: 'Amit Kumar',
    balance: 10081.22,
    createdAt: '1657030006672',
    __typename: 'AccountListOutput',
    primary: false,
  },
];

const getCustomerPayeeList: GetPaymentProviderDataQuery['getCustomerPayeeList'] =
  [
    {
      id: '80d089b7-21a9-4324-b478-a6ccb667b275',
      customerName: 'Yogender Kumar',
      maskAccountNumber: null,
      accountType: AccountType.Wallet,
      walletName: 'Master Wallet',
      accountId: '6ecf4d7c-43ac-4f9c-bb97-78f54f790d07',
      chamberId: null,
      userId: {
        _id: '70d089b7-21a9-4324-b478-a6ccb6672271',
        profile: {
          _id: '70d089b7-21a9-4324-b478-a6ccb6672271',
          profilePicture:
            'https://noumena-img.s3-accelerate.amazonaws.com/619f5f21433523318c243250/profile/k7liiw-htVE-Ydhz85_wV',
          __typename: 'ProfileOutput',
        },
        __typename: 'UserOutput',
      },
      __typename: 'CustomerPayeeList',
    },
    {
      id: 'b1d87abd-a37c-4a18-a36b-3a311290fe33',
      customerName: 'Yogender Kumar',
      maskAccountNumber: null,
      accountType: AccountType.Wallet,
      walletName: 'Test 5 Wallet',
      accountId: 'd406614e-f7f6-400f-9a47-c636928df3fc',
      chamberId: '628f7a39e748a9622a3d3869',
      userId: {
        _id: '70d089b7-21a9-4324-b478-a6ccb6672271',
        profile: {
          _id: '70d089b7-21a9-4324-b478-a6ccb6672271',
          profilePicture:
            'https://noumena-img.s3-accelerate.amazonaws.com/619f5f21433523318c243250/profile/k7liiw-htVE-Ydhz85_wV',
          __typename: 'ProfileOutput',
        },
        __typename: 'UserOutput',
      },
      __typename: 'CustomerPayeeList',
    },
  ];

const paymentProviderMock: MockedResponse<GetPaymentProviderDataQuery> = {
  request: {
    query: GetPaymentProviderDataDocument,
  },
  result: () => ({ data: { getAccountList, getCustomerPayeeList } }),
  delay: 2,
};

const mock = (): MockedResponse[] => [paymentProviderMock];

it('should Render the Payment Data Provider', async () => {
  const handleClose = vi.fn();
  const { container } = render(
    <MockedProvider addTypename={false} mocks={mock()}>
      <PaymentDataProvider
        defaultAccountID="f01a232c-f8e7-432e-8bc4-1a4b373aa9c6"
        defaultPayeeID="80d089b7-21a9-4324-b478-a6ccb667b275"
        handleClose={handleClose}
      >
        <PaymentSelect />
      </PaymentDataProvider>
    </MockedProvider>,
  );

  expect(container).toBeTruthy();
});
