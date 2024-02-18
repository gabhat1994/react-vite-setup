/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumContactFragmentDoc } from '../fragments/noumContact.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateNoumContactMutationVariables = Types.Exact<{
  input: Types.UpdateNoumContactInput;
}>;


export type UpdateNoumContactMutation = { __typename?: 'Mutation', updateNoumContact: { __typename?: 'NoumContactOutput', createdAt: any, isConnectedWithNoum: boolean, status: Types.NoumContactStatus, title?: string | null, companyName?: string | null, street?: string | null, city?: string | null, country?: string | null, zipCode?: string | null, state?: string | null, apartmentNo?: string | null, _id: string, displayName: string, ownerId: { __typename?: 'UserOutput', _id: string }, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } };


export const UpdateNoumContactDocument = gql`
    mutation UpdateNoumContact($input: UpdateNoumContactInput!) {
  updateNoumContact(input: $input) {
    ...NoumContact
  }
}
    ${NoumContactFragmentDoc}`;
export type UpdateNoumContactMutationFn = Apollo.MutationFunction<UpdateNoumContactMutation, UpdateNoumContactMutationVariables>;

/**
 * __useUpdateNoumContactMutation__
 *
 * To run a mutation, you first call `useUpdateNoumContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNoumContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNoumContactMutation, { data, loading, error }] = useUpdateNoumContactMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateNoumContactMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNoumContactMutation, UpdateNoumContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNoumContactMutation, UpdateNoumContactMutationVariables>(UpdateNoumContactDocument, options);
      }
export type UpdateNoumContactMutationHookResult = ReturnType<typeof useUpdateNoumContactMutation>;
export type UpdateNoumContactMutationResult = Apollo.MutationResult<UpdateNoumContactMutation>;
export type UpdateNoumContactMutationOptions = Apollo.BaseMutationOptions<UpdateNoumContactMutation, UpdateNoumContactMutationVariables>;