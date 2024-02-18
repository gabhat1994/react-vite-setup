/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumLayoutFragmentDoc } from '../fragments/noumLayout.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UndoNoumLayoutChangeMutationVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
}>;


export type UndoNoumLayoutChangeMutation = { __typename?: 'Mutation', undoNoumLayoutChange: { __typename?: 'NoumLayout', _id: string, status: Types.NoumLayoutStatus, hasUndoAction: boolean, hasRedoAction: boolean, sections: Array<{ __typename?: 'NoumLayoutSection', _id: string, type: Types.NoumLayoutSectionType, position: number, columnsVerticalAlignType: Types.NoumLayoutSectionVerticalAlignType, background: boolean, visible: boolean, columns: Array<{ __typename?: 'NoumLayoutColumn', _id: string, background: boolean, position: number, tools: Array<{ __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null, position?: number | null, status?: string | null, bodyContentType?: Types.BodyContentEnum | null, bodyContent?: string | null, headerContent?: string | null, tempStatus?: Types.ElementStatusEnum | null, viewOnly?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null, isCustomPreviewAdditionalInfo?: boolean | null, draft?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null, unSaved?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null }> }> }>, uniqueToolStatuses: Array<{ __typename?: 'UniqueToolStatus', toolType: Types.ElementTypeEnum, isAlreadyUsed: boolean }> } };


export const UndoNoumLayoutChangeDocument = gql`
    mutation undoNoumLayoutChange($noumId: ID!) {
  undoNoumLayoutChange(noumId: $noumId) {
    ...NoumLayout
  }
}
    ${NoumLayoutFragmentDoc}`;
export type UndoNoumLayoutChangeMutationFn = Apollo.MutationFunction<UndoNoumLayoutChangeMutation, UndoNoumLayoutChangeMutationVariables>;

/**
 * __useUndoNoumLayoutChangeMutation__
 *
 * To run a mutation, you first call `useUndoNoumLayoutChangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUndoNoumLayoutChangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [undoNoumLayoutChangeMutation, { data, loading, error }] = useUndoNoumLayoutChangeMutation({
 *   variables: {
 *      noumId: // value for 'noumId'
 *   },
 * });
 */
export function useUndoNoumLayoutChangeMutation(baseOptions?: Apollo.MutationHookOptions<UndoNoumLayoutChangeMutation, UndoNoumLayoutChangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UndoNoumLayoutChangeMutation, UndoNoumLayoutChangeMutationVariables>(UndoNoumLayoutChangeDocument, options);
      }
export type UndoNoumLayoutChangeMutationHookResult = ReturnType<typeof useUndoNoumLayoutChangeMutation>;
export type UndoNoumLayoutChangeMutationResult = Apollo.MutationResult<UndoNoumLayoutChangeMutation>;
export type UndoNoumLayoutChangeMutationOptions = Apollo.BaseMutationOptions<UndoNoumLayoutChangeMutation, UndoNoumLayoutChangeMutationVariables>;