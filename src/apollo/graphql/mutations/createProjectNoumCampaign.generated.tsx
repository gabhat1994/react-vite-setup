/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateProjectNoumCampaignMutationVariables = Types.Exact<{
  spaceId: Types.Scalars['ID'];
  targets: Array<Types.CampaignAudienceTarget> | Types.CampaignAudienceTarget;
}>;


export type CreateProjectNoumCampaignMutation = { __typename?: 'Mutation', createProjectNoumCampaign?: { __typename?: 'ProjectNoumCampaign', _id?: string | null, targets?: Array<Types.CampaignAudienceTarget | null> | null, startedAt?: any | null, refreshedAt?: any | null, finishedAt?: any | null, uid?: { __typename?: 'UserOutput', _id: string } | null, space?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null } | null } | null };


export const CreateProjectNoumCampaignDocument = gql`
    mutation createProjectNoumCampaign($spaceId: ID!, $targets: [CampaignAudienceTarget!]!) {
  createProjectNoumCampaign(spaceId: $spaceId, targets: $targets) {
    _id
    uid {
      _id
    }
    space {
      _id
      name
    }
    targets
    startedAt
    refreshedAt
    finishedAt
  }
}
    `;
export type CreateProjectNoumCampaignMutationFn = Apollo.MutationFunction<CreateProjectNoumCampaignMutation, CreateProjectNoumCampaignMutationVariables>;

/**
 * __useCreateProjectNoumCampaignMutation__
 *
 * To run a mutation, you first call `useCreateProjectNoumCampaignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectNoumCampaignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectNoumCampaignMutation, { data, loading, error }] = useCreateProjectNoumCampaignMutation({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      targets: // value for 'targets'
 *   },
 * });
 */
export function useCreateProjectNoumCampaignMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectNoumCampaignMutation, CreateProjectNoumCampaignMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectNoumCampaignMutation, CreateProjectNoumCampaignMutationVariables>(CreateProjectNoumCampaignDocument, options);
      }
export type CreateProjectNoumCampaignMutationHookResult = ReturnType<typeof useCreateProjectNoumCampaignMutation>;
export type CreateProjectNoumCampaignMutationResult = Apollo.MutationResult<CreateProjectNoumCampaignMutation>;
export type CreateProjectNoumCampaignMutationOptions = Apollo.BaseMutationOptions<CreateProjectNoumCampaignMutation, CreateProjectNoumCampaignMutationVariables>;