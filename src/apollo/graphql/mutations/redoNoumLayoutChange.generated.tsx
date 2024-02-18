/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumLayoutFragmentDoc } from '../fragments/noumLayout.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RedoNoumLayoutChangeMutationVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
}>;


export type RedoNoumLayoutChangeMutation = { __typename?: 'Mutation', redoNoumLayoutChange: { __typename?: 'NoumLayout', _id: string, status: Types.NoumLayoutStatus, hasUndoAction: boolean, hasRedoAction: boolean, sections: Array<{ __typename?: 'NoumLayoutSection', _id: string, type: Types.NoumLayoutSectionType, position: number, columnsVerticalAlignType: Types.NoumLayoutSectionVerticalAlignType, background: boolean, visible: boolean, columns: Array<{ __typename?: 'NoumLayoutColumn', _id: string, background: boolean, position: number, tools: Array<{ __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null, position?: number | null, status?: string | null, bodyContentType?: Types.BodyContentEnum | null, bodyContent?: string | null, headerContent?: string | null, tempStatus?: Types.ElementStatusEnum | null, viewOnly?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null, isCustomPreviewAdditionalInfo?: boolean | null, draft?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null, unSaved?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null }> }> }>, uniqueToolStatuses: Array<{ __typename?: 'UniqueToolStatus', toolType: Types.ElementTypeEnum, isAlreadyUsed: boolean }> } };


export const RedoNoumLayoutChangeDocument = gql`
    mutation redoNoumLayoutChange($noumId: ID!) {
  redoNoumLayoutChange(noumId: $noumId) {
    ...NoumLayout
  }
}
    ${NoumLayoutFragmentDoc}`;
export type RedoNoumLayoutChangeMutationFn = Apollo.MutationFunction<RedoNoumLayoutChangeMutation, RedoNoumLayoutChangeMutationVariables>;

/**
 * __useRedoNoumLayoutChangeMutation__
 *
 * To run a mutation, you first call `useRedoNoumLayoutChangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRedoNoumLayoutChangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [redoNoumLayoutChangeMutation, { data, loading, error }] = useRedoNoumLayoutChangeMutation({
 *   variables: {
 *      noumId: // value for 'noumId'
 *   },
 * });
 */
export function useRedoNoumLayoutChangeMutation(baseOptions?: Apollo.MutationHookOptions<RedoNoumLayoutChangeMutation, RedoNoumLayoutChangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RedoNoumLayoutChangeMutation, RedoNoumLayoutChangeMutationVariables>(RedoNoumLayoutChangeDocument, options);
      }
export type RedoNoumLayoutChangeMutationHookResult = ReturnType<typeof useRedoNoumLayoutChangeMutation>;
export type RedoNoumLayoutChangeMutationResult = Apollo.MutationResult<RedoNoumLayoutChangeMutation>;
export type RedoNoumLayoutChangeMutationOptions = Apollo.BaseMutationOptions<RedoNoumLayoutChangeMutation, RedoNoumLayoutChangeMutationVariables>;