/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UnarchiveNoumContactsMutationVariables = Types.Exact<{
  contactIDs: Array<Types.Scalars['ID']> | Types.Scalars['ID'];
}>;


export type UnarchiveNoumContactsMutation = { __typename?: 'Mutation', unarchiveNoumContacts: boolean };


export const UnarchiveNoumContactsDocument = gql`
    mutation unarchiveNoumContacts($contactIDs: [ID!]!) {
  unarchiveNoumContacts(contactIDs: $contactIDs)
}
    `;
export type UnarchiveNoumContactsMutationFn = Apollo.MutationFunction<UnarchiveNoumContactsMutation, UnarchiveNoumContactsMutationVariables>;

/**
 * __useUnarchiveNoumContactsMutation__
 *
 * To run a mutation, you first call `useUnarchiveNoumContactsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnarchiveNoumContactsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unarchiveNoumContactsMutation, { data, loading, error }] = useUnarchiveNoumContactsMutation({
 *   variables: {
 *      contactIDs: // value for 'contactIDs'
 *   },
 * });
 */
export function useUnarchiveNoumContactsMutation(baseOptions?: Apollo.MutationHookOptions<UnarchiveNoumContactsMutation, UnarchiveNoumContactsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnarchiveNoumContactsMutation, UnarchiveNoumContactsMutationVariables>(UnarchiveNoumContactsDocument, options);
      }
export type UnarchiveNoumContactsMutationHookResult = ReturnType<typeof useUnarchiveNoumContactsMutation>;
export type UnarchiveNoumContactsMutationResult = Apollo.MutationResult<UnarchiveNoumContactsMutation>;
export type UnarchiveNoumContactsMutationOptions = Apollo.BaseMutationOptions<UnarchiveNoumContactsMutation, UnarchiveNoumContactsMutationVariables>;