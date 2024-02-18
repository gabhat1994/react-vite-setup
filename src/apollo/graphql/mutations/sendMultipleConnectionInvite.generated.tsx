/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SendMultipleConnectionInviteMutationVariables = Types.Exact<{
  ownSpaceId: Types.Scalars['ID'];
  invitedSpaceIds: Array<Types.Scalars['ID']> | Types.Scalars['ID'];
  message?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type SendMultipleConnectionInviteMutation = { __typename?: 'Mutation', sendMultipleConnectionInvite?: Array<{ __typename?: 'SpaceConnection', _id?: string | null, requestedAt?: string | null, approvedAt?: string | null, status?: Types.ConnectionRequestTypeEnum | null, permission?: Types.ConnectionPermissionTypeEnum | null, requestTo?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, projectType?: string | null, permission?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, email?: string | null, title?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null, profilePictureThumbnail?: string | null } | null } | null } | null, requestFrom?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, projectType?: string | null, permission?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, email?: string | null, title?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null, profilePictureThumbnail?: string | null } | null } | null } | null } | null> | null };


export const SendMultipleConnectionInviteDocument = gql`
    mutation sendMultipleConnectionInvite($ownSpaceId: ID!, $invitedSpaceIds: [ID!]!, $message: String) {
  sendMultipleConnectionInvite(
    ownSpaceId: $ownSpaceId
    invitedSpaceIds: $invitedSpaceIds
    message: $message
  ) {
    _id
    requestedAt
    approvedAt
    status
    permission
    status
    requestTo {
      _id
      name
      projectType
      permission
      uid {
        _id
        firstName
        middleName
        lastName
        email
        title
        profile {
          profilePicture
          profilePictureThumbnail
        }
      }
    }
    requestFrom {
      _id
      name
      projectType
      permission
      uid {
        _id
        firstName
        middleName
        lastName
        email
        title
        profile {
          profilePicture
          profilePictureThumbnail
        }
      }
    }
  }
}
    `;
export type SendMultipleConnectionInviteMutationFn = Apollo.MutationFunction<SendMultipleConnectionInviteMutation, SendMultipleConnectionInviteMutationVariables>;

/**
 * __useSendMultipleConnectionInviteMutation__
 *
 * To run a mutation, you first call `useSendMultipleConnectionInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMultipleConnectionInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMultipleConnectionInviteMutation, { data, loading, error }] = useSendMultipleConnectionInviteMutation({
 *   variables: {
 *      ownSpaceId: // value for 'ownSpaceId'
 *      invitedSpaceIds: // value for 'invitedSpaceIds'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useSendMultipleConnectionInviteMutation(baseOptions?: Apollo.MutationHookOptions<SendMultipleConnectionInviteMutation, SendMultipleConnectionInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMultipleConnectionInviteMutation, SendMultipleConnectionInviteMutationVariables>(SendMultipleConnectionInviteDocument, options);
      }
export type SendMultipleConnectionInviteMutationHookResult = ReturnType<typeof useSendMultipleConnectionInviteMutation>;
export type SendMultipleConnectionInviteMutationResult = Apollo.MutationResult<SendMultipleConnectionInviteMutation>;
export type SendMultipleConnectionInviteMutationOptions = Apollo.BaseMutationOptions<SendMultipleConnectionInviteMutation, SendMultipleConnectionInviteMutationVariables>;