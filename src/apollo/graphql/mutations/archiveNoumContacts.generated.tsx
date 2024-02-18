/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ArchiveNoumContactsMutationVariables = Types.Exact<{
  contactIDs: Array<Types.Scalars['ID']> | Types.Scalars['ID'];
}>;


export type ArchiveNoumContactsMutation = { __typename?: 'Mutation', archiveNoumContacts: boolean };


export const ArchiveNoumContactsDocument = gql`
    mutation archiveNoumContacts($contactIDs: [ID!]!) {
  archiveNoumContacts(contactIDs: $contactIDs)
}
    `;
export type ArchiveNoumContactsMutationFn = Apollo.MutationFunction<ArchiveNoumContactsMutation, ArchiveNoumContactsMutationVariables>;

/**
 * __useArchiveNoumContactsMutation__
 *
 * To run a mutation, you first call `useArchiveNoumContactsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveNoumContactsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveNoumContactsMutation, { data, loading, error }] = useArchiveNoumContactsMutation({
 *   variables: {
 *      contactIDs: // value for 'contactIDs'
 *   },
 * });
 */
export function useArchiveNoumContactsMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveNoumContactsMutation, ArchiveNoumContactsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveNoumContactsMutation, ArchiveNoumContactsMutationVariables>(ArchiveNoumContactsDocument, options);
      }
export type ArchiveNoumContactsMutationHookResult = ReturnType<typeof useArchiveNoumContactsMutation>;
export type ArchiveNoumContactsMutationResult = Apollo.MutationResult<ArchiveNoumContactsMutation>;
export type ArchiveNoumContactsMutationOptions = Apollo.BaseMutationOptions<ArchiveNoumContactsMutation, ArchiveNoumContactsMutationVariables>;