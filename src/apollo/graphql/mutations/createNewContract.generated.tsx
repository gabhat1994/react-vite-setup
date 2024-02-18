/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ContractFragmentDoc } from '../fragments/contract.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateNewContractMutationVariables = Types.Exact<{
  input: Types.CreateNewContractInput;
}>;


export type CreateNewContractMutation = { __typename?: 'Mutation', createNewContract: { __typename?: 'Contract', _id: string, contractNumber: number, title?: string | null, status: Types.ContractStatus, templateName?: string | null, effectiveDate?: any | null, terminationNoticeInDays?: number | null, logo?: string | null, isCompleted: boolean, linkedNoum: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImageThumbnail?: string | null }, buyer?: { __typename?: 'NoumContactOutput', createdAt: any, isConnectedWithNoum: boolean, status: Types.NoumContactStatus, title?: string | null, companyName?: string | null, street?: string | null, city?: string | null, country?: string | null, zipCode?: string | null, state?: string | null, apartmentNo?: string | null, _id: string, displayName: string, ownerId: { __typename?: 'UserOutput', _id: string }, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, seller?: { __typename?: 'NoumContactOutput', createdAt: any, isConnectedWithNoum: boolean, status: Types.NoumContactStatus, title?: string | null, companyName?: string | null, street?: string | null, city?: string | null, country?: string | null, zipCode?: string | null, state?: string | null, apartmentNo?: string | null, _id: string, displayName: string, ownerId: { __typename?: 'UserOutput', _id: string }, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, createdBy?: { __typename?: 'UserOutput', _id: string } | null, legalJurisdiction?: { __typename?: 'Jurisdiction', country?: string | null, state?: string | null, region?: string | null } | null, arbitrationJurisdiction?: { __typename?: 'Jurisdiction', country?: string | null, state?: string | null, region?: string | null } | null, timeline?: Array<{ __typename?: 'ContractSowTimeLine', timestamp: any, userId?: string | null, fromStatus?: string | null, toStatus: string }> | null } };


export const CreateNewContractDocument = gql`
    mutation CreateNewContract($input: CreateNewContractInput!) {
  createNewContract(input: $input) {
    ...Contract
  }
}
    ${ContractFragmentDoc}`;
export type CreateNewContractMutationFn = Apollo.MutationFunction<CreateNewContractMutation, CreateNewContractMutationVariables>;

/**
 * __useCreateNewContractMutation__
 *
 * To run a mutation, you first call `useCreateNewContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewContractMutation, { data, loading, error }] = useCreateNewContractMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNewContractMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewContractMutation, CreateNewContractMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewContractMutation, CreateNewContractMutationVariables>(CreateNewContractDocument, options);
      }
export type CreateNewContractMutationHookResult = ReturnType<typeof useCreateNewContractMutation>;
export type CreateNewContractMutationResult = Apollo.MutationResult<CreateNewContractMutation>;
export type CreateNewContractMutationOptions = Apollo.BaseMutationOptions<CreateNewContractMutation, CreateNewContractMutationVariables>;