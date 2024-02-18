/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumLayoutSectionFragmentDoc } from './noumLayoutSection.generated';
export type NoumLayoutFragment = { __typename?: 'NoumLayout', _id: string, status: Types.NoumLayoutStatus, hasUndoAction: boolean, hasRedoAction: boolean, sections: Array<{ __typename?: 'NoumLayoutSection', _id: string, type: Types.NoumLayoutSectionType, position: number, columnsVerticalAlignType: Types.NoumLayoutSectionVerticalAlignType, background: boolean, visible: boolean, columns: Array<{ __typename?: 'NoumLayoutColumn', _id: string, background: boolean, position: number, tools: Array<{ __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null, position?: number | null, status?: string | null, bodyContentType?: Types.BodyContentEnum | null, bodyContent?: string | null, headerContent?: string | null, tempStatus?: Types.ElementStatusEnum | null, viewOnly?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null, isCustomPreviewAdditionalInfo?: boolean | null, draft?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null, unSaved?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null }> }> }>, uniqueToolStatuses: Array<{ __typename?: 'UniqueToolStatus', toolType: Types.ElementTypeEnum, isAlreadyUsed: boolean }> };

export const NoumLayoutFragmentDoc = gql`
    fragment NoumLayout on NoumLayout {
  _id
  status
  sections {
    ...NoumLayoutSection
  }
  uniqueToolStatuses {
    toolType
    isAlreadyUsed
  }
  hasUndoAction
  hasRedoAction
}
    ${NoumLayoutSectionFragmentDoc}`;