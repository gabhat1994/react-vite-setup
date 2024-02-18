import {
  type NoumOptionsFragment,
  type SettingItemFragment,
} from '@/apollo/graphql/fragments/planSettingsForComparision.generated';
import { Category, Feature, FeatureCell } from './styles';
import { shouldHightLightBackground } from '../../../utils/plans/planComparison';

type FeatureGroupProps = {
  menuName: string;
  items: SettingItemFragment[] | NoumOptionsFragment[];
};

export const FeatureGroup = ({ menuName, items }: FeatureGroupProps) => (
  <>
    <FeatureCell context="menu">
      <Category>{menuName}</Category>
    </FeatureCell>
    {items?.map((settingItem, position) => (
      <FeatureCell
        context="feature"
        highlight={shouldHightLightBackground(position)}
      >
        <Feature>{settingItem.label}</Feature>
      </FeatureCell>
    ))}
  </>
);
