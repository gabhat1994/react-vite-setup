/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { AccountListOutputFragmentDoc } from '../fragments/accountListOutput.generated';
import { CustomerPayeeListFragmentDoc } from '../fragments/customerPayeeList.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPaymentProviderDataQueryVariables = Types.Exact<{
  input: Types.AccountListInput;
}>;


export type GetPaymentProviderDataQuery = { __typename?: 'Query', getAccountList?: Array<{ __typename?: 'AccountListOutput', id: string, masterWalletId?: string | null, status?: string | null, customerName?: string | null, walletName?: string | null, balance?: number | null, paymentChannel?: Types.PaymentChannelsEnum | null, accountType?: Types.AccountType | null, accountName?: string | null, chamberId?: string | null, primary: boolean, maskAccountNumber?: string | null, createdAt?: string | null, updatedAt?: string | null, microDeposits?: Array<{ __typename?: 'VerifyMicroDeposit', id?: string | null, status?: string | null, amount1?: { __typename?: 'CurrencyOutput', value: number, currency: Types.CurrencyEnum } | null, amount2?: { __typename?: 'CurrencyOutput', value: number, currency: Types.CurrencyEnum } | null } | null> | null, chamber?: { __typename?: 'ChamberByIdRef', _id: string, profileImage?: string | null, uid?: { __typename?: 'UserOutput', _id: string } | null } | null, userId?: { __typename?: 'UserOutput', _id: string, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null } | null } | null }> | null, getCustomerPayeeList?: Array<{ __typename?: 'CustomerPayeeList', id: string, customerName: string, maskAccountNumber?: string | null, accountType?: Types.AccountType | null, subAccountType?: Types.SubAccountType | null, walletName?: string | null, accountId: string, chamberId?: string | null, userId?: { __typename?: 'UserOutput', _id: string, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null } | null } | null } | null> | null };


export const GetPaymentProviderDataDocument = gql`
    query getPaymentProviderData($input: AccountListInput!) {
  getAccountList(query: $input) {
    ...AccountListOutput
  }
  getCustomerPayeeList {
    ...CustomerPayeeList
  }
}
    ${AccountListOutputFragmentDoc}
${CustomerPayeeListFragmentDoc}`;

/**
 * __useGetPaymentProviderDataQuery__
 *
 * To run a query within a React component, call `useGetPaymentProviderDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentProviderDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentProviderDataQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPaymentProviderDataQuery(baseOptions: Apollo.QueryHookOptions<GetPaymentProviderDataQuery, GetPaymentProviderDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaymentProviderDataQuery, GetPaymentProviderDataQueryVariables>(GetPaymentProviderDataDocument, options);
      }
export function useGetPaymentProviderDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentProviderDataQuery, GetPaymentProviderDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaymentProviderDataQuery, GetPaymentProviderDataQueryVariables>(GetPaymentProviderDataDocument, options);
        }
export type GetPaymentProviderDataQueryHookResult = ReturnType<typeof useGetPaymentProviderDataQuery>;
export type GetPaymentProviderDataLazyQueryHookResult = ReturnType<typeof useGetPaymentProviderDataLazyQuery>;
export type GetPaymentProviderDataQueryResult = Apollo.QueryResult<GetPaymentProviderDataQuery, GetPaymentProviderDataQueryVariables>;