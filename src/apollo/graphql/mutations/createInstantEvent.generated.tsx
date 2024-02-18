/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateInstantEventMutationVariables = Types.Exact<{
  input: Types.CreateInstantEventInput;
}>;


export type CreateInstantEventMutation = { __typename?: 'Mutation', createInstantEvent?: { __typename?: 'Event', _id: string, title: string, status?: Types.EventsStatus | null, chamberId?: { __typename?: 'ChamberByIdRef', _id: string, type?: string | null, name?: string | null, profileImage?: string | null } | null, socialHall?: { __typename?: 'SocialHall', _id: string } | null } | null };


export const CreateInstantEventDocument = gql`
    mutation createInstantEvent($input: CreateInstantEventInput!) {
  createInstantEvent(input: $input) {
    _id
    title
    status
    chamberId {
      _id
      type
      name
      profileImage
    }
    socialHall {
      _id
    }
  }
}
    `;
export type CreateInstantEventMutationFn = Apollo.MutationFunction<CreateInstantEventMutation, CreateInstantEventMutationVariables>;

/**
 * __useCreateInstantEventMutation__
 *
 * To run a mutation, you first call `useCreateInstantEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInstantEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInstantEventMutation, { data, loading, error }] = useCreateInstantEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateInstantEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateInstantEventMutation, CreateInstantEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInstantEventMutation, CreateInstantEventMutationVariables>(CreateInstantEventDocument, options);
      }
export type CreateInstantEventMutationHookResult = ReturnType<typeof useCreateInstantEventMutation>;
export type CreateInstantEventMutationResult = Apollo.MutationResult<CreateInstantEventMutation>;
export type CreateInstantEventMutationOptions = Apollo.BaseMutationOptions<CreateInstantEventMutation, CreateInstantEventMutationVariables>;