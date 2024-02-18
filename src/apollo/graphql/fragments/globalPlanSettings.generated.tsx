/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type GlobalPlanSettingsFragment = { __typename?: 'SettingsOutput', settings_id: number, setting_name: string, setting_value_type: string, setting_value: string };

export const GlobalPlanSettingsFragmentDoc = gql`
    fragment GlobalPlanSettings on SettingsOutput {
  settings_id
  setting_name
  setting_value_type
  setting_value
}
    `;