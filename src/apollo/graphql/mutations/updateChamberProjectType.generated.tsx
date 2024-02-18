/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateChamberProjectTypeMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  projectType?: Types.InputMaybe<Types.ProjectChamberType>;
}>;


export type UpdateChamberProjectTypeMutation = { __typename?: 'Mutation', updateProjectChamber?: { __typename?: 'SpaceOutput', _id?: string | null, projectType?: string | null, unSaved?: { __typename?: 'SpaceDraftData', projectType?: Types.ProjectChamberType | null } | null, draft?: { __typename?: 'SpaceDraftData', projectType?: Types.ProjectChamberType | null } | null } | null };


export const UpdateChamberProjectTypeDocument = gql`
    mutation updateChamberProjectType($id: ID!, $projectType: ProjectChamberType) {
  updateProjectChamber(spaceId: $id, input: {projectType: $projectType}) {
    _id
    projectType
    unSaved {
      projectType
    }
    draft {
      projectType
    }
  }
}
    `;
export type UpdateChamberProjectTypeMutationFn = Apollo.MutationFunction<UpdateChamberProjectTypeMutation, UpdateChamberProjectTypeMutationVariables>;

/**
 * __useUpdateChamberProjectTypeMutation__
 *
 * To run a mutation, you first call `useUpdateChamberProjectTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChamberProjectTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChamberProjectTypeMutation, { data, loading, error }] = useUpdateChamberProjectTypeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      projectType: // value for 'projectType'
 *   },
 * });
 */
export function useUpdateChamberProjectTypeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChamberProjectTypeMutation, UpdateChamberProjectTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChamberProjectTypeMutation, UpdateChamberProjectTypeMutationVariables>(UpdateChamberProjectTypeDocument, options);
      }
export type UpdateChamberProjectTypeMutationHookResult = ReturnType<typeof useUpdateChamberProjectTypeMutation>;
export type UpdateChamberProjectTypeMutationResult = Apollo.MutationResult<UpdateChamberProjectTypeMutation>;
export type UpdateChamberProjectTypeMutationOptions = Apollo.BaseMutationOptions<UpdateChamberProjectTypeMutation, UpdateChamberProjectTypeMutationVariables>;