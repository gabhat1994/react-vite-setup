/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ElementOutputFragmentDoc } from '../fragments/elementOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateNoumLayoutSectionMutationVariables = Types.Exact<{
  input: Types.UpdateNoumLayoutSectionInput;
}>;


export type UpdateNoumLayoutSectionMutation = { __typename?: 'Mutation', updateNoumLayoutSection: { __typename?: 'NoumLayoutSection', _id: string, type: Types.NoumLayoutSectionType, columnsVerticalAlignType: Types.NoumLayoutSectionVerticalAlignType, position: number, background: boolean, columns: Array<{ __typename?: 'NoumLayoutColumn', _id: string, background: boolean, position: number, tools: Array<{ __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null, position?: number | null, status?: string | null, bodyContentType?: Types.BodyContentEnum | null, bodyContent?: string | null, headerContent?: string | null, tempStatus?: Types.ElementStatusEnum | null, viewOnly?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null, isCustomPreviewAdditionalInfo?: boolean | null, draft?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null, unSaved?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null }> }> } };


export const UpdateNoumLayoutSectionDocument = gql`
    mutation updateNoumLayoutSection($input: UpdateNoumLayoutSectionInput!) {
  updateNoumLayoutSection(input: $input) {
    _id
    type
    columnsVerticalAlignType
    position
    background
    columns {
      _id
      background
      position
      tools {
        ...ElementOutput
      }
    }
  }
}
    ${ElementOutputFragmentDoc}`;
export type UpdateNoumLayoutSectionMutationFn = Apollo.MutationFunction<UpdateNoumLayoutSectionMutation, UpdateNoumLayoutSectionMutationVariables>;

/**
 * __useUpdateNoumLayoutSectionMutation__
 *
 * To run a mutation, you first call `useUpdateNoumLayoutSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNoumLayoutSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNoumLayoutSectionMutation, { data, loading, error }] = useUpdateNoumLayoutSectionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateNoumLayoutSectionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNoumLayoutSectionMutation, UpdateNoumLayoutSectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNoumLayoutSectionMutation, UpdateNoumLayoutSectionMutationVariables>(UpdateNoumLayoutSectionDocument, options);
      }
export type UpdateNoumLayoutSectionMutationHookResult = ReturnType<typeof useUpdateNoumLayoutSectionMutation>;
export type UpdateNoumLayoutSectionMutationResult = Apollo.MutationResult<UpdateNoumLayoutSectionMutation>;
export type UpdateNoumLayoutSectionMutationOptions = Apollo.BaseMutationOptions<UpdateNoumLayoutSectionMutation, UpdateNoumLayoutSectionMutationVariables>;