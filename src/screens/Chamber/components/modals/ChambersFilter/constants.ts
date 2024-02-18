import { t } from 'i18next';
import { type DropdownValueType, SortKeys } from '@/components/Dropdown';
import { NoumLinkSorting, SortOperator } from '@/apollo/generated/types';
import { type SortValueTypes } from './types';

export const updatedSortOptions: DropdownValueType<string>[] = [
  {
    label: t(`noumena.sorting_recently_visited`),
    key: SortKeys?.sorting_recently_visited,
    type: 'value',
    value: SortKeys?.sorting_recently_visited,
  },
  {
    label: t(`noumena.sorting_a_z`),
    key: SortKeys?.sorting_a_z,
    type: 'value',
    value: SortKeys?.sorting_a_z,
  },
  {
    label: t(`noumena.sorting_z_a`),
    key: SortKeys?.sorting_z_a,
    type: 'value',
    value: SortKeys?.sorting_z_a,
  },
  {
    label: t(`noumena.sorting_new_to_old`),
    key: SortKeys?.sorting_new_to_old,
    type: 'value',
    value: SortKeys?.sorting_new_to_old,
  },
  {
    label: t(`noumena.sorting_old_to_new`),
    key: SortKeys?.sorting_old_to_new,
    type: 'value',
    value: SortKeys?.sorting_old_to_new,
  },
];

export const sortValues: SortValueTypes[] = [
  {
    key: SortKeys?.sorting_recently_visited,
    column: 'recentlyViewedAt',
    operator: SortOperator.Desc,
  },
  {
    key: SortKeys?.sorting_a_z,
    column: 'name',
    operator: SortOperator.Asc,
  },
  {
    key: SortKeys?.sorting_z_a,
    column: 'name',
    operator: SortOperator.Desc,
  },
  {
    key: SortKeys?.sorting_new_to_old,
    column: '',
    operator: SortOperator.Desc,
  },
  {
    key: SortKeys?.sorting_old_to_new,
    column: '',
    operator: SortOperator.Asc,
  },
];

export const linkSortValues: SortValueTypes[] = [
  {
    key: NoumLinkSorting.Oldest,
    column: 'Oldest',
    operator: SortOperator.Asc,
  },
  {
    key: NoumLinkSorting.Newest,
    column: 'Newest',
    operator: SortOperator.Desc,
  },
];

export const LinkedFilterOptions = (): DropdownValueType<string>[] => [
  {
    label: t(`noumena.sorting_new_date_to_old`),
    key: NoumLinkSorting.Newest,
    type: 'value',
    value: NoumLinkSorting.Newest,
  },
  {
    label: t(`noumena.sorting_old_date_to_new`),
    key: NoumLinkSorting.Oldest,
    type: 'value',
    value: NoumLinkSorting.Oldest,
  },
];
