import {
  type NoumOptionsFragment,
  type SettingItemFragment,
} from '@/apollo/graphql/fragments/planSettingsForComparision.generated';

import { cleanList } from '@/utils/list';
import { PropertyCell } from './styles';

import {
  isFeatureIncluded,
  shouldHightLightBackground,
} from '../../../utils/plans/planComparison';
import { ConfirmedIcon } from '../planCommonStyles';

type PropertyGroupProps = {
  items: SettingItemFragment[] | NoumOptionsFragment[];
};

export const PropertyGroup = ({ items }: PropertyGroupProps) => (
  <>
    <PropertyCell context="menu" />
    {items.map((setting, position) => {
      const featureIncluded = isFeatureIncluded(cleanList(setting.action));
      const isNoumSetting =
        setting.__typename === 'PlanSettingNoumOptionsOutput' &&
        (setting.id === 'noumSetupLimit' ||
          setting.id === 'noumConnectionLimit');
      const value = featureIncluded ? (
        isNoumSetting ? (
          setting.settings?.[0].value
        ) : (
          <ConfirmedIcon />
        )
      ) : (
        '-'
      );
      return (
        <PropertyCell
          context="property"
          hightLight={shouldHightLightBackground(position)}
        >
          {value}
        </PropertyCell>
      );
    })}
  </>
);
