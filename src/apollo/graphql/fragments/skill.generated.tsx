/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type SkillFragment = { __typename?: 'Skill', _id: string, name: string, icon: string };

export const SkillFragmentDoc = gql`
    fragment Skill on Skill {
  _id
  name
  icon
}
    `;