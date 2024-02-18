/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumContactFragmentDoc } from '../fragments/noumContact.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddNewNoumContactMutationVariables = Types.Exact<{
  input: Types.AddNewNoumContactInput;
}>;


export type AddNewNoumContactMutation = { __typename?: 'Mutation', addNewNoumContact: { __typename?: 'NoumContactOutput', createdAt: any, isConnectedWithNoum: boolean, status: Types.NoumContactStatus, title?: string | null, companyName?: string | null, street?: string | null, city?: string | null, country?: string | null, zipCode?: string | null, state?: string | null, apartmentNo?: string | null, _id: string, displayName: string, ownerId: { __typename?: 'UserOutput', _id: string }, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } };


export const AddNewNoumContactDocument = gql`
    mutation AddNewNoumContact($input: AddNewNoumContactInput!) {
  addNewNoumContact(input: $input) {
    ...NoumContact
  }
}
    ${NoumContactFragmentDoc}`;
export type AddNewNoumContactMutationFn = Apollo.MutationFunction<AddNewNoumContactMutation, AddNewNoumContactMutationVariables>;

/**
 * __useAddNewNoumContactMutation__
 *
 * To run a mutation, you first call `useAddNewNoumContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNewNoumContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNewNoumContactMutation, { data, loading, error }] = useAddNewNoumContactMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddNewNoumContactMutation(baseOptions?: Apollo.MutationHookOptions<AddNewNoumContactMutation, AddNewNoumContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddNewNoumContactMutation, AddNewNoumContactMutationVariables>(AddNewNoumContactDocument, options);
      }
export type AddNewNoumContactMutationHookResult = ReturnType<typeof useAddNewNoumContactMutation>;
export type AddNewNoumContactMutationResult = Apollo.MutationResult<AddNewNoumContactMutation>;
export type AddNewNoumContactMutationOptions = Apollo.BaseMutationOptions<AddNewNoumContactMutation, AddNewNoumContactMutationVariables>;