/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ApplyForRiseApplicationMutationVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
}>;


export type ApplyForRiseApplicationMutation = { __typename?: 'Mutation', applyForRiseApplication?: { __typename?: 'RiseApplication', alredayCreated?: boolean | null, data?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null } | null } | null };


export const ApplyForRiseApplicationDocument = gql`
    mutation applyForRiseApplication($noumId: ID!) {
  applyForRiseApplication(noumId: $noumId) {
    data {
      _id
      name
    }
    alredayCreated
  }
}
    `;
export type ApplyForRiseApplicationMutationFn = Apollo.MutationFunction<ApplyForRiseApplicationMutation, ApplyForRiseApplicationMutationVariables>;

/**
 * __useApplyForRiseApplicationMutation__
 *
 * To run a mutation, you first call `useApplyForRiseApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApplyForRiseApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [applyForRiseApplicationMutation, { data, loading, error }] = useApplyForRiseApplicationMutation({
 *   variables: {
 *      noumId: // value for 'noumId'
 *   },
 * });
 */
export function useApplyForRiseApplicationMutation(baseOptions?: Apollo.MutationHookOptions<ApplyForRiseApplicationMutation, ApplyForRiseApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApplyForRiseApplicationMutation, ApplyForRiseApplicationMutationVariables>(ApplyForRiseApplicationDocument, options);
      }
export type ApplyForRiseApplicationMutationHookResult = ReturnType<typeof useApplyForRiseApplicationMutation>;
export type ApplyForRiseApplicationMutationResult = Apollo.MutationResult<ApplyForRiseApplicationMutation>;
export type ApplyForRiseApplicationMutationOptions = Apollo.BaseMutationOptions<ApplyForRiseApplicationMutation, ApplyForRiseApplicationMutationVariables>;