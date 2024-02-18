import { t } from 'i18next';
import { PostVisibility, SortOperator } from '@/apollo/generated/types';
import { type DropdownValueType } from '@/components/Dropdown';

export const OrderOptions: DropdownValueType<SortOperator>[] = [
  {
    key: 'new-old',
    value: SortOperator.Desc,
    type: 'value',
    label: t('noumena.post.filter_sort_new_to_old'),
  },
  {
    key: 'old-new',
    value: SortOperator.Asc,
    type: 'value',
    label: t('noumena.post.filter_sort_old_to_new'),
  },
];

export const VisibilityOptions: DropdownValueType<PostVisibility>[] = [
  {
    key: 'show-connections',
    value: PostVisibility.Connection,
    type: 'value',
    label: t('noumena.post.filter_visibility_show_connections'),
  },
  {
    key: 'show-followers',
    value: PostVisibility.Follower,
    type: 'value',
    label: t('noumena.post.filter_visibility_show_followers'),
  },
];
