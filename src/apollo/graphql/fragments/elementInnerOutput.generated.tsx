/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type ElementInnerOutputFragment = { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null };

export const ElementInnerOutputFragmentDoc = gql`
    fragment ElementInnerOutput on ElementInnerOutput {
  bodyContent
  headerContent
  position
  isDeleted
  bodyContentJson
  percentCompleted
  customPreviewPosition
  isCustomPreviewVisible
  meta
}
    `;