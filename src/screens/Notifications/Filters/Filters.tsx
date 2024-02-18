import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import {
  type CategoriesFilterProps,
  type NotificationFilterCategory,
} from '../types';
import { NotificationFiltersWrapper } from './Filters.styles';

const CategoriesFilter = ({
  items,
  value,
  onChange,
}: CategoriesFilterProps): JSX.Element => (
  <NotificationFiltersWrapper data-testid="notifications-filter">
    <BasicChipsTabsForm
      onChange={(newVal) => onChange(newVal as NotificationFilterCategory)}
      inputList={items.map((item) => ({
        id: item.value,
        text: item.label,
        name: item.value,
        labelSize: 'auto',
        showDot: item.unread,
      }))}
      selectedId={value}
      mode="isBackground"
      isWithoutImage
      fontSize="--font-input-small-size"
      manualScroll
    />
  </NotificationFiltersWrapper>
);

export default CategoriesFilter;
