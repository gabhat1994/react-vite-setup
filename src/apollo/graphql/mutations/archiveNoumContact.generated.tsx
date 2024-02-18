/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ArchiveNoumContactMutationVariables = Types.Exact<{
  contactId: Types.Scalars['ID'];
}>;


export type ArchiveNoumContactMutation = { __typename?: 'Mutation', archiveNoumContact: boolean };


export const ArchiveNoumContactDocument = gql`
    mutation archiveNoumContact($contactId: ID!) {
  archiveNoumContact(contactId: $contactId)
}
    `;
export type ArchiveNoumContactMutationFn = Apollo.MutationFunction<ArchiveNoumContactMutation, ArchiveNoumContactMutationVariables>;

/**
 * __useArchiveNoumContactMutation__
 *
 * To run a mutation, you first call `useArchiveNoumContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveNoumContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveNoumContactMutation, { data, loading, error }] = useArchiveNoumContactMutation({
 *   variables: {
 *      contactId: // value for 'contactId'
 *   },
 * });
 */
export function useArchiveNoumContactMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveNoumContactMutation, ArchiveNoumContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveNoumContactMutation, ArchiveNoumContactMutationVariables>(ArchiveNoumContactDocument, options);
      }
export type ArchiveNoumContactMutationHookResult = ReturnType<typeof useArchiveNoumContactMutation>;
export type ArchiveNoumContactMutationResult = Apollo.MutationResult<ArchiveNoumContactMutation>;
export type ArchiveNoumContactMutationOptions = Apollo.BaseMutationOptions<ArchiveNoumContactMutation, ArchiveNoumContactMutationVariables>;