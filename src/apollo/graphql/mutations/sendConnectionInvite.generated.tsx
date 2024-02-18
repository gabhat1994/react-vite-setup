/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SendConnectionInviteMutationVariables = Types.Exact<{
  ownSpaceId: Types.Scalars['ID'];
  invitedSpaceId: Types.Scalars['ID'];
  message?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type SendConnectionInviteMutation = { __typename?: 'Mutation', sendConnectionInvite?: { __typename?: 'SpaceConnection', _id?: string | null, requestedAt?: string | null, approvedAt?: string | null, status?: Types.ConnectionRequestTypeEnum | null, permission?: Types.ConnectionPermissionTypeEnum | null, requestTo?: { __typename?: 'SpaceOutput', _id?: string | null } | null, requestFrom?: { __typename?: 'SpaceOutput', _id?: string | null } | null } | null };


export const SendConnectionInviteDocument = gql`
    mutation sendConnectionInvite($ownSpaceId: ID!, $invitedSpaceId: ID!, $message: String) {
  sendConnectionInvite(
    ownSpaceId: $ownSpaceId
    invitedSpaceId: $invitedSpaceId
    message: $message
  ) {
    _id
    requestedAt
    approvedAt
    status
    permission
    requestTo {
      _id
    }
    requestFrom {
      _id
    }
  }
}
    `;
export type SendConnectionInviteMutationFn = Apollo.MutationFunction<SendConnectionInviteMutation, SendConnectionInviteMutationVariables>;

/**
 * __useSendConnectionInviteMutation__
 *
 * To run a mutation, you first call `useSendConnectionInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendConnectionInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendConnectionInviteMutation, { data, loading, error }] = useSendConnectionInviteMutation({
 *   variables: {
 *      ownSpaceId: // value for 'ownSpaceId'
 *      invitedSpaceId: // value for 'invitedSpaceId'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useSendConnectionInviteMutation(baseOptions?: Apollo.MutationHookOptions<SendConnectionInviteMutation, SendConnectionInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendConnectionInviteMutation, SendConnectionInviteMutationVariables>(SendConnectionInviteDocument, options);
      }
export type SendConnectionInviteMutationHookResult = ReturnType<typeof useSendConnectionInviteMutation>;
export type SendConnectionInviteMutationResult = Apollo.MutationResult<SendConnectionInviteMutation>;
export type SendConnectionInviteMutationOptions = Apollo.BaseMutationOptions<SendConnectionInviteMutation, SendConnectionInviteMutationVariables>;