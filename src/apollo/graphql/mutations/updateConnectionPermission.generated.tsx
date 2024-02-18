/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateConnectionPermissionMutationVariables = Types.Exact<{
  input: Types.ConnectionPermissionInput;
}>;


export type UpdateConnectionPermissionMutation = { __typename?: 'Mutation', updateConnectionPermission?: Array<{ __typename?: 'SpaceConnection', _id?: string | null, status?: Types.ConnectionRequestTypeEnum | null, requestedAt?: string | null, permission?: Types.ConnectionPermissionTypeEnum | null, draft?: { __typename?: 'SpaceConnectionDraft', permission?: Types.ConnectionPermissionTypeEnum | null } | null, requestTo?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null } | null, requestFrom?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null } | null } | null> | null };


export const UpdateConnectionPermissionDocument = gql`
    mutation updateConnectionPermission($input: ConnectionPermissionInput!) {
  updateConnectionPermission(input: $input) {
    _id
    status
    requestedAt
    permission
    draft {
      permission
    }
    requestTo {
      _id
      name
    }
    requestFrom {
      _id
      name
    }
  }
}
    `;
export type UpdateConnectionPermissionMutationFn = Apollo.MutationFunction<UpdateConnectionPermissionMutation, UpdateConnectionPermissionMutationVariables>;

/**
 * __useUpdateConnectionPermissionMutation__
 *
 * To run a mutation, you first call `useUpdateConnectionPermissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateConnectionPermissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateConnectionPermissionMutation, { data, loading, error }] = useUpdateConnectionPermissionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateConnectionPermissionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateConnectionPermissionMutation, UpdateConnectionPermissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateConnectionPermissionMutation, UpdateConnectionPermissionMutationVariables>(UpdateConnectionPermissionDocument, options);
      }
export type UpdateConnectionPermissionMutationHookResult = ReturnType<typeof useUpdateConnectionPermissionMutation>;
export type UpdateConnectionPermissionMutationResult = Apollo.MutationResult<UpdateConnectionPermissionMutation>;
export type UpdateConnectionPermissionMutationOptions = Apollo.BaseMutationOptions<UpdateConnectionPermissionMutation, UpdateConnectionPermissionMutationVariables>;