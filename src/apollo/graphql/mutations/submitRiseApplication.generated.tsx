/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SubmitRiseApplicationMutationVariables = Types.Exact<{
  _id: Types.Scalars['ID'];
  input: Types.ApplicationResultInput;
}>;


export type SubmitRiseApplicationMutation = { __typename?: 'Mutation', updateNoumApplicationResult?: { __typename?: 'ApplicationResult', status?: Types.ApplicationResultStatusAdmin | null } | null };


export const SubmitRiseApplicationDocument = gql`
    mutation submitRiseApplication($_id: ID!, $input: ApplicationResultInput!) {
  updateNoumApplicationResult(_id: $_id, input: $input) {
    status
  }
}
    `;
export type SubmitRiseApplicationMutationFn = Apollo.MutationFunction<SubmitRiseApplicationMutation, SubmitRiseApplicationMutationVariables>;

/**
 * __useSubmitRiseApplicationMutation__
 *
 * To run a mutation, you first call `useSubmitRiseApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitRiseApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitRiseApplicationMutation, { data, loading, error }] = useSubmitRiseApplicationMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitRiseApplicationMutation(baseOptions?: Apollo.MutationHookOptions<SubmitRiseApplicationMutation, SubmitRiseApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitRiseApplicationMutation, SubmitRiseApplicationMutationVariables>(SubmitRiseApplicationDocument, options);
      }
export type SubmitRiseApplicationMutationHookResult = ReturnType<typeof useSubmitRiseApplicationMutation>;
export type SubmitRiseApplicationMutationResult = Apollo.MutationResult<SubmitRiseApplicationMutation>;
export type SubmitRiseApplicationMutationOptions = Apollo.BaseMutationOptions<SubmitRiseApplicationMutation, SubmitRiseApplicationMutationVariables>;