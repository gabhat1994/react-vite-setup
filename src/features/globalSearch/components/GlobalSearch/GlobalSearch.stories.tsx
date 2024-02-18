import { type Meta } from '@storybook/react';
import { GlobalSearchResultType } from '@/features/globalSearch/components/GlobalSearch/types';
import { type DropdownItemType } from '@/components/Dropdown';
import GlobalSearch from './GlobalSearch';

export default {
  title: 'UI/GlobalSearch',
  component: GlobalSearch,
} as Meta<typeof GlobalSearch>;

export const Basic = () => {
  const mockedRecentSearchesResults: DropdownItemType<GlobalSearchResultType>[] =
    [
      {
        key: '1',
        type: 'value',
        value: GlobalSearchResultType.Member,
        description: 'E-commerce consultant · Connected',
        label: 'John Doe',
      },
      {
        key: '2',
        type: 'value',
        value: GlobalSearchResultType.Noum,
        description: 'Owned by Tom Green · Following',
        label: 'Personal Branding',
      },
      {
        key: '3',
        type: 'value',
        value: GlobalSearchResultType.Noum,
        description: 'Owned by Tom Green',
        label: 'Drone Prototype Project',
      },
      {
        key: '4',
        type: 'value',
        value: GlobalSearchResultType.Noum,
        description: 'Owned by Tom Green  · Connected',
        label: 'Copyright Law 101',
      },
      {
        key: '5',
        type: 'value',
        value: GlobalSearchResultType.Event,
        description: '07/24/2022 · Invited',
        label: 'Business Plan Review with Stella Smith',
      },
    ];

  return <GlobalSearch recentSearchesResults={mockedRecentSearchesResults} />;
};
