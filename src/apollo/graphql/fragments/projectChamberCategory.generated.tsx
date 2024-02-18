/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type ProjectChamberCategoryFragment = { __typename?: 'ProjectChamberCategory', _id: string, name: string };

export const ProjectChamberCategoryFragmentDoc = gql`
    fragment ProjectChamberCategory on ProjectChamberCategory {
  _id
  name
}
    `;