/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumLayoutSectionFragmentDoc } from '../fragments/noumLayoutSection.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DuplicateNoumLayoutSectionMutationVariables = Types.Exact<{
  sectionId: Types.Scalars['ID'];
}>;


export type DuplicateNoumLayoutSectionMutation = { __typename?: 'Mutation', duplicateNoumLayoutSection: { __typename?: 'NoumLayoutSection', _id: string, type: Types.NoumLayoutSectionType, position: number, columnsVerticalAlignType: Types.NoumLayoutSectionVerticalAlignType, background: boolean, visible: boolean, columns: Array<{ __typename?: 'NoumLayoutColumn', _id: string, background: boolean, position: number, tools: Array<{ __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null, position?: number | null, status?: string | null, bodyContentType?: Types.BodyContentEnum | null, bodyContent?: string | null, headerContent?: string | null, tempStatus?: Types.ElementStatusEnum | null, viewOnly?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null, isCustomPreviewAdditionalInfo?: boolean | null, draft?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null, unSaved?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null }> }> } };


export const DuplicateNoumLayoutSectionDocument = gql`
    mutation duplicateNoumLayoutSection($sectionId: ID!) {
  duplicateNoumLayoutSection(sectionId: $sectionId) {
    ...NoumLayoutSection
  }
}
    ${NoumLayoutSectionFragmentDoc}`;
export type DuplicateNoumLayoutSectionMutationFn = Apollo.MutationFunction<DuplicateNoumLayoutSectionMutation, DuplicateNoumLayoutSectionMutationVariables>;

/**
 * __useDuplicateNoumLayoutSectionMutation__
 *
 * To run a mutation, you first call `useDuplicateNoumLayoutSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDuplicateNoumLayoutSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [duplicateNoumLayoutSectionMutation, { data, loading, error }] = useDuplicateNoumLayoutSectionMutation({
 *   variables: {
 *      sectionId: // value for 'sectionId'
 *   },
 * });
 */
export function useDuplicateNoumLayoutSectionMutation(baseOptions?: Apollo.MutationHookOptions<DuplicateNoumLayoutSectionMutation, DuplicateNoumLayoutSectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DuplicateNoumLayoutSectionMutation, DuplicateNoumLayoutSectionMutationVariables>(DuplicateNoumLayoutSectionDocument, options);
      }
export type DuplicateNoumLayoutSectionMutationHookResult = ReturnType<typeof useDuplicateNoumLayoutSectionMutation>;
export type DuplicateNoumLayoutSectionMutationResult = Apollo.MutationResult<DuplicateNoumLayoutSectionMutation>;
export type DuplicateNoumLayoutSectionMutationOptions = Apollo.BaseMutationOptions<DuplicateNoumLayoutSectionMutation, DuplicateNoumLayoutSectionMutationVariables>;