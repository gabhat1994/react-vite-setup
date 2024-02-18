/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DiscardNoumReferenceMutationVariables = Types.Exact<{
  referenceId: Types.Scalars['ID'];
}>;


export type DiscardNoumReferenceMutation = { __typename?: 'Mutation', discardNoumReference: { __typename?: 'NoumReference', _id: string, capacity: Types.NoumReferenceCapacity, experienceId: string, imageUrl?: string | null, providerName: string, referenceText?: string | null, status: Types.NoumReferenceStatus } };


export const DiscardNoumReferenceDocument = gql`
    mutation discardNoumReference($referenceId: ID!) {
  discardNoumReference(referenceId: $referenceId) {
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
export type DiscardNoumReferenceMutationFn = Apollo.MutationFunction<DiscardNoumReferenceMutation, DiscardNoumReferenceMutationVariables>;

/**
 * __useDiscardNoumReferenceMutation__
 *
 * To run a mutation, you first call `useDiscardNoumReferenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDiscardNoumReferenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [discardNoumReferenceMutation, { data, loading, error }] = useDiscardNoumReferenceMutation({
 *   variables: {
 *      referenceId: // value for 'referenceId'
 *   },
 * });
 */
export function useDiscardNoumReferenceMutation(baseOptions?: Apollo.MutationHookOptions<DiscardNoumReferenceMutation, DiscardNoumReferenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DiscardNoumReferenceMutation, DiscardNoumReferenceMutationVariables>(DiscardNoumReferenceDocument, options);
      }
export type DiscardNoumReferenceMutationHookResult = ReturnType<typeof useDiscardNoumReferenceMutation>;
export type DiscardNoumReferenceMutationResult = Apollo.MutationResult<DiscardNoumReferenceMutation>;
export type DiscardNoumReferenceMutationOptions = Apollo.BaseMutationOptions<DiscardNoumReferenceMutation, DiscardNoumReferenceMutationVariables>;