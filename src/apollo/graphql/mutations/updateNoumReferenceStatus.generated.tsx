/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateNoumReferenceStatusMutationVariables = Types.Exact<{
  referenceId: Types.Scalars['ID'];
  status: Types.NoumReferenceStatus;
}>;


export type UpdateNoumReferenceStatusMutation = { __typename?: 'Mutation', updateNoumReferenceStatus: { __typename?: 'NoumReference', _id: string, capacity: Types.NoumReferenceCapacity, experienceId: string, imageUrl?: string | null, providerName: string, referenceText?: string | null, status: Types.NoumReferenceStatus } };


export const UpdateNoumReferenceStatusDocument = gql`
    mutation updateNoumReferenceStatus($referenceId: ID!, $status: NoumReferenceStatus!) {
  updateNoumReferenceStatus(referenceId: $referenceId, status: $status) {
    _id
    capacity
    experienceId
    imageUrl
    providerName
    referenceText
    status
  }
}
    `;
export type UpdateNoumReferenceStatusMutationFn = Apollo.MutationFunction<UpdateNoumReferenceStatusMutation, UpdateNoumReferenceStatusMutationVariables>;

/**
 * __useUpdateNoumReferenceStatusMutation__
 *
 * To run a mutation, you first call `useUpdateNoumReferenceStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNoumReferenceStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNoumReferenceStatusMutation, { data, loading, error }] = useUpdateNoumReferenceStatusMutation({
 *   variables: {
 *      referenceId: // value for 'referenceId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateNoumReferenceStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNoumReferenceStatusMutation, UpdateNoumReferenceStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNoumReferenceStatusMutation, UpdateNoumReferenceStatusMutationVariables>(UpdateNoumReferenceStatusDocument, options);
      }
export type UpdateNoumReferenceStatusMutationHookResult = ReturnType<typeof useUpdateNoumReferenceStatusMutation>;
export type UpdateNoumReferenceStatusMutationResult = Apollo.MutationResult<UpdateNoumReferenceStatusMutation>;
export type UpdateNoumReferenceStatusMutationOptions = Apollo.BaseMutationOptions<UpdateNoumReferenceStatusMutation, UpdateNoumReferenceStatusMutationVariables>;