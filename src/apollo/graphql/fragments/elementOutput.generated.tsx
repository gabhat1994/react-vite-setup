/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ElementInnerOutputFragmentDoc } from './elementInnerOutput.generated';
export type ElementOutputFragment = { __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null, position?: number | null, status?: string | null, bodyContentType?: Types.BodyContentEnum | null, bodyContent?: string | null, headerContent?: string | null, tempStatus?: Types.ElementStatusEnum | null, viewOnly?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null, isCustomPreviewAdditionalInfo?: boolean | null, draft?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null, unSaved?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null };

export const ElementOutputFragmentDoc = gql`
    fragment ElementOutput on ElementOutput {
  _id
  elementType
  position
  status
  bodyContentType
  bodyContent
  headerContent
  draft {
    ...ElementInnerOutput
  }
  unSaved {
    ...ElementInnerOutput
  }
  tempStatus
  viewOnly
  bodyContentJson
  percentCompleted
  customPreviewPosition
  isCustomPreviewVisible
  meta
  isCustomPreviewAdditionalInfo
}
    ${ElementInnerOutputFragmentDoc}`;