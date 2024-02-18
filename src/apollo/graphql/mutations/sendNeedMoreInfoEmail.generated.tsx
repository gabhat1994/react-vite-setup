/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SendNeedMoreInfoEmailMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type SendNeedMoreInfoEmailMutation = { __typename?: 'Mutation', sendNeedMoreInfoEmail?: boolean | null };


export const SendNeedMoreInfoEmailDocument = gql`
    mutation sendNeedMoreInfoEmail {
  sendNeedMoreInfoEmail
}
    `;
export type SendNeedMoreInfoEmailMutationFn = Apollo.MutationFunction<SendNeedMoreInfoEmailMutation, SendNeedMoreInfoEmailMutationVariables>;

/**
 * __useSendNeedMoreInfoEmailMutation__
 *
 * To run a mutation, you first call `useSendNeedMoreInfoEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendNeedMoreInfoEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendNeedMoreInfoEmailMutation, { data, loading, error }] = useSendNeedMoreInfoEmailMutation({
 *   variables: {
 *   },
 * });
 */
export function useSendNeedMoreInfoEmailMutation(baseOptions?: Apollo.MutationHookOptions<SendNeedMoreInfoEmailMutation, SendNeedMoreInfoEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendNeedMoreInfoEmailMutation, SendNeedMoreInfoEmailMutationVariables>(SendNeedMoreInfoEmailDocument, options);
      }
export type SendNeedMoreInfoEmailMutationHookResult = ReturnType<typeof useSendNeedMoreInfoEmailMutation>;
export type SendNeedMoreInfoEmailMutationResult = Apollo.MutationResult<SendNeedMoreInfoEmailMutation>;
export type SendNeedMoreInfoEmailMutationOptions = Apollo.BaseMutationOptions<SendNeedMoreInfoEmailMutation, SendNeedMoreInfoEmailMutationVariables>;