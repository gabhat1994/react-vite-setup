/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { AccountListOutputFragmentDoc } from '../fragments/accountListOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type VerifyMicroDepositDwollaMutationVariables = Types.Exact<{
  input: Types.VerifyMicroDepositInput;
}>;


export type VerifyMicroDepositDwollaMutation = { __typename?: 'Mutation', verifyMicroDepositDwolla?: { __typename?: 'AccountListOutput', id: string, masterWalletId?: string | null, status?: string | null, customerName?: string | null, walletName?: string | null, balance?: number | null, paymentChannel?: Types.PaymentChannelsEnum | null, accountType?: Types.AccountType | null, accountName?: string | null, chamberId?: string | null, primary: boolean, maskAccountNumber?: string | null, createdAt?: string | null, updatedAt?: string | null, microDeposits?: Array<{ __typename?: 'VerifyMicroDeposit', id?: string | null, status?: string | null, amount1?: { __typename?: 'CurrencyOutput', value: number, currency: Types.CurrencyEnum } | null, amount2?: { __typename?: 'CurrencyOutput', value: number, currency: Types.CurrencyEnum } | null } | null> | null, chamber?: { __typename?: 'ChamberByIdRef', _id: string, profileImage?: string | null, uid?: { __typename?: 'UserOutput', _id: string } | null } | null, userId?: { __typename?: 'UserOutput', _id: string, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null } | null } | null } | null };


export const VerifyMicroDepositDwollaDocument = gql`
    mutation verifyMicroDepositDwolla($input: VerifyMicroDepositInput!) {
  verifyMicroDepositDwolla(input: $input) {
    ...AccountListOutput
  }
}
    ${AccountListOutputFragmentDoc}`;
export type VerifyMicroDepositDwollaMutationFn = Apollo.MutationFunction<VerifyMicroDepositDwollaMutation, VerifyMicroDepositDwollaMutationVariables>;

/**
 * __useVerifyMicroDepositDwollaMutation__
 *
 * To run a mutation, you first call `useVerifyMicroDepositDwollaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyMicroDepositDwollaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyMicroDepositDwollaMutation, { data, loading, error }] = useVerifyMicroDepositDwollaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyMicroDepositDwollaMutation(baseOptions?: Apollo.MutationHookOptions<VerifyMicroDepositDwollaMutation, VerifyMicroDepositDwollaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyMicroDepositDwollaMutation, VerifyMicroDepositDwollaMutationVariables>(VerifyMicroDepositDwollaDocument, options);
      }
export type VerifyMicroDepositDwollaMutationHookResult = ReturnType<typeof useVerifyMicroDepositDwollaMutation>;
export type VerifyMicroDepositDwollaMutationResult = Apollo.MutationResult<VerifyMicroDepositDwollaMutation>;
export type VerifyMicroDepositDwollaMutationOptions = Apollo.BaseMutationOptions<VerifyMicroDepositDwollaMutation, VerifyMicroDepositDwollaMutationVariables>;