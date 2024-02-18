/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RejectStatementOfWorkMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type RejectStatementOfWorkMutation = { __typename?: 'Mutation', rejectSow: boolean };


export const RejectStatementOfWorkDocument = gql`
    mutation RejectStatementOfWork($id: ID!) {
  rejectSow(documentId: $id)
}
    `;
export type RejectStatementOfWorkMutationFn = Apollo.MutationFunction<RejectStatementOfWorkMutation, RejectStatementOfWorkMutationVariables>;

/**
 * __useRejectStatementOfWorkMutation__
 *
 * To run a mutation, you first call `useRejectStatementOfWorkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectStatementOfWorkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectStatementOfWorkMutation, { data, loading, error }] = useRejectStatementOfWorkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRejectStatementOfWorkMutation(baseOptions?: Apollo.MutationHookOptions<RejectStatementOfWorkMutation, RejectStatementOfWorkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectStatementOfWorkMutation, RejectStatementOfWorkMutationVariables>(RejectStatementOfWorkDocument, options);
      }
export type RejectStatementOfWorkMutationHookResult = ReturnType<typeof useRejectStatementOfWorkMutation>;
export type RejectStatementOfWorkMutationResult = Apollo.MutationResult<RejectStatementOfWorkMutation>;
export type RejectStatementOfWorkMutationOptions = Apollo.BaseMutationOptions<RejectStatementOfWorkMutation, RejectStatementOfWorkMutationVariables>;