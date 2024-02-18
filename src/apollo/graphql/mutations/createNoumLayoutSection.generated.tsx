/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumLayoutSectionFragmentDoc } from '../fragments/noumLayoutSection.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateNoumLayoutSectionMutationVariables = Types.Exact<{
  input: Types.CreateNoumLayoutSectionInput;
}>;


export type CreateNoumLayoutSectionMutation = { __typename?: 'Mutation', createNoumLayoutSection: { __typename?: 'NoumLayoutSection', _id: string, type: Types.NoumLayoutSectionType, position: number, columnsVerticalAlignType: Types.NoumLayoutSectionVerticalAlignType, background: boolean, visible: boolean, columns: Array<{ __typename?: 'NoumLayoutColumn', _id: string, background: boolean, position: number, tools: Array<{ __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null, position?: number | null, status?: string | null, bodyContentType?: Types.BodyContentEnum | null, bodyContent?: string | null, headerContent?: string | null, tempStatus?: Types.ElementStatusEnum | null, viewOnly?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null, isCustomPreviewAdditionalInfo?: boolean | null, draft?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null, unSaved?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null }> }> } };


export const CreateNoumLayoutSectionDocument = gql`
    mutation createNoumLayoutSection($input: CreateNoumLayoutSectionInput!) {
  createNoumLayoutSection(input: $input) {
    ...NoumLayoutSection
  }
}
    ${NoumLayoutSectionFragmentDoc}`;
export type CreateNoumLayoutSectionMutationFn = Apollo.MutationFunction<CreateNoumLayoutSectionMutation, CreateNoumLayoutSectionMutationVariables>;

/**
 * __useCreateNoumLayoutSectionMutation__
 *
 * To run a mutation, you first call `useCreateNoumLayoutSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNoumLayoutSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNoumLayoutSectionMutation, { data, loading, error }] = useCreateNoumLayoutSectionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNoumLayoutSectionMutation(baseOptions?: Apollo.MutationHookOptions<CreateNoumLayoutSectionMutation, CreateNoumLayoutSectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNoumLayoutSectionMutation, CreateNoumLayoutSectionMutationVariables>(CreateNoumLayoutSectionDocument, options);
      }
export type CreateNoumLayoutSectionMutationHookResult = ReturnType<typeof useCreateNoumLayoutSectionMutation>;
export type CreateNoumLayoutSectionMutationResult = Apollo.MutationResult<CreateNoumLayoutSectionMutation>;
export type CreateNoumLayoutSectionMutationOptions = Apollo.BaseMutationOptions<CreateNoumLayoutSectionMutation, CreateNoumLayoutSectionMutationVariables>;