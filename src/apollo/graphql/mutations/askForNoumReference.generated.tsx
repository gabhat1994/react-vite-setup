/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AskForNoumReferenceMutationVariables = Types.Exact<{
  experienceId: Types.Scalars['ID'];
  reference?: Types.InputMaybe<Types.AskForReferencePayload>;
}>;


export type AskForNoumReferenceMutation = { __typename?: 'Mutation', askForNoumReference: { __typename: 'NoumReference', experienceId: string, _id: string, providerName: string, capacity: Types.NoumReferenceCapacity, referenceText?: string | null, imageUrl?: string | null, status: Types.NoumReferenceStatus } };


export const AskForNoumReferenceDocument = gql`
    mutation askForNoumReference($experienceId: ID!, $reference: AskForReferencePayload) {
  askForNoumReference(experienceId: $experienceId, reference: $reference) {
    experienceId
    _id
    providerName
    capacity
    referenceText
    imageUrl
    status
    __typename
  }
}
    `;
export type AskForNoumReferenceMutationFn = Apollo.MutationFunction<AskForNoumReferenceMutation, AskForNoumReferenceMutationVariables>;

/**
 * __useAskForNoumReferenceMutation__
 *
 * To run a mutation, you first call `useAskForNoumReferenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAskForNoumReferenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [askForNoumReferenceMutation, { data, loading, error }] = useAskForNoumReferenceMutation({
 *   variables: {
 *      experienceId: // value for 'experienceId'
 *      reference: // value for 'reference'
 *   },
 * });
 */
export function useAskForNoumReferenceMutation(baseOptions?: Apollo.MutationHookOptions<AskForNoumReferenceMutation, AskForNoumReferenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AskForNoumReferenceMutation, AskForNoumReferenceMutationVariables>(AskForNoumReferenceDocument, options);
      }
export type AskForNoumReferenceMutationHookResult = ReturnType<typeof useAskForNoumReferenceMutation>;
export type AskForNoumReferenceMutationResult = Apollo.MutationResult<AskForNoumReferenceMutation>;
export type AskForNoumReferenceMutationOptions = Apollo.BaseMutationOptions<AskForNoumReferenceMutation, AskForNoumReferenceMutationVariables>;