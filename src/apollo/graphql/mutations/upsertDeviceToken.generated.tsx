/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpsertDeviceTokenMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.DeviceToken>;
}>;


export type UpsertDeviceTokenMutation = { __typename?: 'Mutation', upsertDeviceToken?: Array<{ __typename?: 'DeviceTokenOutput', isActive?: boolean | null, token?: string | null } | null> | null };


export const UpsertDeviceTokenDocument = gql`
    mutation upsertDeviceToken($input: DeviceToken) {
  upsertDeviceToken(input: $input) {
    isActive
    token
  }
}
    `;
export type UpsertDeviceTokenMutationFn = Apollo.MutationFunction<UpsertDeviceTokenMutation, UpsertDeviceTokenMutationVariables>;

/**
 * __useUpsertDeviceTokenMutation__
 *
 * To run a mutation, you first call `useUpsertDeviceTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertDeviceTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertDeviceTokenMutation, { data, loading, error }] = useUpsertDeviceTokenMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertDeviceTokenMutation(baseOptions?: Apollo.MutationHookOptions<UpsertDeviceTokenMutation, UpsertDeviceTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertDeviceTokenMutation, UpsertDeviceTokenMutationVariables>(UpsertDeviceTokenDocument, options);
      }
export type UpsertDeviceTokenMutationHookResult = ReturnType<typeof useUpsertDeviceTokenMutation>;
export type UpsertDeviceTokenMutationResult = Apollo.MutationResult<UpsertDeviceTokenMutation>;
export type UpsertDeviceTokenMutationOptions = Apollo.BaseMutationOptions<UpsertDeviceTokenMutation, UpsertDeviceTokenMutationVariables>;