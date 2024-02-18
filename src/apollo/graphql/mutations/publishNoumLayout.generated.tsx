/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PublishNoumLayoutMutationVariables = Types.Exact<{
  ID: Types.Scalars['ID'];
}>;


export type PublishNoumLayoutMutation = { __typename?: 'Mutation', publishNoumLayout: boolean };


export const PublishNoumLayoutDocument = gql`
    mutation publishNoumLayout($ID: ID!) {
  publishNoumLayout(noumId: $ID)
}
    `;
export type PublishNoumLayoutMutationFn = Apollo.MutationFunction<PublishNoumLayoutMutation, PublishNoumLayoutMutationVariables>;

/**
 * __usePublishNoumLayoutMutation__
 *
 * To run a mutation, you first call `usePublishNoumLayoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishNoumLayoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishNoumLayoutMutation, { data, loading, error }] = usePublishNoumLayoutMutation({
 *   variables: {
 *      ID: // value for 'ID'
 *   },
 * });
 */
export function usePublishNoumLayoutMutation(baseOptions?: Apollo.MutationHookOptions<PublishNoumLayoutMutation, PublishNoumLayoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishNoumLayoutMutation, PublishNoumLayoutMutationVariables>(PublishNoumLayoutDocument, options);
      }
export type PublishNoumLayoutMutationHookResult = ReturnType<typeof usePublishNoumLayoutMutation>;
export type PublishNoumLayoutMutationResult = Apollo.MutationResult<PublishNoumLayoutMutation>;
export type PublishNoumLayoutMutationOptions = Apollo.BaseMutationOptions<PublishNoumLayoutMutation, PublishNoumLayoutMutationVariables>;