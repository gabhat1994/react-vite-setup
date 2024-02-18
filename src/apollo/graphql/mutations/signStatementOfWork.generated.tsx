/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SignStatementOfWorkMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type SignStatementOfWorkMutation = { __typename?: 'Mutation', signSow: boolean };


export const SignStatementOfWorkDocument = gql`
    mutation SignStatementOfWork($id: ID!) {
  signSow(documentId: $id)
}
    `;
export type SignStatementOfWorkMutationFn = Apollo.MutationFunction<SignStatementOfWorkMutation, SignStatementOfWorkMutationVariables>;

/**
 * __useSignStatementOfWorkMutation__
 *
 * To run a mutation, you first call `useSignStatementOfWorkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignStatementOfWorkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signStatementOfWorkMutation, { data, loading, error }] = useSignStatementOfWorkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSignStatementOfWorkMutation(baseOptions?: Apollo.MutationHookOptions<SignStatementOfWorkMutation, SignStatementOfWorkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignStatementOfWorkMutation, SignStatementOfWorkMutationVariables>(SignStatementOfWorkDocument, options);
      }
export type SignStatementOfWorkMutationHookResult = ReturnType<typeof useSignStatementOfWorkMutation>;
export type SignStatementOfWorkMutationResult = Apollo.MutationResult<SignStatementOfWorkMutation>;
export type SignStatementOfWorkMutationOptions = Apollo.BaseMutationOptions<SignStatementOfWorkMutation, SignStatementOfWorkMutationVariables>;