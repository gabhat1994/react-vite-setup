/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { AccountListOutputFragmentDoc } from '../fragments/accountListOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveInitiateMicroDepositDwollaMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type RemoveInitiateMicroDepositDwollaMutation = { __typename?: 'Mutation', removeInitiateMicroDepositDwolla?: { __typename?: 'AccountListOutput', id: string, masterWalletId?: string | null, status?: string | null, customerName?: string | null, walletName?: string | null, balance?: number | null, paymentChannel?: Types.PaymentChannelsEnum | null, accountType?: Types.AccountType | null, accountName?: string | null, chamberId?: string | null, primary: boolean, maskAccountNumber?: string | null, createdAt?: string | null, updatedAt?: string | null, microDeposits?: Array<{ __typename?: 'VerifyMicroDeposit', id?: string | null, status?: string | null, amount1?: { __typename?: 'CurrencyOutput', value: number, currency: Types.CurrencyEnum } | null, amount2?: { __typename?: 'CurrencyOutput', value: number, currency: Types.CurrencyEnum } | null } | null> | null, chamber?: { __typename?: 'ChamberByIdRef', _id: string, profileImage?: string | null, uid?: { __typename?: 'UserOutput', _id: string } | null } | null, userId?: { __typename?: 'UserOutput', _id: string, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null } | null } | null } | null };


export const RemoveInitiateMicroDepositDwollaDocument = gql`
    mutation removeInitiateMicroDepositDwolla($id: String!) {
  removeInitiateMicroDepositDwolla(id: $id) {
    ...AccountListOutput
  }
}
    ${AccountListOutputFragmentDoc}`;
export type RemoveInitiateMicroDepositDwollaMutationFn = Apollo.MutationFunction<RemoveInitiateMicroDepositDwollaMutation, RemoveInitiateMicroDepositDwollaMutationVariables>;

/**
 * __useRemoveInitiateMicroDepositDwollaMutation__
 *
 * To run a mutation, you first call `useRemoveInitiateMicroDepositDwollaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveInitiateMicroDepositDwollaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeInitiateMicroDepositDwollaMutation, { data, loading, error }] = useRemoveInitiateMicroDepositDwollaMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveInitiateMicroDepositDwollaMutation(baseOptions?: Apollo.MutationHookOptions<RemoveInitiateMicroDepositDwollaMutation, RemoveInitiateMicroDepositDwollaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveInitiateMicroDepositDwollaMutation, RemoveInitiateMicroDepositDwollaMutationVariables>(RemoveInitiateMicroDepositDwollaDocument, options);
      }
export type RemoveInitiateMicroDepositDwollaMutationHookResult = ReturnType<typeof useRemoveInitiateMicroDepositDwollaMutation>;
export type RemoveInitiateMicroDepositDwollaMutationResult = Apollo.MutationResult<RemoveInitiateMicroDepositDwollaMutation>;
export type RemoveInitiateMicroDepositDwollaMutationOptions = Apollo.BaseMutationOptions<RemoveInitiateMicroDepositDwollaMutation, RemoveInitiateMicroDepositDwollaMutationVariables>;