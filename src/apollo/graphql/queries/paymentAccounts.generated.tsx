/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { AccountListOutputFragmentDoc } from '../fragments/accountListOutput.generated';
import { CurrencyFragmentDoc } from '../fragments/wallet.generated';
import { UserAddressFragmentDoc } from '../fragments/user.generated';
import { TokenFragmentDoc, TokenTransactionFragmentDoc } from '../fragments/token.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAccountListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAccountListQuery = { __typename?: 'Query', getAccountList?: Array<{ __typename?: 'AccountListOutput', id: string, masterWalletId?: string | null, status?: string | null, customerName?: string | null, walletName?: string | null, balance?: number | null, paymentChannel?: Types.PaymentChannelsEnum | null, accountType?: Types.AccountType | null, accountName?: string | null, chamberId?: string | null, primary: boolean, maskAccountNumber?: string | null, createdAt?: string | null, updatedAt?: string | null, microDeposits?: Array<{ __typename?: 'VerifyMicroDeposit', id?: string | null, status?: string | null, amount1?: { __typename?: 'CurrencyOutput', value: number, currency: Types.CurrencyEnum } | null, amount2?: { __typename?: 'CurrencyOutput', value: number, currency: Types.CurrencyEnum } | null } | null> | null, chamber?: { __typename?: 'ChamberByIdRef', _id: string, profileImage?: string | null, uid?: { __typename?: 'UserOutput', _id: string } | null } | null, userId?: { __typename?: 'UserOutput', _id: string, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null } | null } | null }> | null };

export type GetWalletBalanceQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetWalletBalanceQuery = { __typename?: 'Query', getWalletBalance?: { __typename?: 'FundingSourceBalanceOutput', total?: { __typename?: 'CurrencyData', value?: number | null, currency?: Types.CurrencyEnum | null } | null, balance?: { __typename?: 'CurrencyData', value?: number | null, currency?: Types.CurrencyEnum | null } | null } | null };

export type GetSubWalletBalanceQueryVariables = Types.Exact<{
  chamberId: Types.Scalars['String'];
}>;


export type GetSubWalletBalanceQuery = { __typename?: 'Query', getSubWalletBalance?: { __typename?: 'SubWalletBalance', id?: string | null, masterWalletId?: string | null, amount?: { __typename?: 'CurrencyData', value?: number | null, currency?: Types.CurrencyEnum | null } | null } | null };

export type GetBankAccountBalanceQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetBankAccountBalanceQuery = { __typename?: 'Query', getBankAccountBalance?: { __typename?: 'BankAccountBalance', id?: string | null, clientAccountId?: string | null, maskAccountNumber?: string | null, balance?: { __typename?: 'CurrencyData', value?: number | null, currency?: Types.CurrencyEnum | null } | null } | null };

export type GetNoumProfileQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetNoumProfileQuery = { __typename?: 'Query', getSpaceById?: { __typename?: 'SpaceOutput', profileImage?: string | null } | null };

export type GetPersonalInfoQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetPersonalInfoQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', firstName?: string | null, lastName?: string | null, citizenship?: string | null, email?: string | null } | null, userKyc?: { __typename?: 'KycOutput', dob?: string | null, ssn?: string | null } | null, userAddress?: { __typename?: 'AddressOutput', street?: string | null, apartment?: string | null, city?: string | null, zipcode?: string | null, state?: string | null } | null };

export type GetTokenQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetTokenQuery = { __typename?: 'Query', getSpaceByType?: Array<{ __typename?: 'SpaceOutput', token?: { __typename?: 'Token', _id: string, count: number } | null } | null> | null };

export type GetTokenTransactionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetTokenTransactionQuery = { __typename?: 'Query', getSpaceByType?: Array<{ __typename?: 'SpaceOutput', token?: { __typename?: 'Token', _id: string, count: number } | null, tokenTransaction?: { __typename?: 'TokenTransaction', chamberId: string, data?: Array<{ __typename?: 'TokenTransactionType', count?: number | null, activityType?: string | null, message?: string | null, createdAt?: any | null, id?: string | null } | null> | null } | null } | null> | null };

export type GetStripeTokenQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetStripeTokenQuery = { __typename?: 'Query', getConfig?: { __typename?: 'ConfigOutput', stripe?: { __typename?: 'PublishableKey', publishableKey?: string | null } | null } | null };


export const GetAccountListDocument = gql`
    query getAccountList {
  getAccountList(query: {self: true, limit: 100, page: 1}) {
    ...AccountListOutput
  }
}
    ${AccountListOutputFragmentDoc}`;

/**
 * __useGetAccountListQuery__
 *
 * To run a query within a React component, call `useGetAccountListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAccountListQuery(baseOptions?: Apollo.QueryHookOptions<GetAccountListQuery, GetAccountListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountListQuery, GetAccountListQueryVariables>(GetAccountListDocument, options);
      }
export function useGetAccountListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountListQuery, GetAccountListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountListQuery, GetAccountListQueryVariables>(GetAccountListDocument, options);
        }
export type GetAccountListQueryHookResult = ReturnType<typeof useGetAccountListQuery>;
export type GetAccountListLazyQueryHookResult = ReturnType<typeof useGetAccountListLazyQuery>;
export type GetAccountListQueryResult = Apollo.QueryResult<GetAccountListQuery, GetAccountListQueryVariables>;
export const GetWalletBalanceDocument = gql`
    query getWalletBalance {
  getWalletBalance {
    total {
      ...Currency
    }
    balance {
      ...Currency
    }
  }
}
    ${CurrencyFragmentDoc}`;

/**
 * __useGetWalletBalanceQuery__
 *
 * To run a query within a React component, call `useGetWalletBalanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWalletBalanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWalletBalanceQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWalletBalanceQuery(baseOptions?: Apollo.QueryHookOptions<GetWalletBalanceQuery, GetWalletBalanceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWalletBalanceQuery, GetWalletBalanceQueryVariables>(GetWalletBalanceDocument, options);
      }
export function useGetWalletBalanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWalletBalanceQuery, GetWalletBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWalletBalanceQuery, GetWalletBalanceQueryVariables>(GetWalletBalanceDocument, options);
        }
export type GetWalletBalanceQueryHookResult = ReturnType<typeof useGetWalletBalanceQuery>;
export type GetWalletBalanceLazyQueryHookResult = ReturnType<typeof useGetWalletBalanceLazyQuery>;
export type GetWalletBalanceQueryResult = Apollo.QueryResult<GetWalletBalanceQuery, GetWalletBalanceQueryVariables>;
export const GetSubWalletBalanceDocument = gql`
    query getSubWalletBalance($chamberId: String!) {
  getSubWalletBalance(chamberId: $chamberId) {
    id
    masterWalletId
    amount {
      ...Currency
    }
  }
}
    ${CurrencyFragmentDoc}`;

/**
 * __useGetSubWalletBalanceQuery__
 *
 * To run a query within a React component, call `useGetSubWalletBalanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubWalletBalanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubWalletBalanceQuery({
 *   variables: {
 *      chamberId: // value for 'chamberId'
 *   },
 * });
 */
export function useGetSubWalletBalanceQuery(baseOptions: Apollo.QueryHookOptions<GetSubWalletBalanceQuery, GetSubWalletBalanceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubWalletBalanceQuery, GetSubWalletBalanceQueryVariables>(GetSubWalletBalanceDocument, options);
      }
export function useGetSubWalletBalanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubWalletBalanceQuery, GetSubWalletBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubWalletBalanceQuery, GetSubWalletBalanceQueryVariables>(GetSubWalletBalanceDocument, options);
        }
export type GetSubWalletBalanceQueryHookResult = ReturnType<typeof useGetSubWalletBalanceQuery>;
export type GetSubWalletBalanceLazyQueryHookResult = ReturnType<typeof useGetSubWalletBalanceLazyQuery>;
export type GetSubWalletBalanceQueryResult = Apollo.QueryResult<GetSubWalletBalanceQuery, GetSubWalletBalanceQueryVariables>;
export const GetBankAccountBalanceDocument = gql`
    query getBankAccountBalance($id: String!) {
  getBankAccountBalance(id: $id) {
    id
    clientAccountId
    maskAccountNumber
    balance {
      ...Currency
    }
  }
}
    ${CurrencyFragmentDoc}`;

/**
 * __useGetBankAccountBalanceQuery__
 *
 * To run a query within a React component, call `useGetBankAccountBalanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBankAccountBalanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBankAccountBalanceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBankAccountBalanceQuery(baseOptions: Apollo.QueryHookOptions<GetBankAccountBalanceQuery, GetBankAccountBalanceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBankAccountBalanceQuery, GetBankAccountBalanceQueryVariables>(GetBankAccountBalanceDocument, options);
      }
export function useGetBankAccountBalanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBankAccountBalanceQuery, GetBankAccountBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBankAccountBalanceQuery, GetBankAccountBalanceQueryVariables>(GetBankAccountBalanceDocument, options);
        }
export type GetBankAccountBalanceQueryHookResult = ReturnType<typeof useGetBankAccountBalanceQuery>;
export type GetBankAccountBalanceLazyQueryHookResult = ReturnType<typeof useGetBankAccountBalanceLazyQuery>;
export type GetBankAccountBalanceQueryResult = Apollo.QueryResult<GetBankAccountBalanceQuery, GetBankAccountBalanceQueryVariables>;
export const GetNoumProfileDocument = gql`
    query getNoumProfile($id: ID!) {
  getSpaceById(id: $id) {
    profileImage
  }
}
    `;

/**
 * __useGetNoumProfileQuery__
 *
 * To run a query within a React component, call `useGetNoumProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumProfileQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetNoumProfileQuery(baseOptions: Apollo.QueryHookOptions<GetNoumProfileQuery, GetNoumProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumProfileQuery, GetNoumProfileQueryVariables>(GetNoumProfileDocument, options);
      }
export function useGetNoumProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumProfileQuery, GetNoumProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumProfileQuery, GetNoumProfileQueryVariables>(GetNoumProfileDocument, options);
        }
export type GetNoumProfileQueryHookResult = ReturnType<typeof useGetNoumProfileQuery>;
export type GetNoumProfileLazyQueryHookResult = ReturnType<typeof useGetNoumProfileLazyQuery>;
export type GetNoumProfileQueryResult = Apollo.QueryResult<GetNoumProfileQuery, GetNoumProfileQueryVariables>;
export const GetPersonalInfoDocument = gql`
    query getPersonalInfo {
  currentUser {
    firstName
    lastName
    citizenship
    email
  }
  userKyc {
    dob
    ssn
  }
  userAddress {
    ...UserAddress
  }
}
    ${UserAddressFragmentDoc}`;

/**
 * __useGetPersonalInfoQuery__
 *
 * To run a query within a React component, call `useGetPersonalInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPersonalInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPersonalInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPersonalInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetPersonalInfoQuery, GetPersonalInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPersonalInfoQuery, GetPersonalInfoQueryVariables>(GetPersonalInfoDocument, options);
      }
export function useGetPersonalInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPersonalInfoQuery, GetPersonalInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPersonalInfoQuery, GetPersonalInfoQueryVariables>(GetPersonalInfoDocument, options);
        }
export type GetPersonalInfoQueryHookResult = ReturnType<typeof useGetPersonalInfoQuery>;
export type GetPersonalInfoLazyQueryHookResult = ReturnType<typeof useGetPersonalInfoLazyQuery>;
export type GetPersonalInfoQueryResult = Apollo.QueryResult<GetPersonalInfoQuery, GetPersonalInfoQueryVariables>;
export const GetTokenDocument = gql`
    query getToken {
  getSpaceByType(type: HOME) {
    token {
      ...Token
    }
  }
}
    ${TokenFragmentDoc}`;

/**
 * __useGetTokenQuery__
 *
 * To run a query within a React component, call `useGetTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTokenQuery(baseOptions?: Apollo.QueryHookOptions<GetTokenQuery, GetTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTokenQuery, GetTokenQueryVariables>(GetTokenDocument, options);
      }
export function useGetTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTokenQuery, GetTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTokenQuery, GetTokenQueryVariables>(GetTokenDocument, options);
        }
export type GetTokenQueryHookResult = ReturnType<typeof useGetTokenQuery>;
export type GetTokenLazyQueryHookResult = ReturnType<typeof useGetTokenLazyQuery>;
export type GetTokenQueryResult = Apollo.QueryResult<GetTokenQuery, GetTokenQueryVariables>;
export const GetTokenTransactionDocument = gql`
    query getTokenTransaction {
  getSpaceByType(type: HOME) {
    token {
      ...Token
    }
    tokenTransaction {
      ...TokenTransaction
    }
  }
}
    ${TokenFragmentDoc}
${TokenTransactionFragmentDoc}`;

/**
 * __useGetTokenTransactionQuery__
 *
 * To run a query within a React component, call `useGetTokenTransactionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTokenTransactionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTokenTransactionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTokenTransactionQuery(baseOptions?: Apollo.QueryHookOptions<GetTokenTransactionQuery, GetTokenTransactionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTokenTransactionQuery, GetTokenTransactionQueryVariables>(GetTokenTransactionDocument, options);
      }
export function useGetTokenTransactionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTokenTransactionQuery, GetTokenTransactionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTokenTransactionQuery, GetTokenTransactionQueryVariables>(GetTokenTransactionDocument, options);
        }
export type GetTokenTransactionQueryHookResult = ReturnType<typeof useGetTokenTransactionQuery>;
export type GetTokenTransactionLazyQueryHookResult = ReturnType<typeof useGetTokenTransactionLazyQuery>;
export type GetTokenTransactionQueryResult = Apollo.QueryResult<GetTokenTransactionQuery, GetTokenTransactionQueryVariables>;
export const GetStripeTokenDocument = gql`
    query getStripeToken {
  getConfig {
    stripe {
      publishableKey
    }
  }
}
    `;

/**
 * __useGetStripeTokenQuery__
 *
 * To run a query within a React component, call `useGetStripeTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStripeTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStripeTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStripeTokenQuery(baseOptions?: Apollo.QueryHookOptions<GetStripeTokenQuery, GetStripeTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStripeTokenQuery, GetStripeTokenQueryVariables>(GetStripeTokenDocument, options);
      }
export function useGetStripeTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStripeTokenQuery, GetStripeTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStripeTokenQuery, GetStripeTokenQueryVariables>(GetStripeTokenDocument, options);
        }
export type GetStripeTokenQueryHookResult = ReturnType<typeof useGetStripeTokenQuery>;
export type GetStripeTokenLazyQueryHookResult = ReturnType<typeof useGetStripeTokenLazyQuery>;
export type GetStripeTokenQueryResult = Apollo.QueryResult<GetStripeTokenQuery, GetStripeTokenQueryVariables>;