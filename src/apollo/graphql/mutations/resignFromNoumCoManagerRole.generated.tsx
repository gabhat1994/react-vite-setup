/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ResignFromNoumCoManagerRoleMutationVariables = Types.Exact<{
  input: Types.ResignFromNoumCoManagerRoleInput;
}>;


export type ResignFromNoumCoManagerRoleMutation = { __typename?: 'Mutation', resignFromNoumCoManagerRole: boolean };


export const ResignFromNoumCoManagerRoleDocument = gql`
    mutation resignFromNoumCoManagerRole($input: ResignFromNoumCoManagerRoleInput!) {
  resignFromNoumCoManagerRole(input: $input)
}
    `;
export type ResignFromNoumCoManagerRoleMutationFn = Apollo.MutationFunction<ResignFromNoumCoManagerRoleMutation, ResignFromNoumCoManagerRoleMutationVariables>;

/**
 * __useResignFromNoumCoManagerRoleMutation__
 *
 * To run a mutation, you first call `useResignFromNoumCoManagerRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResignFromNoumCoManagerRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resignFromNoumCoManagerRoleMutation, { data, loading, error }] = useResignFromNoumCoManagerRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResignFromNoumCoManagerRoleMutation(baseOptions?: Apollo.MutationHookOptions<ResignFromNoumCoManagerRoleMutation, ResignFromNoumCoManagerRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResignFromNoumCoManagerRoleMutation, ResignFromNoumCoManagerRoleMutationVariables>(ResignFromNoumCoManagerRoleDocument, options);
      }
export type ResignFromNoumCoManagerRoleMutationHookResult = ReturnType<typeof useResignFromNoumCoManagerRoleMutation>;
export type ResignFromNoumCoManagerRoleMutationResult = Apollo.MutationResult<ResignFromNoumCoManagerRoleMutation>;
export type ResignFromNoumCoManagerRoleMutationOptions = Apollo.BaseMutationOptions<ResignFromNoumCoManagerRoleMutation, ResignFromNoumCoManagerRoleMutationVariables>;