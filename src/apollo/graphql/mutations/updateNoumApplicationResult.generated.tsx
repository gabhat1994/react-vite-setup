/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateNoumApplicationResultMutationVariables = Types.Exact<{
  _id: Types.Scalars['ID'];
  input: Types.ApplicationResultInput;
}>;


export type UpdateNoumApplicationResultMutation = { __typename?: 'Mutation', updateNoumApplicationResult?: { __typename?: 'ApplicationResult', _id: string, status?: Types.ApplicationResultStatusAdmin | null, score?: number | null, resultJSON?: any | null, questions?: Array<any | null> | null } | null };


export const UpdateNoumApplicationResultDocument = gql`
    mutation updateNoumApplicationResult($_id: ID!, $input: ApplicationResultInput!) {
  updateNoumApplicationResult(_id: $_id, input: $input) {
    _id
    status
    score
    resultJSON
    questions
  }
}
    `;
export type UpdateNoumApplicationResultMutationFn = Apollo.MutationFunction<UpdateNoumApplicationResultMutation, UpdateNoumApplicationResultMutationVariables>;

/**
 * __useUpdateNoumApplicationResultMutation__
 *
 * To run a mutation, you first call `useUpdateNoumApplicationResultMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNoumApplicationResultMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNoumApplicationResultMutation, { data, loading, error }] = useUpdateNoumApplicationResultMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateNoumApplicationResultMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNoumApplicationResultMutation, UpdateNoumApplicationResultMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNoumApplicationResultMutation, UpdateNoumApplicationResultMutationVariables>(UpdateNoumApplicationResultDocument, options);
      }
export type UpdateNoumApplicationResultMutationHookResult = ReturnType<typeof useUpdateNoumApplicationResultMutation>;
export type UpdateNoumApplicationResultMutationResult = Apollo.MutationResult<UpdateNoumApplicationResultMutation>;
export type UpdateNoumApplicationResultMutationOptions = Apollo.BaseMutationOptions<UpdateNoumApplicationResultMutation, UpdateNoumApplicationResultMutationVariables>;