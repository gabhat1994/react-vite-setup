/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SowFragmentDoc } from '../fragments/sow.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateNewSowMutationVariables = Types.Exact<{
  input: Types.CreateNewSowInput;
}>;


export type CreateNewSowMutation = { __typename?: 'Mutation', createNewSOW: { __typename?: 'SOW', _id: string, SOWNumber: number, status: Types.SowStatus, title?: string | null, scopeOfWork?: string | null, effectiveDate?: any | null, logo?: string | null, isCompleted: boolean, deliverables?: Array<{ __typename?: 'DeliverablesAndMilestones', title?: string | null, description?: string | null, dueDate?: any | null } | null> | null, milestones?: Array<{ __typename?: 'DeliverablesAndMilestones', title?: string | null, description?: string | null, dueDate?: any | null } | null> | null, commission?: Array<{ __typename?: 'CommissionAndReimbursement', description?: string | null, amount?: number | null } | null> | null, expenseReimbursement?: Array<{ __typename?: 'CommissionAndReimbursement', description?: string | null, amount?: number | null } | null> | null, fees?: { __typename?: 'FeesCategory', type?: Types.FeesCategoryTypes | null, feesData?: Array<{ __typename?: 'FeesInfo', description?: string | null, amount?: number | null, dueDate?: any | null } | null> | null } | null, linkedNoum: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImageThumbnail?: string | null }, linkedContract?: { __typename?: 'Contract', status: Types.ContractStatus, contractNumber: number, isCompleted: boolean, _id: string, title?: string | null, effectiveDate?: any | null, buyer?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, seller?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null } | null, createdBy?: { __typename?: 'UserOutput', _id: string } | null, timeline?: Array<{ __typename?: 'ContractSowTimeLine', timestamp: any, userId?: string | null, fromStatus?: string | null, toStatus: string }> | null } };


export const CreateNewSowDocument = gql`
    mutation CreateNewSOW($input: CreateNewSOWInput!) {
  createNewSOW(input: $input) {
    ...SOW
  }
}
    ${SowFragmentDoc}`;
export type CreateNewSowMutationFn = Apollo.MutationFunction<CreateNewSowMutation, CreateNewSowMutationVariables>;

/**
 * __useCreateNewSowMutation__
 *
 * To run a mutation, you first call `useCreateNewSowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewSowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewSowMutation, { data, loading, error }] = useCreateNewSowMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNewSowMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewSowMutation, CreateNewSowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewSowMutation, CreateNewSowMutationVariables>(CreateNewSowDocument, options);
      }
export type CreateNewSowMutationHookResult = ReturnType<typeof useCreateNewSowMutation>;
export type CreateNewSowMutationResult = Apollo.MutationResult<CreateNewSowMutation>;
export type CreateNewSowMutationOptions = Apollo.BaseMutationOptions<CreateNewSowMutation, CreateNewSowMutationVariables>;