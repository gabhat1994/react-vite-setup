/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateNoumVisibilitySettingsMutationVariables = Types.Exact<{
  spaceId: Types.Scalars['ID'];
  visibility: Types.ProjectChamberType;
}>;


export type UpdateNoumVisibilitySettingsMutation = { __typename?: 'Mutation', updateNoumVisibilitySettings?: { __typename?: 'SpaceOutput', _id?: string | null, projectType?: string | null } | null };


export const UpdateNoumVisibilitySettingsDocument = gql`
    mutation updateNoumVisibilitySettings($spaceId: ID!, $visibility: ProjectChamberType!) {
  updateNoumVisibilitySettings(spaceId: $spaceId, visibility: $visibility) {
    _id
    projectType
  }
}
    `;
export type UpdateNoumVisibilitySettingsMutationFn = Apollo.MutationFunction<UpdateNoumVisibilitySettingsMutation, UpdateNoumVisibilitySettingsMutationVariables>;

/**
 * __useUpdateNoumVisibilitySettingsMutation__
 *
 * To run a mutation, you first call `useUpdateNoumVisibilitySettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNoumVisibilitySettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNoumVisibilitySettingsMutation, { data, loading, error }] = useUpdateNoumVisibilitySettingsMutation({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      visibility: // value for 'visibility'
 *   },
 * });
 */
export function useUpdateNoumVisibilitySettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNoumVisibilitySettingsMutation, UpdateNoumVisibilitySettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNoumVisibilitySettingsMutation, UpdateNoumVisibilitySettingsMutationVariables>(UpdateNoumVisibilitySettingsDocument, options);
      }
export type UpdateNoumVisibilitySettingsMutationHookResult = ReturnType<typeof useUpdateNoumVisibilitySettingsMutation>;
export type UpdateNoumVisibilitySettingsMutationResult = Apollo.MutationResult<UpdateNoumVisibilitySettingsMutation>;
export type UpdateNoumVisibilitySettingsMutationOptions = Apollo.BaseMutationOptions<UpdateNoumVisibilitySettingsMutation, UpdateNoumVisibilitySettingsMutationVariables>;