/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ExitFromSocialHallMutationVariables = Types.Exact<{
  socialHallId: Types.Scalars['ID'];
  fromLeaveCTA?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type ExitFromSocialHallMutation = { __typename?: 'Mutation', exitFromSocialHall?: { __typename?: 'SocialHallAttendee', _id: string } | null };


export const ExitFromSocialHallDocument = gql`
    mutation exitFromSocialHall($socialHallId: ID!, $fromLeaveCTA: Boolean) {
  exitFromSocialHall(socialHallId: $socialHallId, fromLeaveCTA: $fromLeaveCTA) {
    _id
  }
}
    `;
export type ExitFromSocialHallMutationFn = Apollo.MutationFunction<ExitFromSocialHallMutation, ExitFromSocialHallMutationVariables>;

/**
 * __useExitFromSocialHallMutation__
 *
 * To run a mutation, you first call `useExitFromSocialHallMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExitFromSocialHallMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [exitFromSocialHallMutation, { data, loading, error }] = useExitFromSocialHallMutation({
 *   variables: {
 *      socialHallId: // value for 'socialHallId'
 *      fromLeaveCTA: // value for 'fromLeaveCTA'
 *   },
 * });
 */
export function useExitFromSocialHallMutation(baseOptions?: Apollo.MutationHookOptions<ExitFromSocialHallMutation, ExitFromSocialHallMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ExitFromSocialHallMutation, ExitFromSocialHallMutationVariables>(ExitFromSocialHallDocument, options);
      }
export type ExitFromSocialHallMutationHookResult = ReturnType<typeof useExitFromSocialHallMutation>;
export type ExitFromSocialHallMutationResult = Apollo.MutationResult<ExitFromSocialHallMutation>;
export type ExitFromSocialHallMutationOptions = Apollo.BaseMutationOptions<ExitFromSocialHallMutation, ExitFromSocialHallMutationVariables>;