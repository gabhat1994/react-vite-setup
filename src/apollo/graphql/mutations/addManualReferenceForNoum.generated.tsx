/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddManualReferenceForNoumMutationVariables = Types.Exact<{
  experienceId: Types.Scalars['ID'];
  reference: Types.ManualNoumReferencePayload;
}>;


export type AddManualReferenceForNoumMutation = { __typename?: 'Mutation', addManualReferenceForNoum: { __typename?: 'NoumReference', _id: string, capacity: Types.NoumReferenceCapacity, experienceId: string, imageUrl?: string | null, providerName: string, referenceText?: string | null } };


export const AddManualReferenceForNoumDocument = gql`
    mutation addManualReferenceForNoum($experienceId: ID!, $reference: ManualNoumReferencePayload!) {
  addManualReferenceForNoum(experienceId: $experienceId, reference: $reference) {
    _id
    capacity
    experienceId
    imageUrl
    providerName
    referenceText
  }
}
    `;
export type AddManualReferenceForNoumMutationFn = Apollo.MutationFunction<AddManualReferenceForNoumMutation, AddManualReferenceForNoumMutationVariables>;

/**
 * __useAddManualReferenceForNoumMutation__
 *
 * To run a mutation, you first call `useAddManualReferenceForNoumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddManualReferenceForNoumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addManualReferenceForNoumMutation, { data, loading, error }] = useAddManualReferenceForNoumMutation({
 *   variables: {
 *      experienceId: // value for 'experienceId'
 *      reference: // value for 'reference'
 *   },
 * });
 */
export function useAddManualReferenceForNoumMutation(baseOptions?: Apollo.MutationHookOptions<AddManualReferenceForNoumMutation, AddManualReferenceForNoumMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddManualReferenceForNoumMutation, AddManualReferenceForNoumMutationVariables>(AddManualReferenceForNoumDocument, options);
      }
export type AddManualReferenceForNoumMutationHookResult = ReturnType<typeof useAddManualReferenceForNoumMutation>;
export type AddManualReferenceForNoumMutationResult = Apollo.MutationResult<AddManualReferenceForNoumMutation>;
export type AddManualReferenceForNoumMutationOptions = Apollo.BaseMutationOptions<AddManualReferenceForNoumMutation, AddManualReferenceForNoumMutationVariables>;