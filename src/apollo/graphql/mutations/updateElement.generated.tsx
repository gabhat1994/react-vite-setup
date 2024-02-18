/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumWithLayoutFragmentDoc } from '../fragments/spaceOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateElementMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  input?: Types.InputMaybe<Array<Types.ElementInput> | Types.ElementInput>;
  editorV2Enabled: Types.Scalars['Boolean'];
  status?: Types.InputMaybe<Types.NoumLayoutStatusFilter>;
}>;


export type UpdateElementMutation = { __typename?: 'Mutation', updateElement?: { __typename?: 'SpaceOutput', _id?: string | null, lastCustomPreviewSavedTime?: any | null, layout?: { __typename?: 'NoumLayout', _id: string, status: Types.NoumLayoutStatus, hasUndoAction: boolean, hasRedoAction: boolean, sections: Array<{ __typename?: 'NoumLayoutSection', _id: string, type: Types.NoumLayoutSectionType, position: number, columnsVerticalAlignType: Types.NoumLayoutSectionVerticalAlignType, background: boolean, visible: boolean, columns: Array<{ __typename?: 'NoumLayoutColumn', _id: string, background: boolean, position: number, tools: Array<{ __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null, position?: number | null, status?: string | null, bodyContentType?: Types.BodyContentEnum | null, bodyContent?: string | null, headerContent?: string | null, tempStatus?: Types.ElementStatusEnum | null, viewOnly?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null, isCustomPreviewAdditionalInfo?: boolean | null, draft?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null, unSaved?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null }> }> }>, uniqueToolStatuses: Array<{ __typename?: 'UniqueToolStatus', toolType: Types.ElementTypeEnum, isAlreadyUsed: boolean }> } | null, elements?: Array<{ __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null, position?: number | null, status?: string | null, bodyContentType?: Types.BodyContentEnum | null, bodyContent?: string | null, headerContent?: string | null, tempStatus?: Types.ElementStatusEnum | null, viewOnly?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null, isCustomPreviewAdditionalInfo?: boolean | null, draft?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null, unSaved?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null } | null> | null } | null };


export const UpdateElementDocument = gql`
    mutation updateElement($id: ID!, $input: [ElementInput!], $editorV2Enabled: Boolean!, $status: NoumLayoutStatusFilter = UNPUBLISHED) {
  updateElement(id: $id, input: $input) {
    _id
    ...NoumWithLayout
  }
}
    ${NoumWithLayoutFragmentDoc}`;
export type UpdateElementMutationFn = Apollo.MutationFunction<UpdateElementMutation, UpdateElementMutationVariables>;

/**
 * __useUpdateElementMutation__
 *
 * To run a mutation, you first call `useUpdateElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateElementMutation, { data, loading, error }] = useUpdateElementMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *      editorV2Enabled: // value for 'editorV2Enabled'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateElementMutation(baseOptions?: Apollo.MutationHookOptions<UpdateElementMutation, UpdateElementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateElementMutation, UpdateElementMutationVariables>(UpdateElementDocument, options);
      }
export type UpdateElementMutationHookResult = ReturnType<typeof useUpdateElementMutation>;
export type UpdateElementMutationResult = Apollo.MutationResult<UpdateElementMutation>;
export type UpdateElementMutationOptions = Apollo.BaseMutationOptions<UpdateElementMutation, UpdateElementMutationVariables>;