/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateNewCampaignMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.AdCampaignInput>;
}>;


export type CreateNewCampaignMutation = { __typename?: 'Mutation', createAdCampaign?: { __typename?: 'AdCampaignOutput', _id?: string | null, noumId?: { __typename?: 'SpaceOutput', _id?: string | null } | null } | null };


export const CreateNewCampaignDocument = gql`
    mutation createNewCampaign($input: AdCampaignInput) {
  createAdCampaign(input: $input) {
    _id
    noumId {
      _id
    }
  }
}
    `;
export type CreateNewCampaignMutationFn = Apollo.MutationFunction<CreateNewCampaignMutation, CreateNewCampaignMutationVariables>;

/**
 * __useCreateNewCampaignMutation__
 *
 * To run a mutation, you first call `useCreateNewCampaignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewCampaignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewCampaignMutation, { data, loading, error }] = useCreateNewCampaignMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNewCampaignMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewCampaignMutation, CreateNewCampaignMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewCampaignMutation, CreateNewCampaignMutationVariables>(CreateNewCampaignDocument, options);
      }
export type CreateNewCampaignMutationHookResult = ReturnType<typeof useCreateNewCampaignMutation>;
export type CreateNewCampaignMutationResult = Apollo.MutationResult<CreateNewCampaignMutation>;
export type CreateNewCampaignMutationOptions = Apollo.BaseMutationOptions<CreateNewCampaignMutation, CreateNewCampaignMutationVariables>;