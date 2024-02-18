/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { EventCurrentUserFragmentDoc } from '../fragments/event.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateMultipleEventInvitationMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  userIds: Array<Types.Scalars['ID']> | Types.Scalars['ID'];
}>;


export type CreateMultipleEventInvitationMutation = { __typename?: 'Mutation', createMultipleEventInvitation: Array<{ __typename?: 'CurrentUser', eventId: string, userId: string, userRole?: Types.UserRole | null, invitation?: { __typename?: 'Invitees', _id: string, status?: Types.InvitationStatus | null } | null }> };


export const CreateMultipleEventInvitationDocument = gql`
    mutation createMultipleEventInvitation($id: ID!, $userIds: [ID!]!) {
  createMultipleEventInvitation(_id: $id, userIds: $userIds) {
    ...EventCurrentUser
  }
}
    ${EventCurrentUserFragmentDoc}`;
export type CreateMultipleEventInvitationMutationFn = Apollo.MutationFunction<CreateMultipleEventInvitationMutation, CreateMultipleEventInvitationMutationVariables>;

/**
 * __useCreateMultipleEventInvitationMutation__
 *
 * To run a mutation, you first call `useCreateMultipleEventInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMultipleEventInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMultipleEventInvitationMutation, { data, loading, error }] = useCreateMultipleEventInvitationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      userIds: // value for 'userIds'
 *   },
 * });
 */
export function useCreateMultipleEventInvitationMutation(baseOptions?: Apollo.MutationHookOptions<CreateMultipleEventInvitationMutation, CreateMultipleEventInvitationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMultipleEventInvitationMutation, CreateMultipleEventInvitationMutationVariables>(CreateMultipleEventInvitationDocument, options);
      }
export type CreateMultipleEventInvitationMutationHookResult = ReturnType<typeof useCreateMultipleEventInvitationMutation>;
export type CreateMultipleEventInvitationMutationResult = Apollo.MutationResult<CreateMultipleEventInvitationMutation>;
export type CreateMultipleEventInvitationMutationOptions = Apollo.BaseMutationOptions<CreateMultipleEventInvitationMutation, CreateMultipleEventInvitationMutationVariables>;