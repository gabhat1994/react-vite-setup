/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateNoumReferenceMutationVariables = Types.Exact<{
  referenceId: Types.Scalars['ID'];
  payload: Types.UpdateNoumReferencePayload;
}>;


export type UpdateNoumReferenceMutation = { __typename?: 'Mutation', updateNoumReference: { __typename?: 'NoumReference', _id: string, capacity: Types.NoumReferenceCapacity, experienceId: string, imageUrl?: string | null, providerName: string, referenceText?: string | null, status: Types.NoumReferenceStatus } };


export const UpdateNoumReferenceDocument = gql`
    mutation updateNoumReference($referenceId: ID!, $payload: UpdateNoumReferencePayload!) {
  updateNoumReference(referenceId: $referenceId, payload: $payload) {
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
export type UpdateNoumReferenceMutationFn = Apollo.MutationFunction<UpdateNoumReferenceMutation, UpdateNoumReferenceMutationVariables>;

/**
 * __useUpdateNoumReferenceMutation__
 *
 * To run a mutation, you first call `useUpdateNoumReferenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNoumReferenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNoumReferenceMutation, { data, loading, error }] = useUpdateNoumReferenceMutation({
 *   variables: {
 *      referenceId: // value for 'referenceId'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateNoumReferenceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNoumReferenceMutation, UpdateNoumReferenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNoumReferenceMutation, UpdateNoumReferenceMutationVariables>(UpdateNoumReferenceDocument, options);
      }
export type UpdateNoumReferenceMutationHookResult = ReturnType<typeof useUpdateNoumReferenceMutation>;
export type UpdateNoumReferenceMutationResult = Apollo.MutationResult<UpdateNoumReferenceMutation>;
export type UpdateNoumReferenceMutationOptions = Apollo.BaseMutationOptions<UpdateNoumReferenceMutation, UpdateNoumReferenceMutationVariables>;