/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type ThemeColorsFragment = { __typename?: 'ThemeColors', secondary?: any | null, primary?: any | null, gray?: any | null, success?: any | null, error?: any | null, miscColors?: any | null, noums?: { __typename?: 'NoumColors', investment?: any | null, project?: any | null, social?: any | null, special?: any | null, member?: any | null, story?: any | null } | null };

export const ThemeColorsFragmentDoc = gql`
    fragment ThemeColors on ThemeColors {
  secondary
  primary
  gray
  success
  error
  noums {
    investment
    project
    social
    special
    member
    story
  }
  miscColors
}
    `;