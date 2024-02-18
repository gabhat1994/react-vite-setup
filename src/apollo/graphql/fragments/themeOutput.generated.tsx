/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ThemeColorsFragmentDoc } from './themeColors.generated';
export type ThemeOutputFragment = { __typename?: 'ThemeOutput', _id: string, name: string, colors?: { __typename?: 'ThemeColors', secondary?: any | null, primary?: any | null, gray?: any | null, success?: any | null, error?: any | null, miscColors?: any | null, noums?: { __typename?: 'NoumColors', investment?: any | null, project?: any | null, social?: any | null, special?: any | null, member?: any | null, story?: any | null } | null } | null };

export const ThemeOutputFragmentDoc = gql`
    fragment ThemeOutput on ThemeOutput {
  _id
  name
  colors {
    ...ThemeColors
  }
}
    ${ThemeColorsFragmentDoc}`;